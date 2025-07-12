'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  Target, Users, GraduationCap, BookOpen, 
  Check, ArrowRight, Calendar, MessageSquare,
  Award, Network, FileText, Clock, Sparkles, Zap, Rocket
} from 'lucide-react'

const cornerstoneServices = [
  {
    id: 'career-guidance',
    title: 'Career Pathway <span className="text-accent-orange">Mapping</span>',
    icon: Target,
    description: 'Strategic planning for your STEM journey with proven methodologies',
    features: [
      'Personalized career roadmaps',
      'Research opportunity identification', 
      'Graduate school preparation',
      'Industry transition strategies',
      'Resume and CV optimization',
      'Interview preparation'
    ],
    highlight: 'Transform your trajectory',
    color: 'primary'
  },
  {
    id: 'research-networking',
    title: 'Research & <span className="text-accent-blue">Networking</span>',
    icon: Users,
    description: 'Connect with opportunities and mentors in the STEM community',
    features: [
      'Mentorship matching',
      'Research opportunity database',
      'Professional connection strategies',
      'Cold outreach templates',
      'Industry introduction services',
      'Virtual networking events'
    ],
    highlight: 'Build your network',
    color: 'accent-blue'
  },
  {
    id: 'skill-development',
    title: 'Professional <span className="text-accent-orange">Skill Development</span>',
    icon: GraduationCap,
    description: 'Develop essential skills for STEM career advancement',
    features: [
      'Scientific communication training',
      'Technical writing workshops',
      'Presentation skills',
      'Research methodology',
      'Project portfolio building',
      'Leadership development'
    ],
    highlight: 'Master your craft',
    color: 'accent-orange'
  },
  {
    id: 'academic-support',
    title: 'Academic <span className="text-primary-500">Support</span>',
    icon: BookOpen,
    description: 'Specialized tutoring and academic recovery strategies',
    features: [
      'Physics and nuclear engineering tutoring',
      'Study skills coaching',
      'Academic recovery strategies',
      'Test preparation',
      'Lab report writing assistance',
      'Research methodology training'
    ],
    highlight: 'Excel academically',
    color: 'primary'
  }
]

const processSteps = [
  {
    step: '01',
    title: 'Assessment',
    description: 'We evaluate your current situation, goals, and aspirations',
    icon: FileText
  },
  {
    step: '02', 
    title: 'Strategy',
    description: 'Develop a personalized roadmap for your STEM journey',
    icon: Target
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Execute your plan with ongoing support and guidance',
    icon: Rocket
  },
  {
    step: '04',
    title: 'Success',
    description: 'Achieve your goals and continue growing in your career',
    icon: Award
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [servicesRef, servicesInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [processRef, processInView] = useInView({
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
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-blue rounded-full mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-500 mb-8">
              Our <span className="text-accent-orange">Cornerstone</span> Services
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Four comprehensive pillars designed to <span className="text-primary-500 font-semibold">transform your STEM trajectory</span> through 
              personalized guidance, proven strategies, and hands-on mentorship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section ref={servicesRef} className="section-padding academic-gradient">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {cornerstoneServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`bg-white p-8 rounded-xl shadow-xl border-2 border-transparent hover:border-${service.color}-200 card-hover relative overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setSelectedService(service.id)}
                onMouseLeave={() => setSelectedService(null)}
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-50/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 
                        className="text-2xl font-semibold text-primary-500 mb-2"
                        dangerouslySetInnerHTML={{ __html: service.title }}
                      />
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
                        <Check className={`w-5 h-5 text-${service.color}-500 mr-3 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Key Outcome</p>
                        <p className={`text-xl font-bold text-${service.color}-500`}>
                          {service.highlight}
                        </p>
                      </div>
                      <button className={`button-secondary border-${service.color}-500 text-${service.color}-500 hover:bg-${service.color}-500 hover:text-white`}>
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section ref={processRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white"></div>
        <div className="container-max relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Our <span className="text-accent-orange">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A proven methodology that transforms <span className="text-primary-500 font-semibold">aspirations into achievements</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-blue rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary-500 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
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
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-orange to-accent-blue rounded-full mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Ready to <span className="text-accent-orange">Transform</span> Your STEM Career?
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Let's discuss your goals and create a personalized strategy for your success. 
              <span className="text-primary-500 font-semibold"> No commitment required.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Start Your Journey
              </button>
              <button className="button-secondary text-lg px-8 py-4">
                <MessageSquare className="w-5 h-5 mr-2" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 