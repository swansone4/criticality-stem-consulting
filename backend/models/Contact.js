const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  academicLevel: {
    type: String,
    required: [true, 'Academic level is required'],
    enum: [
      'High School Student',
      'Undergraduate Student',
      'Graduate Student',
      'PhD Student',
      'Recent Graduate',
      'Professional'
    ]
  },
  interests: [{
    type: String,
    enum: [
      'Career Planning',
      'Research Opportunities',
      'Graduate School Preparation',
      'Academic Recovery',
      'Networking',
      'Skill Development',
      'Tutoring',
      'Other'
    ]
  }],
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'archived'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  tags: [{
    type: String
  }],
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  followUpDate: {
    type: Date
  },
  lastContacted: {
    type: Date
  },
  conversionValue: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ academicLevel: 1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware to sanitize data
contactSchema.pre('save', function(next) {
  // Sanitize name
  if (this.name) {
    this.name = this.name.trim().replace(/\s+/g, ' ');
  }
  
  // Sanitize email
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  
  // Sanitize phone
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, '');
  }
  
  next();
});

// Instance method to mark as contacted
contactSchema.methods.markAsContacted = function() {
  this.status = 'contacted';
  this.lastContacted = new Date();
  return this.save();
};

// Instance method to mark as converted
contactSchema.methods.markAsConverted = function(value = 0) {
  this.status = 'converted';
  this.conversionValue = value;
  this.lastContacted = new Date();
  return this.save();
};

// Static method to get contacts by status
contactSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to get recent contacts
contactSchema.statics.findRecent = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return this.find({ createdAt: { $gte: date } });
};

module.exports = mongoose.model('Contact', contactSchema); 