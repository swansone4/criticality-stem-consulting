'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  Target, Users, GraduationCap, BookOpen, 
  Check, ArrowRight, Calendar, MessageSquare,
  Award, Network, FileText, Clock
} from 'lucide-react'

const services = [
  {
    id: 'career-guidance',
    title: 'STEM Career Pathway Guidance',
    icon: Target,
    description: 'Strategic planning for your STEM journey with proven methodologies',
    features: [
      'Career planning workshops',
      'Research opportunity identification',
      'Graduate school preparation',
      'Industry transition support',
      'Personalized career roadmaps',
      'Resume and CV optimization'
    ],
    pricing: {
      consultation: '$150',
      workshop: '$300',
      package: '$800'
    }
  },
  {
    id: 'research-networking',
    title: 'Research & Networking Facilitation',
    icon: Users,
    description: 'Connect with opportunities and mentors in the STEM community',
    features: [
      'Mentorship matching',
      'Virtual networking events',
      'Research opportunity database',
      'Professional connection strategies',
      'Cold outreach templates',
      'Industry introduction services'
    ],
    pricing: {
      consultation: '$200',
      workshop: '$400',
      package: '$1000'
    }
  },
  {
    id: 'skill-development',
    title: 'Professional Skill Development',
    icon: GraduationCap,
    description: 'Develop essential skills for STEM career advancement',
    features: [
      'Scientific communication training',
      'Cold outreach templates',
      'Resume/CV optimization',
      'Interview preparation',
      'Presentation skills',
      'Technical writing workshops'
    ],
    pricing: {
      consultation: '$175',
      workshop: '$350',
      package: '$900'
    }
  },
  {
    id: 'academic-support',
    title: 'Academic Support & Tutoring',
    icon: BookOpen,
    description: 'Specialized tutoring and academic recovery strategies',
    features: [
      'Physics and nuclear engineering tutoring',
      'Study skills coaching',
      'Test preparation',
      'Academic recovery strategies',
      'Research methodology training',
      'Lab report writing assistance'
    ],
    pricing: {
      consultation: '$125',
      workshop: '$250',
      package: '$600'
    }
  }
]

const pricingTiers = [
  {
    name: 'Consultation',
    description: 'One-time strategic session',
    price: 'From $125',
    duration: '1-2 hours',
    features: [
      'Initial assessment',
      'Goal setting',
      'Action plan',
      'Follow-up email'
    ]
  },
  {
    name: 'Workshop',
    description: 'Intensive skill-building session',
    price: 'From $250',
    duration: '4-6 hours',
    features: [
      'Comprehensive training',
      'Hands-on practice',
      'Resource materials',
      '30-day support'
    ]
  },
  {
    name: 'Package',
    description: 'Complete transformation program',
    price: 'From $600',
    duration: '3-6 months',
    features: [
      'Ongoing mentorship',
      'Progress tracking',
      'Resource access',
      'Priority support'
    ]
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [servicesRef, servicesInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [pricingRef, pricingInView] = useInView({
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
              Our Services
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Four comprehensive pillars designed to transform your STEM trajectory through 
              personalized guidance, proven strategies, and hands-on mentorship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section ref={servicesRef} className="section-padding academic-gradient">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 card-hover"
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setSelectedService(service.id)}
                onMouseLeave={() => setSelectedService(null)}
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-primary-500 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Starting at</p>
                      <p className="text-2xl font-bold text-primary-500">
                        {service.pricing.consultation}
                      </p>
                    </div>
                    <button className="button-secondary">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section ref={pricingRef} className="section-padding">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose the engagement level that fits your needs and budget. 
              All packages include our proven methodologies and ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                className={`bg-white p-8 rounded-lg shadow-lg border-2 ${
                  index === 1 
                    ? 'border-primary-500 relative transform scale-105' 
                    : 'border-gray-200'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-500 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-500">{tier.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">{tier.duration}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  index === 1 
                    ? 'button-primary' 
                    : 'button-secondary'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding academic-gradient">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Ready to Transform Your STEM Career?
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Schedule a consultation to discuss your goals and discover how our 
              personalized approach can accelerate your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </button>
              <button className="button-secondary text-lg px-8 py-4">
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 