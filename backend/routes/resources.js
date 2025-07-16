// DEPRECATED: Resources are now loaded statically from the public/resources directory. This API is no longer used.
const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// GET /api/resources - Get all resources with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      type, 
      featured,
      search,
      page = 1,
      limit = 10,
      sortBy = 'publishedAt',
      sortOrder = 'desc',
      status = 'published' // Only show published by default
    } = req.query;

    // Build query
    const query = { status };
    
    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-content.body') // Don't send full content in list view
        .lean(),
      Resource.countDocuments(query)
    ]);

    // Get unique categories and types for filters
    const [categories, types] = await Promise.all([
      Resource.distinct('category', { status: 'published' }),
      Resource.distinct('type', { status: 'published' })
    ]);

    res.json({
      success: true,
      data: {
        resources,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalResources: total,
          hasNextPage: skip + resources.length < total,
          hasPrevPage: page > 1
        },
        filters: {
          categories,
          types
        }
      }
    });

  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/resources/featured - Get featured resources
router.get('/featured', async (req, res) => {
  try {
    const featuredResources = await Resource.findFeatured()
      .select('-content.body')
      .sort({ publishedAt: -1 })
      .limit(6)
      .lean();

    res.json({
      success: true,
      data: featuredResources
    });

  } catch (error) {
    console.error('Get featured resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured resources',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/resources/:slug - Get specific resource by slug
router.get('/:slug', async (req, res) => {
  try {
    const resource = await Resource.findOne({ 
      slug: req.params.slug,
      status: 'published'
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment view count
    await resource.incrementViews();

    res.json({
      success: true,
      data: resource
    });

  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/resources - Create new resource (Admin only)
router.post('/', async (req, res) => {
  try {
    // TODO: Add authentication middleware to check if user is admin
    // For now, we'll allow creation but in production you'd want proper auth

    const resourceData = req.body;
    
    // Validate required fields based on category
    if (resourceData.category === 'blogs' && !resourceData.content?.body) {
      return res.status(400).json({
        success: false,
        message: 'Blog content is required'
      });
    }

    if (resourceData.category === 'videos' && !resourceData.content?.videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Video URL is required'
      });
    }

    const resource = new Resource(resourceData);
    await resource.save();

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    });

  } catch (error) {
    console.error('Create resource error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A resource with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create resource',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT /api/resources/:id - Update resource (Admin only)
router.put('/:id', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: updatedResource
    });

  } catch (error) {
    console.error('Update resource error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update resource',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/resources/:id - Delete resource (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });

  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resource',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/resources/:id/like - Like a resource
router.post('/:id/like', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await resource.incrementLikes();

    res.json({
      success: true,
      message: 'Resource liked successfully',
      data: { likes: resource.likes }
    });

  } catch (error) {
    console.error('Like resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like resource',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/resources/tags/all - Get all unique tags
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Resource.distinct('tags', { status: 'published' });
    
    res.json({
      success: true,
      data: tags.sort()
    });

  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 