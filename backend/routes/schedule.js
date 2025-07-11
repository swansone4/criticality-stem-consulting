const express = require('express');
const { body, validationResult } = require('express-validator');
const ServiceBooking = require('../models/ServiceBooking');
const Contact = require('../models/Contact');
const { sendBookingConfirmation, sendReminderEmail } = require('../utils/emailService');

const router = express.Router();

// Validation rules for booking
const bookingValidation = [
  body('userId')
    .isMongoId()
    .withMessage('Valid user ID is required'),
  
  body('serviceType')
    .isIn([
      'Career Guidance Consultation',
      'Research Networking Session',
      'Skill Development Workshop',
      'Academic Support Session',
      'Package Deal'
    ])
    .withMessage('Valid service type is required'),
  
  body('scheduledDate')
    .isISO8601()
    .withMessage('Valid scheduled date is required'),
  
  body('duration')
    .isInt({ min: 30, max: 480 })
    .withMessage('Duration must be between 30 and 480 minutes'),
  
  body('meetingType')
    .optional()
    .isIn(['video', 'phone', 'in-person'])
    .withMessage('Valid meeting type is required'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Valid price is required')
];

// POST /api/schedule - Create new booking
router.post('/', bookingValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      userId,
      serviceType,
      scheduledDate,
      duration,
      meetingType = 'video',
      price,
      notes,
      goals,
      topics
    } = req.body;

    // Check if user exists
    const user = await Contact.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check for scheduling conflicts
    const conflictingBooking = await ServiceBooking.findOne({
      scheduledDate: {
        $gte: new Date(scheduledDate),
        $lt: new Date(new Date(scheduledDate).getTime() + duration * 60000)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingBooking) {
      return res.status(409).json({
        success: false,
        message: 'Time slot is not available'
      });
    }

    // Create new booking
    const booking = new ServiceBooking({
      userId,
      serviceType,
      scheduledDate: new Date(scheduledDate),
      duration,
      meetingType,
      price,
      notes,
      goals,
      topics
    });

    await booking.save();

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        name: user.name,
        email: user.email,
        serviceType: booking.serviceType,
        formattedDate: booking.formattedDate,
        duration: booking.duration,
        meetingType: booking.meetingType,
        meetingLink: booking.meetingLink
      });
    } catch (emailError) {
      console.error('Booking confirmation email error:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: booking._id,
        serviceType: booking.serviceType,
        scheduledDate: booking.scheduledDate,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/schedule - Get bookings with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      userId, 
      status, 
      serviceType,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};
    
    if (userId) query.userId = userId;
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    
    if (startDate && endDate) {
      query.scheduledDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const bookings = await ServiceBooking.find(query)
      .populate('userId', 'name email')
      .sort({ scheduledDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ServiceBooking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalBookings: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/schedule/:id - Get specific booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id)
      .populate('userId', 'name email academicLevel');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/schedule/:id - Update booking
router.put('/:id', async (req, res) => {
  try {
    const { status, notes, meetingLink, location } = req.body;

    const booking = await ServiceBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (status) booking.status = status;
    if (notes) booking.notes = notes;
    if (meetingLink) booking.meetingLink = meetingLink;
    if (location) booking.location = location;

    await booking.save();

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/schedule/:id - Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/schedule/availability - Check availability
router.get('/availability', async (req, res) => {
  try {
    const { date, duration = 60 } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + duration * 60000);

    const conflictingBookings = await ServiceBooking.find({
      scheduledDate: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    const isAvailable = conflictingBookings.length === 0;

    res.json({
      success: true,
      data: {
        isAvailable,
        conflictingBookings: conflictingBookings.length,
        requestedTime: {
          start: startDate,
          end: endDate,
          duration
        }
      }
    });

  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check availability',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/schedule/upcoming - Get upcoming bookings
router.get('/upcoming', async (req, res) => {
  try {
    const upcomingBookings = await ServiceBooking.findUpcoming();

    res.json({
      success: true,
      data: upcomingBookings
    });

  } catch (error) {
    console.error('Get upcoming bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 