const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock newsletter subscribers - in production this would come from a database
let subscribers = [
  {
    id: 1,
    email: 'sarah.chen@example.com',
    name: 'Sarah Chen',
    subscribed: true,
    preferences: ['career-tips', 'research-opportunities'],
    subscribedAt: new Date('2023-01-15'),
    lastEmailSent: new Date('2023-12-01')
  },
  {
    id: 2,
    email: 'michael.rodriguez@example.com',
    name: 'Michael Rodriguez',
    subscribed: true,
    preferences: ['academic-support', 'graduate-school'],
    subscribedAt: new Date('2023-02-20'),
    lastEmailSent: new Date('2023-12-01')
  }
];

// Validation rules for newsletter subscription
const subscriptionValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('preferences')
    .optional()
    .isArray()
    .withMessage('Preferences must be an array'),
  
  body('preferences.*')
    .optional()
    .isIn(['career-tips', 'research-opportunities', 'academic-support', 'graduate-school', 'networking', 'skill-development'])
    .withMessage('Invalid preference category')
];

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', subscriptionValidation, async (req, res) => {
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

    const { email, name, preferences = [] } = req.body;

    // Check if already subscribed
    const existingSubscriber = subscribers.find(s => s.email === email);
    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed to the newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.subscribed = true;
        existingSubscriber.preferences = preferences;
        existingSubscriber.subscribedAt = new Date();
        
        return res.json({
          success: true,
          message: 'Newsletter subscription reactivated successfully',
          data: {
            email: existingSubscriber.email,
            preferences: existingSubscriber.preferences
          }
        });
      }
    }

    // Add new subscriber
    const newSubscriber = {
      id: subscribers.length + 1,
      email,
      name,
      subscribed: true,
      preferences,
      subscribedAt: new Date(),
      lastEmailSent: null
    };

    subscribers.push(newSubscriber);

    // TODO: Send welcome email
    // await sendNewsletterWelcomeEmail(newSubscriber);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: newSubscriber.email,
        preferences: newSubscriber.preferences
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = subscribers.find(s => s.email === email);
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    subscriber.subscribed = false;

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/newsletter/preferences - Update subscription preferences
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = subscribers.find(s => s.email === email);
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    if (preferences) {
      subscriber.preferences = preferences;
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        email: subscriber.email,
        preferences: subscriber.preferences
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/newsletter/subscribers - Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const { 
      subscribed,
      page = 1,
      limit = 10,
      sortBy = 'subscribedAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredSubscribers = [...subscribers];

    // Apply filters
    if (subscribed !== undefined) {
      filteredSubscribers = filteredSubscribers.filter(s => 
        s.subscribed === (subscribed === 'true')
      );
    }

    // Apply sorting
    filteredSubscribers.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        subscribers: paginatedSubscribers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredSubscribers.length / limit),
          totalSubscribers: filteredSubscribers.length,
          hasNextPage: endIndex < filteredSubscribers.length,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/newsletter/stats/summary - Get newsletter statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalSubscribers = subscribers.length;
    const activeSubscribers = subscribers.filter(s => s.subscribed).length;
    const inactiveSubscribers = totalSubscribers - activeSubscribers;

    const preferenceStats = subscribers.reduce((acc, s) => {
      s.preferences.forEach(pref => {
        acc[pref] = (acc[pref] || 0) + 1;
      });
      return acc;
    }, {});

    const monthlyGrowth = subscribers.filter(s => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return s.subscribedAt >= sixMonthsAgo;
    }).length;

    res.json({
      success: true,
      data: {
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers,
        preferenceStats,
        monthlyGrowth,
        subscriptionRate: Math.round((activeSubscribers / totalSubscribers) * 100)
      }
    });

  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/newsletter/send - Send newsletter campaign (admin only)
router.post('/send', async (req, res) => {
  try {
    const { subject, content, preferences, testMode = false } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: 'Subject and content are required'
      });
    }

    let targetSubscribers = subscribers.filter(s => s.subscribed);

    // Filter by preferences if specified
    if (preferences && preferences.length > 0) {
      targetSubscribers = targetSubscribers.filter(s => 
        s.preferences.some(pref => preferences.includes(pref))
      );
    }

    if (testMode) {
      // Send to first subscriber only for testing
      targetSubscribers = targetSubscribers.slice(0, 1);
    }

    // TODO: Implement actual email sending
    // for (const subscriber of targetSubscribers) {
    //   await sendNewsletterEmail(subscriber, subject, content);
    //   subscriber.lastEmailSent = new Date();
    // }

    res.json({
      success: true,
      message: `Newsletter sent to ${targetSubscribers.length} subscribers`,
      data: {
        sentCount: targetSubscribers.length,
        testMode
      }
    });

  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 