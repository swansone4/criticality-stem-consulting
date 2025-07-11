const express = require('express');
const router = express.Router();

// Mock testimonials data - in production this would come from a database
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Physics Major',
    university: 'MIT',
    outcome: 'Oak Ridge National Lab Internship',
    content: 'Criticality helped me secure a summer internship at a national lab. The guidance was invaluable in navigating the application process and preparing for interviews.',
    before: 'Struggling with research applications',
    after: 'Secured prestigious national lab internship',
    academicLevel: 'Undergraduate Student',
    field: 'Physics',
    rating: 5,
    image: '/testimonials/sarah-chen.jpg',
    videoUrl: null,
    tags: ['research', 'internship', 'national-lab']
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Engineering Student',
    university: 'University of Florida',
    outcome: 'PhD Program Acceptance',
    content: 'From academic probation to PhD acceptance - Criticality made it possible. The personalized approach helped me turn my academic challenges into strengths.',
    before: 'Academic probation and uncertain future',
    after: 'Accepted into top-tier PhD program',
    academicLevel: 'Graduate Student',
    field: 'Engineering',
    rating: 5,
    image: '/testimonials/michael-rodriguez.jpg',
    videoUrl: null,
    tags: ['academic-recovery', 'phd', 'transformation']
  },
  {
    id: 3,
    name: 'Dr. Emily Watson',
    role: 'Research Scientist',
    university: 'Stanford University',
    outcome: 'Industry Research Position',
    content: 'The networking strategies I learned here opened doors I never thought possible. Criticality helped me transition from academia to industry research.',
    before: 'Limited industry connections',
    after: 'Senior research position at tech company',
    academicLevel: 'Professional',
    field: 'Computer Science',
    rating: 5,
    image: '/testimonials/emily-watson.jpg',
    videoUrl: null,
    tags: ['career-transition', 'networking', 'industry']
  },
  {
    id: 4,
    name: 'Alex Thompson',
    role: 'Nuclear Engineering Student',
    university: 'Georgia Tech',
    outcome: 'NIST Research Fellowship',
    content: 'Criticality provided the roadmap I needed to navigate the complex world of research opportunities. Their guidance was instrumental in my success.',
    before: 'Unclear research direction',
    after: 'NIST fellowship and clear career path',
    academicLevel: 'PhD Student',
    field: 'Nuclear Engineering',
    rating: 5,
    image: '/testimonials/alex-thompson.jpg',
    videoUrl: null,
    tags: ['fellowship', 'research', 'nuclear-engineering']
  },
  {
    id: 5,
    name: 'Jessica Kim',
    role: 'Chemistry Major',
    university: 'UC Berkeley',
    outcome: 'Graduate School Acceptance',
    content: 'The academic support and study strategies I learned transformed my approach to learning. I went from struggling to thriving in my studies.',
    before: 'Academic struggles and low confidence',
    after: 'Accepted to top chemistry program',
    academicLevel: 'Undergraduate Student',
    field: 'Chemistry',
    rating: 5,
    image: '/testimonials/jessica-kim.jpg',
    videoUrl: null,
    tags: ['academic-support', 'graduate-school', 'chemistry']
  },
  {
    id: 6,
    name: 'David Park',
    role: 'Computer Science Graduate',
    university: 'Carnegie Mellon',
    outcome: 'Google Research Position',
    content: 'Criticality helped me develop the technical communication skills and networking strategies that were crucial for landing my dream job.',
    before: 'Strong technical skills, weak communication',
    after: 'Research position at Google',
    academicLevel: 'Recent Graduate',
    field: 'Computer Science',
    rating: 5,
    image: '/testimonials/david-park.jpg',
    videoUrl: null,
    tags: ['technical-communication', 'job-placement', 'google']
  }
];

// GET /api/testimonials - Get all testimonials with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      academicLevel, 
      field, 
      outcome, 
      rating,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc'
    } = req.query;

    let filteredTestimonials = [...testimonials];

    // Apply filters
    if (academicLevel) {
      filteredTestimonials = filteredTestimonials.filter(t => 
        t.academicLevel === academicLevel
      );
    }

    if (field) {
      filteredTestimonials = filteredTestimonials.filter(t => 
        t.field.toLowerCase().includes(field.toLowerCase())
      );
    }

    if (outcome) {
      filteredTestimonials = filteredTestimonials.filter(t => 
        t.outcome.toLowerCase().includes(outcome.toLowerCase())
      );
    }

    if (rating) {
      filteredTestimonials = filteredTestimonials.filter(t => 
        t.rating >= parseInt(rating)
      );
    }

    // Apply sorting
    filteredTestimonials.sort((a, b) => {
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
    const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        testimonials: paginatedTestimonials,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredTestimonials.length / limit),
          totalTestimonials: filteredTestimonials.length,
          hasNextPage: endIndex < filteredTestimonials.length,
          hasPrevPage: page > 1
        },
        filters: {
          academicLevels: [...new Set(testimonials.map(t => t.academicLevel))],
          fields: [...new Set(testimonials.map(t => t.field))],
          outcomes: [...new Set(testimonials.map(t => t.outcome))]
        }
      }
    });

  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/testimonials/:id - Get specific testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      data: testimonial
    });

  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonial',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/testimonials/stats/summary - Get testimonial statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalTestimonials = testimonials.length;
    const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials;
    
    const academicLevelStats = testimonials.reduce((acc, t) => {
      acc[t.academicLevel] = (acc[t.academicLevel] || 0) + 1;
      return acc;
    }, {});

    const fieldStats = testimonials.reduce((acc, t) => {
      acc[t.field] = (acc[t.field] || 0) + 1;
      return acc;
    }, {});

    const outcomeStats = testimonials.reduce((acc, t) => {
      acc[t.outcome] = (acc[t.outcome] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalTestimonials,
        averageRating: Math.round(averageRating * 10) / 10,
        academicLevelStats,
        fieldStats,
        outcomeStats,
        ratingDistribution: {
          5: testimonials.filter(t => t.rating === 5).length,
          4: testimonials.filter(t => t.rating === 4).length,
          3: testimonials.filter(t => t.rating === 3).length,
          2: testimonials.filter(t => t.rating === 2).length,
          1: testimonials.filter(t => t.rating === 1).length
        }
      }
    });

  } catch (error) {
    console.error('Get testimonial stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonial statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/testimonials/featured - Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const featuredTestimonials = testimonials
      .filter(t => t.rating === 5)
      .slice(0, 3);

    res.json({
      success: true,
      data: featuredTestimonials
    });

  } catch (error) {
    console.error('Get featured testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured testimonials',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 