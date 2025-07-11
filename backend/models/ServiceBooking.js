const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: [true, 'User ID is required']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Career Guidance Consultation',
      'Research Networking Session',
      'Skill Development Workshop',
      'Academic Support Session',
      'Package Deal'
    ]
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [30, 'Duration must be at least 30 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  meetingType: {
    type: String,
    enum: ['video', 'phone', 'in-person'],
    default: 'video'
  },
  meetingLink: {
    type: String
  },
  location: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  clientNotes: {
    type: String,
    maxlength: [1000, 'Client notes cannot be more than 1000 characters']
  },
  goals: [{
    type: String,
    maxlength: [200, 'Goal cannot be more than 200 characters']
  }],
  topics: [{
    type: String,
    maxlength: [200, 'Topic cannot be more than 200 characters']
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderDate: {
    type: Date
  },
  feedback: {
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      maxlength: [500, 'Feedback comment cannot be more than 500 characters']
    },
    submittedAt: {
      type: Date
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String
  },
  transactionId: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
serviceBookingSchema.index({ userId: 1 });
serviceBookingSchema.index({ scheduledDate: 1 });
serviceBookingSchema.index({ status: 1 });
serviceBookingSchema.index({ serviceType: 1 });

// Virtual for formatted date
serviceBookingSchema.virtual('formattedDate').get(function() {
  return this.scheduledDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for duration in hours
serviceBookingSchema.virtual('durationHours').get(function() {
  return this.duration / 60;
});

// Pre-save middleware to validate scheduling
serviceBookingSchema.pre('save', function(next) {
  // Ensure scheduled date is in the future
  if (this.scheduledDate <= new Date()) {
    return next(new Error('Scheduled date must be in the future'));
  }
  
  // Set reminder date to 24 hours before scheduled date
  if (!this.reminderDate) {
    this.reminderDate = new Date(this.scheduledDate.getTime() - 24 * 60 * 60 * 1000);
  }
  
  next();
});

// Instance method to confirm booking
serviceBookingSchema.methods.confirm = function() {
  this.status = 'confirmed';
  return this.save();
};

// Instance method to complete booking
serviceBookingSchema.methods.complete = function() {
  this.status = 'completed';
  return this.save();
};

// Instance method to cancel booking
serviceBookingSchema.methods.cancel = function() {
  this.status = 'cancelled';
  return this.save();
};

// Instance method to reschedule booking
serviceBookingSchema.methods.reschedule = function(newDate) {
  this.scheduledDate = newDate;
  this.status = 'pending';
  this.reminderDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);
  return this.save();
};

// Static method to get upcoming bookings
serviceBookingSchema.statics.findUpcoming = function() {
  return this.find({
    scheduledDate: { $gte: new Date() },
    status: { $in: ['pending', 'confirmed'] }
  }).populate('userId', 'name email');
};

// Static method to get bookings by status
serviceBookingSchema.statics.findByStatus = function(status) {
  return this.find({ status }).populate('userId', 'name email');
};

// Static method to get bookings for a specific date range
serviceBookingSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    scheduledDate: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('userId', 'name email');
};

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema); 