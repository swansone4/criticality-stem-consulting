const mongoose = require('mongoose');
require('dotenv').config();

// Import the Resource model
const Resource = require('../backend/models/Resource');

// Sample resources data
const sampleResources = [
  {
    title: 'How to Build a Research Portfolio',
    description: 'A step-by-step guide to assembling a compelling research portfolio for STEM applications.',
    category: 'blogs',
    type: 'Blog',
    content: {
      body: `# How to Build a Research Portfolio

Building a strong research portfolio is essential for STEM students looking to advance their academic and professional careers. Here's a comprehensive guide to help you create a compelling portfolio.

## What is a Research Portfolio?

A research portfolio is a collection of your academic work, research projects, publications, and achievements that demonstrates your skills, knowledge, and potential in your field.

## Key Components

### 1. Research Projects
- Include detailed descriptions of your research projects
- Highlight your role and contributions
- Explain the methodology and outcomes

### 2. Publications
- List any papers, posters, or presentations
- Include conference abstracts and proceedings
- Highlight any awards or recognition

### 3. Technical Skills
- Programming languages and software
- Laboratory techniques and equipment
- Data analysis and statistical methods

### 4. Collaborations
- Research groups and teams you've worked with
- Interdisciplinary projects
- Industry partnerships

## Tips for Success

1. **Start Early**: Begin building your portfolio as soon as possible
2. **Be Consistent**: Regularly update your portfolio with new achievements
3. **Show Impact**: Quantify your contributions and outcomes
4. **Get Feedback**: Have mentors and peers review your portfolio
5. **Tailor Content**: Customize your portfolio for different opportunities

Remember, a strong research portfolio takes time to develop, but it's an investment that will pay dividends throughout your career.`
    },
    image: '/placeholder-thumb.jpg',
    tags: ['research', 'portfolio', 'applications', 'career-development'],
    featured: true,
    status: 'published',
    author: {
      name: 'Dr. Sarah Chen',
      bio: 'Research Director at MIT with 15+ years in STEM education',
      avatar: '/default-avatar.jpg'
    },
    metaTitle: 'How to Build a Research Portfolio - STEM Career Guide',
    metaDescription: 'Learn how to create a compelling research portfolio for STEM applications with our comprehensive step-by-step guide.'
  },
  {
    title: 'Networking for Scientists',
    description: 'Practical strategies for building your professional network in academia and industry.',
    category: 'blogs',
    type: 'Blog',
    content: {
      body: `# Networking for Scientists

Networking is crucial for career advancement in STEM fields. Whether you're in academia or industry, building strong professional relationships can open doors to opportunities you never knew existed.

## Why Networking Matters

- **Job Opportunities**: Many positions are filled through personal connections
- **Collaborations**: Networking leads to research partnerships and joint projects
- **Knowledge Sharing**: Stay updated on the latest developments in your field
- **Mentorship**: Find mentors who can guide your career development

## Effective Networking Strategies

### 1. Attend Conferences and Workshops
- Present your research to gain visibility
- Participate in poster sessions and discussions
- Join special interest groups and committees

### 2. Use Social Media and Online Platforms
- LinkedIn for professional connections
- ResearchGate for academic networking
- Twitter for following thought leaders in your field

### 3. Join Professional Organizations
- American Physical Society (APS)
- American Chemical Society (ACS)
- Institute of Electrical and Electronics Engineers (IEEE)
- Field-specific societies and associations

### 4. Engage in Local Events
- University seminars and colloquia
- Industry meetups and workshops
- Alumni events and career fairs

## Building Meaningful Connections

1. **Be Genuine**: Show interest in others' work and experiences
2. **Follow Up**: Send thank-you emails and stay in touch
3. **Offer Value**: Share resources and opportunities with your network
4. **Be Patient**: Building relationships takes time and effort

## Common Networking Mistakes to Avoid

- Only reaching out when you need something
- Not following up after initial contact
- Being too aggressive or pushy
- Focusing only on senior researchers

Remember, networking is about building mutually beneficial relationships, not just collecting business cards.`
    },
    image: '/placeholder-thumb.jpg',
    tags: ['networking', 'career-development', 'professional-development', 'academia'],
    featured: false,
    status: 'published',
    author: {
      name: 'Dr. Michael Rodriguez',
      bio: 'Career Development Specialist with expertise in STEM networking',
      avatar: '/default-avatar.jpg'
    },
    metaTitle: 'Networking Strategies for Scientists - Professional Development',
    metaDescription: 'Discover practical networking strategies for scientists and researchers to advance your career in academia and industry.'
  },
  {
    title: 'How to Write a Winning STEM Resume',
    description: 'Video walkthrough of resume best practices for STEM students.',
    category: 'videos',
    type: 'Video',
    content: {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: 512 // 8:32 in seconds
    },
    image: '/placeholder-thumb.jpg',
    tags: ['resume', 'job-application', 'career-development', 'professional-development'],
    featured: false,
    status: 'published',
    author: {
      name: 'Dr. Emily Watson',
      bio: 'Career Coach specializing in STEM resume optimization',
      avatar: '/default-avatar.jpg'
    },
    metaTitle: 'STEM Resume Writing Guide - Video Tutorial',
    metaDescription: 'Learn how to write a winning STEM resume with our comprehensive video guide covering best practices and common mistakes.'
  }
];

async function seedResources() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/criticality', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Clear existing resources (optional - comment out if you want to keep existing data)
    await Resource.deleteMany({});
    console.log('Cleared existing resources');

    // Insert sample resources
    const createdResources = await Resource.insertMany(sampleResources);
    console.log(`Successfully created ${createdResources.length} sample resources`);

    // Display created resources
    createdResources.forEach(resource => {
      console.log(`- ${resource.title} (${resource.category})`);
    });

    console.log('\nSample resources have been seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Visit /admin/resources to manage your resources');
    console.log('2. Visit /resources to see the public resources page');
    console.log('3. Use the API endpoints to create, update, and delete resources');

  } catch (error) {
    console.error('Error seeding resources:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedResources(); 