const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendWelcomeEmail, sendAdminNotification } = require('../utils/emailService');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact attempts. Please try again later.'
  }
});

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),
  
  body('academicLevel')
    .isIn([
      'High School Student',
      'Undergraduate Student',
      'Graduate Student',
      'PhD Student',
      'Recent Graduate',
      'Professional'
    ])
    .withMessage('Please select a valid academic level'),
  
  body('interests')
    .isArray({ min: 1 })
    .withMessage('Please select at least one area of interest'),
  
  body('interests.*')
    .isIn([
      'Career Planning',
      'Research Opportunities',
      'Graduate School Preparation',
      'Academic Recovery',
      'Networking',
      'Skill Development',
      'Tutoring',
      'Other'
    ])
    .withMessage('Please select valid areas of interest'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, contactValidation, async (req, res) => {
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
      name,
      email,
      phone,
      academicLevel,
      interests,
      message
    } = req.body;

    // Check if contact already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'A contact with this email already exists'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      academicLevel,
      interests,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: req.body.source || 'website'
    });

    await contact.save();

    // Send welcome email to contact
    try {
      await sendWelcomeEmail({
        name: contact.name,
        email: contact.email,
        academicLevel: contact.academicLevel,
        interests: contact.interests
      });
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification to admin
    try {
      await sendAdminNotification({
        contactId: contact._id,
        name: contact.name,
        email: contact.email,
        academicLevel: contact.academicLevel,
        interests: contact.interests,
        message: contact.message
      });
    } catch (adminEmailError) {
      console.error('Admin notification error:', adminEmailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        status: contact.status
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      academicLevel, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (status) query.status = status;
    if (academicLevel) query.academicLevel = academicLevel;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const contacts = await Contact.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/contact/:id - Get specific contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/contact/:id - Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes, tags, followUpDate } = req.body;

    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    if (status) contact.status = status;
    if (notes) contact.notes = notes;
    if (tags) contact.tags = tags;
    if (followUpDate) contact.followUpDate = followUpDate;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/contact/stats/summary - Get contact statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const contactedContacts = await Contact.countDocuments({ status: 'contacted' });
    const convertedContacts = await Contact.countDocuments({ status: 'converted' });

    const recentContacts = await Contact.findRecent(7);
    const academicLevelStats = await Contact.aggregate([
      {
        $group: {
          _id: '$academicLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    const interestStats = await Contact.aggregate([
      { $unwind: '$interests' },
      {
        $group: {
          _id: '$interests',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        contactedContacts,
        convertedContacts,
        recentContacts: recentContacts.length,
        academicLevelStats,
        interestStats
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 