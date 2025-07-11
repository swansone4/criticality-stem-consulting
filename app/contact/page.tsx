'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  User, MessageSquare, GraduationCap, Target
} from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  academicLevel: string
  interests: string[]
  message: string
}

const academicLevels = [
  'High School Student',
  'Undergraduate Student',
  'Graduate Student',
  'PhD Student',
  'Recent Graduate',
  'Professional'
]

const interestAreas = [
  'Career Planning',
  'Research Opportunities',
  'Graduate School Preparation',
  'Academic Recovery',
  'Networking',
  'Skill Development',
  'Tutoring',
  'Other'
]

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@criticality-stem.com',
    description: 'Primary contact method'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Available during business hours'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    description: 'We typically respond within one business day'
  }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>()

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [formRef, formInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual API call
      console.log('Form data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Thank you! Your message has been sent successfully.')
      setSubmitted(true)
      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Ready to transform your STEM career? Let's discuss your goals and create 
              a personalized strategy for your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={formRef} className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-primary-500 mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-primary-500 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="button-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="input-field pl-10"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="input-field pl-10"
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('phone')}
                        type="tel"
                        className="input-field pl-10"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Academic Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Level *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        {...register('academicLevel', { required: 'Academic level is required' })}
                        className="input-field pl-10"
                      >
                        <option value="">Select your academic level</option>
                        {academicLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    {errors.academicLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.academicLevel.message}</p>
                    )}
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Interest *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {interestAreas.map((interest) => (
                        <label key={interest} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={interest}
                            {...register('interests', { required: 'Please select at least one area of interest' })}
                            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                        rows={5}
                        className="input-field pl-10 resize-none"
                        placeholder="Tell us about your goals and how we can help..."
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-primary-500 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of these channels. We're here to help 
                  you achieve your STEM career goals.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-500 mb-1">{info.title}</h3>
                      <p className="text-gray-700 mb-1">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                      {info.title === 'Email' && (
                        <button
                          onClick={() => copyToClipboard(info.value)}
                          className="text-primary-500 text-sm hover:text-primary-600 mt-2"
                        >
                          Copy email address
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Consultation Booking */}
              <motion.div
                className="bg-primary-50 p-6 rounded-lg border border-primary-200"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-primary-500 mb-3">
                  Schedule a Consultation
                </h3>
                <p className="text-gray-700 mb-4">
                  Book a personalized consultation to discuss your specific goals and 
                  create a tailored strategy for your STEM career success.
                </p>
                <button className="button-primary w-full">
                  <Target className="w-5 h-5 mr-2" />
                  Book Consultation
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 