# Criticality - STEM Career Consulting Website

A modern, minimalistic STEM career consulting website with comprehensive backend functionality for lead generation and client management.

## 🚨 Resources Page Update

The Resources page is now fully static and file-based. To add or update resources (blogs or videos):
- Add markdown files to `public/resources/blogs/` for blogs.
- Add entries to `public/resources/videos/videos.json` for videos.
- No backend or API is required for resources.

## 🎯 Project Overview

Criticality is a sophisticated web platform designed to help STEM students and professionals reach their "critical mass" of success through personalized guidance, research opportunities, and academic transformation strategies.

### Key Features

- **Dynamic Hero Section** with animated text reel cycling through career opportunities
- **Scroll-triggered animations** for engaging user experience
- **Comprehensive contact management** with email automation
- **Service booking system** with calendar integration
- **Success stories showcase** with filtering and statistics
- **Resource library** with downloadable guides and templates
- **Newsletter management** with preference-based campaigns
- **Responsive design** optimized for all devices

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom academic theme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with validation
- **Notifications**: React Hot Toast for user feedback

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer with HTML templates
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan for request logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/criticality-stem.git
   cd criticality-stem
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   
   # Backend (backend/.env)
   cp backend/env.example backend/.env
   # Edit backend/.env with your configuration
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📁 Project Structure

```
criticality-stem/
├── app/                          # Next.js app directory
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── services/                 # Services page
│   ├── success-stories/          # Success stories page
│   ├── resources/                # Resources page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   └── Navigation.tsx            # Navigation component
├── backend/                      # Express.js backend
│   ├── models/                   # MongoDB models
│   │   ├── Contact.js            # Contact schema
│   │   └── ServiceBooking.js     # Booking schema
│   ├── routes/                   # API routes
│   │   ├── contact.js            # Contact endpoints
│   │   ├── testimonials.js       # Testimonials endpoints
│   │   ├── schedule.js           # Booking endpoints
│   │   ├── resources.js          # Resources endpoints
│   │   └── newsletter.js         # Newsletter endpoints
│   ├── utils/                    # Utility functions
│   │   └── emailService.js       # Email templates & sending
│   ├── server.js                 # Express server
│   └── package.json              # Backend dependencies
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2E8B57` (Academic sophistication)
- **Light Green**: `#8dd1a8` (Accent elements)
- **Dark Green**: `#1a442e` (Text emphasis)
- **White**: `#ffffff` (Clean backgrounds)
- **Gray Scale**: Various shades for text and borders

### Typography
- **Primary Font**: Times New Roman (Academic elegance)
- **Fallback**: Georgia, serif
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Animations
- **Text Reel**: 3-second intervals with smooth transitions
- **Scroll Triggers**: Intersection Observer for performance
- **Micro-interactions**: Hover effects and button animations
- **Loading States**: Elegant spinners and transitions

## 🔧 Configuration

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/criticality
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@criticality-stem.com
```

## 📊 API Endpoints

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get specific contact
- `PUT /api/contact/:id` - Update contact status
- `GET /api/contact/stats/summary` - Contact statistics

### Testimonials
- `GET /api/testimonials` - Get testimonials with filtering
- `GET /api/testimonials/:id` - Get specific testimonial
- `GET /api/testimonials/featured` - Get featured testimonials
- `GET /api/testimonials/stats/summary` - Testimonial statistics

### Service Booking
- `POST /api/schedule` - Create new booking
- `GET /api/schedule` - Get bookings with filtering
- `GET /api/schedule/:id` - Get specific booking
- `PUT /api/schedule/:id` - Update booking
- `DELETE /api/schedule/:id` - Cancel booking
- `GET /api/schedule/availability` - Check availability

### Resources
- `GET /api/resources` - Get resources with filtering
- `GET /api/resources/:id` - Get specific resource
- `GET /api/resources/featured` - Get featured resources
- `POST /api/resources/:id/download` - Track download
- `GET /api/resources/stats/summary` - Resource statistics

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `PUT /api/newsletter/preferences` - Update preferences
- `GET /api/newsletter/subscribers` - Get subscribers (admin)
- `GET /api/newsletter/stats/summary` - Newsletter statistics
- `POST /api/newsletter/send` - Send campaign (admin)

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   - Set `NEXT_PUBLIC_API_URL` to your backend URL
   - Set `NEXT_PUBLIC_SITE_URL` to your frontend URL

### Backend Deployment (Railway/Heroku)

1. **Railway Deployment**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Heroku Deployment**
   ```bash
   # Install Heroku CLI
   heroku create criticality-backend
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   git push heroku main
   ```

3. **Environment Variables**
   - Set all required environment variables
   - Configure MongoDB Atlas connection
   - Set up SMTP credentials

### Database Setup

1. **MongoDB Atlas**
   - Create cluster
   - Set up database user
   - Configure IP whitelist
   - Get connection string

2. **Local MongoDB**
   ```bash
   # Install MongoDB
   brew install mongodb-community
   
   # Start MongoDB
   brew services start mongodb-community
   ```

## 🔒 Security Features

- **HTTPS**: SSL certificate implementation
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Server-side validation and sanitization
- **CORS**: Configured for production domains
- **Helmet**: Security headers
- **XSS Protection**: Input sanitization
- **SQL Injection Prevention**: MongoDB with parameterized queries

## 📈 Performance Optimization

- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Route-based code splitting
- **Caching**: Browser caching and CDN integration
- **Lazy Loading**: Images and components
- **Compression**: Gzip compression
- **Core Web Vitals**: Optimized for Google metrics

## 🧪 Testing

### Frontend Testing
```bash
npm run test
npm run test:watch
```

### Backend Testing
```bash
cd backend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@criticality-stem.com or create an issue in this repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
- MongoDB for the flexible database solution
- All contributors and supporters of this project

---

**Criticality** - Reach criticality in your STEM career journey. 