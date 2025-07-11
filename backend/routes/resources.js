const express = require('express');
const router = express.Router();

// Mock resources data - in production this would come from a database
const resources = [
  {
    id: 1,
    title: 'STEM Career Planning Guide',
    type: 'pdf',
    category: 'Career Guides',
    description: 'Comprehensive guide for planning your STEM career path from undergraduate to professional levels.',
    fileUrl: '/resources/stem-career-planning-guide.pdf',
    fileSize: '2.3 MB',
    downloadCount: 1247,
    tags: ['career-planning', 'undergraduate', 'graduate', 'professional'],
    featured: true
  },
  {
    id: 2,
    title: 'Research Opportunity Database',
    type: 'interactive',
    category: 'Research Opportunities',
    description: 'Searchable database of internships, fellowships, and research programs at national labs and universities.',
    fileUrl: '/resources/research-opportunities-database',
    fileSize: 'N/A',
    downloadCount: 892,
    tags: ['research', 'internships', 'fellowships', 'national-labs'],
    featured: true
  },
  {
    id: 3,
    title: 'Cold Email Templates for STEM',
    type: 'docx',
    category: 'Communication',
    description: 'Professional email templates for reaching out to professors, researchers, and industry professionals.',
    fileUrl: '/resources/cold-email-templates.docx',
    fileSize: '156 KB',
    downloadCount: 2156,
    tags: ['networking', 'communication', 'email-templates'],
    featured: true
  },
  {
    id: 4,
    title: 'Physics Study Strategies',
    type: 'pdf',
    category: 'Academic Support',
    description: 'Proven study methods and strategies for mastering physics concepts and problem-solving techniques.',
    fileUrl: '/resources/physics-study-strategies.pdf',
    fileSize: '1.8 MB',
    downloadCount: 943,
    tags: ['physics', 'study-strategies', 'academic-support'],
    featured: false
  },
  {
    id: 5,
    title: 'Nuclear Engineering Career Path',
    type: 'pdf',
    category: 'Career Guides',
    description: 'Detailed overview of career opportunities in nuclear engineering from research to industry.',
    fileUrl: '/resources/nuclear-engineering-career-path.pdf',
    fileSize: '3.1 MB',
    downloadCount: 567,
    tags: ['nuclear-engineering', 'career-path', 'industry'],
    featured: false
  },
  {
    id: 6,
    title: 'Graduate School Application Checklist',
    type: 'pdf',
    category: 'Graduate School',
    description: 'Comprehensive checklist for preparing competitive graduate school applications.',
    fileUrl: '/resources/graduate-school-checklist.pdf',
    fileSize: '890 KB',
    downloadCount: 1789,
    tags: ['graduate-school', 'applications', 'checklist'],
    featured: true
  },
  {
    id: 7,
    title: 'Resume Optimization Guide',
    type: 'pdf',
    category: 'Professional Development',
    description: 'Step-by-step guide for creating compelling resumes for STEM positions.',
    fileUrl: '/resources/resume-optimization-guide.pdf',
    fileSize: '1.2 MB',
    downloadCount: 2341,
    tags: ['resume', 'professional-development', 'job-application'],
    featured: false
  },
  {
    id: 8,
    title: 'Interview Preparation for STEM',
    type: 'pdf',
    category: 'Professional Development',
    description: 'Comprehensive guide for preparing for technical and behavioral interviews in STEM fields.',
    fileUrl: '/resources/interview-preparation-stem.pdf',
    fileSize: '2.7 MB',
    downloadCount: 1654,
    tags: ['interview', 'preparation', 'technical'],
    featured: false
  }
];

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
      sortBy = 'downloadCount',
      sortOrder = 'desc'
    } = req.query;

    let filteredResources = [...resources];

    // Apply filters
    if (category) {
      filteredResources = filteredResources.filter(r => 
        r.category === category
      );
    }

    if (type) {
      filteredResources = filteredResources.filter(r => 
        r.type === type
      );
    }

    if (featured === 'true') {
      filteredResources = filteredResources.filter(r => 
        r.featured === true
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filteredResources.sort((a, b) => {
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
    const paginatedResources = filteredResources.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        resources: paginatedResources,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredResources.length / limit),
          totalResources: filteredResources.length,
          hasNextPage: endIndex < filteredResources.length,
          hasPrevPage: page > 1
        },
        filters: {
          categories: [...new Set(resources.map(r => r.category))],
          types: [...new Set(resources.map(r => r.type))]
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

// GET /api/resources/:id - Get specific resource
router.get('/:id', async (req, res) => {
  try {
    const resource = resources.find(r => r.id === parseInt(req.params.id));
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

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

// GET /api/resources/featured - Get featured resources
router.get('/featured', async (req, res) => {
  try {
    const featuredResources = resources.filter(r => r.featured);

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

// POST /api/resources/:id/download - Track resource download
router.post('/:id/download', async (req, res) => {
  try {
    const resource = resources.find(r => r.id === parseInt(req.params.id));
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // In a real application, you would update the download count in the database
    resource.downloadCount += 1;

    res.json({
      success: true,
      message: 'Download tracked successfully',
      data: {
        downloadCount: resource.downloadCount
      }
    });

  } catch (error) {
    console.error('Track download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track download',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/resources/stats/summary - Get resource statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalResources = resources.length;
    const totalDownloads = resources.reduce((sum, r) => sum + r.downloadCount, 0);
    const averageDownloads = Math.round(totalDownloads / totalResources);
    
    const categoryStats = resources.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {});

    const typeStats = resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    const topResources = resources
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalResources,
        totalDownloads,
        averageDownloads,
        categoryStats,
        typeStats,
        topResources
      }
    });

  } catch (error) {
    console.error('Get resource stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 