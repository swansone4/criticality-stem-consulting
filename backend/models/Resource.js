const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['blogs', 'videos'],
    default: 'blogs'
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['Blog', 'Video', 'Guide', 'Tool'],
    default: 'Blog'
  },
  content: {
    // For blog posts - can be markdown or HTML
    body: {
      type: String,
      required: function() { return this.category === 'blogs'; }
    },
    // For videos - external URL (YouTube, Vimeo, etc.)
    videoUrl: {
      type: String,
      required: function() { return this.category === 'videos'; },
      validate: {
        validator: function(v) {
          if (this.category === 'videos') {
            return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com)\/.+/.test(v);
          }
          return true;
        },
        message: 'Please provide a valid video URL (YouTube, Vimeo, or Dailymotion)'
      }
    },
    // Video duration in seconds
    duration: {
      type: Number,
      required: function() { return this.category === 'videos'; }
    }
  },
  // Featured image/thumbnail
  image: {
    type: String,
    required: [true, 'Featured image is required'],
    default: '/placeholder-thumb.jpg'
  },
  // SEO and metadata
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
      },
      message: 'Slug must contain only lowercase letters, numbers, and hyphens'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  // Publishing status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  // Author information
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Author bio cannot exceed 500 characters']
    },
    avatar: {
      type: String,
      default: '/default-avatar.jpg'
    }
  },
  // SEO fields
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  // Timestamps
  publishedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted duration
resourceSchema.virtual('formattedDuration').get(function() {
  if (!this.content.duration) return null;
  
  const minutes = Math.floor(this.content.duration / 60);
  const seconds = this.content.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for reading time (for blogs)
resourceSchema.virtual('readingTime').get(function() {
  if (this.category !== 'blogs' || !this.content.body) return null;
  
  const wordsPerMinute = 200;
  const wordCount = this.content.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
});

// Indexes for better query performance
resourceSchema.index({ category: 1, status: 1 });
resourceSchema.index({ featured: 1, status: 1 });
resourceSchema.index({ slug: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ 'author.name': 1 });
resourceSchema.index({ createdAt: -1 });
resourceSchema.index({ publishedAt: -1 });

// Pre-save middleware to generate slug if not provided
resourceSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Static method to find published resources
resourceSchema.statics.findPublished = function() {
  return this.find({ status: 'published' });
};

// Static method to find featured resources
resourceSchema.statics.findFeatured = function() {
  return this.find({ featured: true, status: 'published' });
};

// Instance method to increment views
resourceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to increment likes
resourceSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

module.exports = mongoose.model('Resource', resourceSchema); 