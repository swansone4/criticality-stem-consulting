'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import { Award, GraduationCap, Building2, Users, Target, BookOpen } from 'lucide-react'

const timelineData = [
  {
    year: '2018',
    title: 'Academic Suspension',
    description: 'Faced academic challenges that threatened STEM career aspirations',
    icon: BookOpen
  },
  {
    year: '2019',
    title: 'Academic Recovery',
    description: 'Implemented strategic study methods and mentorship approaches',
    icon: Target
  },
  {
    year: '2020',
    title: 'Oak Ridge National Lab',
    description: 'Secured prestigious research internship at national laboratory',
    icon: Building2
  },
  {
    year: '2021',
    title: 'NIST Research',
    description: 'Advanced research opportunities at National Institute of Standards',
    icon: Award
  },
  {
    year: '2022',
    title: 'PhD Acceptance',
    description: 'Accepted into University of Florida PhD program in nuclear engineering',
    icon: GraduationCap
  },
  {
    year: '2023',
    title: 'Criticality Founded',
    description: 'Launched consulting service to help others achieve STEM success',
    icon: Users
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Physics Major',
    content: 'Criticality helped me secure a summer internship at a national lab. The guidance was invaluable.',
    outcome: 'Oak Ridge National Lab Internship'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Engineering Student',
    content: 'From academic probation to PhD acceptance - Criticality made it possible.',
    outcome: 'PhD Program Acceptance'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Scientist',
    content: 'The networking strategies I learned here opened doors I never thought possible.',
    outcome: 'Industry Research Position'
  }
]

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 section-padding">
        <div className="container-max">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary-500 mb-8">
              The Science of Academic Transformation
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Our founder's journey from academic suspension to PhD acceptance at the University of Florida, 
              with research experience at Oak Ridge National Lab and NIST, demonstrates the power of 
              strategic guidance and mentorship in STEM career development.
            </p>
          </motion.div>

          {/* Credentials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: Building2,
                title: 'Oak Ridge National Lab',
                description: 'Research experience in nuclear engineering and materials science'
              },
              {
                icon: Award,
                title: 'NIST Research',
                description: 'Advanced research in standards and measurement technologies'
              },
              {
                icon: GraduationCap,
                title: 'University of Florida PhD',
                description: 'Nuclear engineering doctoral program acceptance and research'
              }
            ].map((credential, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center card-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <credential.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-primary-500 mb-3">{credential.title}</h3>
                <p className="text-gray-600">{credential.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding academic-gradient">
        <div className="container-max">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Mission Statement
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Empowering STEM students to reach their critical mass of success through personalized guidance, 
              proven strategies, and hands-on mentorship. We transform academic challenges into opportunities 
              for growth, research excellence, and career advancement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section ref={timelineRef} className="section-padding">
        <div className="container-max">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-primary-500 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Journey to Success
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-primary-200"></div>

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 card-hover">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <item.icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <span className="text-sm font-semibold text-primary-500">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-500 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="section-padding academic-gradient">
        <div className="container-max">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-primary-500 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Client Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 card-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="mb-6">
                  <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="font-semibold text-primary-500">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-primary-600">Outcome:</p>
                  <p className="text-primary-500 font-medium">{testimonial.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 