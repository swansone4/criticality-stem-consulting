# Criticality - STEM Career Consulting

A static academic website for STEM career consulting, built with Next.js and optimized for GitHub Pages deployment.

## Overview

Criticality helps STEM students and professionals reach their "critical mass" of success through personalized guidance, research opportunities, and academic transformation strategies. The website features an academic design with Times New Roman typography and a sophisticated color palette.

## Features

- **Academic Design**: Times New Roman typography with traditional color scheme
- **Static Export**: Fully static site compatible with GitHub Pages
- **File-based Resources**: Blog posts and videos managed through markdown and JSON files
- **Responsive Design**: Optimized for all devices
- **Interactive Elements**: Category filtering and smooth animations
- **Contact Management**: Static contact form with email integration

## Technology Stack

- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom academic theme
- **Static Export**: Optimized for GitHub Pages deployment
- **Content**: Markdown files for blogs, JSON for videos
- **Images**: Next.js Image optimization with fallbacks

## Project Structure

```
tutoring/
├── app/                          # Next.js app directory
│   ├── about/                    # About page with founder story
│   ├── contact/                  # Contact page
│   ├── services/                 # Services page
│   ├── resources/                # Resources page with file-based content
│   │   └── [slug]/               # Dynamic blog post pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   └── Navigation.tsx            # Navigation component
├── lib/                          # Utility functions
│   └── generateResources.ts      # Resource generation from files
├── public/                       # Static assets
│   ├── resources/                # Resource files
│   │   ├── blogs/                # Blog markdown files
│   │   └── videos/               # Video JSON and assets
│   └── about-portrait.jpg        # Founder portrait
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

## Content Management

### Adding Blog Posts

1. Create a new markdown file in `public/resources/blogs/`
2. Include frontmatter with metadata:
   ```markdown
   ---
   title: Your Blog Title
   description: Brief description
   author: Author Name
   date: 2024-01-01
   tags: [tag1, tag2]
   featured: true
   image: /resources/blogs/your-image.jpg
   ---
   
   # Your Blog Content
   
   Write your content in markdown...
   ```

### Adding Videos

1. Add an entry to `public/resources/videos/videos.json`:
   ```json
   {
     "title": "Video Title",
     "description": "Video description",
     "videoUrl": "https://youtube.com/watch?v=...",
     "duration": 300,
     "author": "Author Name",
     "date": "2024-01-01",
     "tags": ["tag1", "tag2"],
     "featured": false,
     "image": "/resources/videos/thumbnail.jpg"
   }
   ```

## Development

### Prerequisites
- Node.js 18+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swansone4/tutoring.git
   cd tutoring
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview static export**
   ```bash
   npx serve -s out -l 3000
   ```

## Design System

### Color Palette
- **Primary Navy**: `#2c3e50` (Academic sophistication)
- **Burgundy Accent**: `#8B0000` (Traditional emphasis)
- **Light Background**: `#f8f6f1` (Subtle warmth)
- **White**: `#ffffff` (Clean backgrounds)
- **Gray Scale**: Various shades for text and borders

### Typography
- **Primary Font**: Times New Roman (Academic elegance)
- **Fallback**: Georgia, serif
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

## Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at `https://swansone4.github.io/tutoring/`

### Manual Deployment

1. **Build static export**
   ```bash
   npm run build
   ```

2. **Upload contents of `/out` directory** to your web server

## Configuration

### Next.js Configuration

The site is configured for static export with:
- `output: 'export'` for static generation
- `basePath: '/tutoring'` for GitHub Pages
- `trailingSlash: true` for compatibility
- `unoptimized: true` for images in static export

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run build && npx serve -s out`
5. Submit a pull request

## License

This project is private and proprietary to Criticality STEM Consulting. 