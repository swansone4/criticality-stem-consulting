'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Mail, ArrowRight, BookOpen, Users, Target, GraduationCap } from 'lucide-react'
import Navigation from '@/components/Navigation'

const textReelItems = [
  "research opportunities",
  "professional networks", 
  "science careers",
  "academic performance",
  "graduate applications",
  "laboratory skills",
  "industry connections"
]

export default function HomePage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [show, setShow] = useState(true)
  const [email, setEmail] = useState('')

  // Pure fade animation for rotating text
  useEffect(() => {
    const fadeOut = setTimeout(() => setShow(false), 2200)
    const next = setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textReelItems.length)
      setShow(true)
    }, 2600)
    return () => {
      clearTimeout(fadeOut)
      clearTimeout(next)
    }
  }, [currentTextIndex])

  // Scroll-triggered animations
  const [section1Ref, section1InView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [section2Ref, section2InView] = useInView({
    threshold: 0.6,
    triggerOnce: true
  })

  const [section3Ref, section3InView] = useInView({
    threshold: 0.8,
    triggerOnce: true
  })

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // TODO: Implement email submission logic
      console.log('Email submitted:', email)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-200 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container-max text-center z-10 px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-primary-500 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Take the next step in your{' '}
            <span className="relative inline-block">
              <div className="h-20 md:h-28 flex items-center justify-center">
                <motion.div
                  key={currentTextIndex}
                  className="text-primary-600"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: show ? 1 : 0,
                    filter: show ? 'brightness(1.1) drop-shadow(0 0 8px #4F7FF0)' : 'brightness(1)'
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    animation: show ? 'pulse-hue 1.2s infinite alternate' : 'none',
                  }}
                >
                  {textReelItems[currentTextIndex]}
                </motion.div>
              </div>
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The premier platform for students seeking STEM mentorship, connections & resources
          </motion.p>

          {/* Email Form */}
          <motion.form 
            onSubmit={handleEmailSubmit}
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email to connect"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 input-field"
                required
              />
              <button type="submit" className="button-primary">
                Connect
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ChevronDown className="w-8 h-8 text-primary-500 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Section 1: Tailored Approach */}
      <section ref={section1Ref} className="section-padding academic-gradient">
        <div className="container-max">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={section1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Demystifying <span className="text-accent-orange animate-pulse">STEM pathways</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Our approach is <span className="text-primary-500 font-semibold">simple</span>. We identify your <span className="text-accent-blue font-semibold">fields of interest</span> and <span className="text-accent-blue font-semibold">current academic situation</span>.<br/>
              From there, we <span className="text-accent-orange font-semibold">map out a career trajectory</span>— aiding in everything from: <span className="text-primary-500 font-semibold">project portfolio building</span>, <span className="text-primary-500 font-semibold">finding research internships and fellowships</span>, <span className="text-primary-500 font-semibold">developing your academic network</span>, and <span className="text-accent-orange font-semibold">providing personalized mentorship</span>.
            </p>
            <Link href="/services">
              <button className="button-primary text-lg px-8 py-4 mb-8 animate-fade-in-up">
                Our Process
              </button>
            </Link>
            {/* Animated Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: BookOpen, title: "Research", desc: "Opportunity identification" },
                { icon: Users, title: "Networking", desc: "Professional connections" },
                { icon: Target, title: "Growth", desc: "Career advancement" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={section1InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <item.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-500 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: From Setbacks to Success */}
      <section ref={section2Ref} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white"></div>
        <div className="container-max relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={section2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              We are <span className="text-accent-blue animate-pulse">students too!</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-primary-500 font-semibold">Eric</span>, the founder of <span className="text-accent-orange font-semibold">Criticality</span>, began this platform in part to educate people on how <span className="text-accent-blue font-semibold">lucrative STEM careers</span> can truly be. <span className="text-primary-500 font-semibold">High salaries</span>, <span className="text-primary-500 font-semibold">time flexibility</span>, <span className="text-accent-orange font-semibold">research-direction freedom</span>, and <span className="text-accent-blue font-semibold">compelling networks</span> are the primary reasons why Eric ended up pursuing a <span className="text-primary-500 font-semibold">Ph.D. in nuclear engineering</span> at the University of Florida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Services Preview */}
      <section ref={section3Ref} className="section-padding">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={section3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-8">
              Your STEM Future Starts Here
            </h2>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Career Pathway Guidance",
                desc: "Strategic planning for your STEM journey",
                icon: Target
              },
              {
                title: "Research & Networking",
                desc: "Connect with opportunities and mentors",
                icon: Users
              },
              {
                title: "Skill Development",
                desc: "Professional and technical growth",
                icon: GraduationCap
              },
              {
                title: "Academic Support",
                desc: "Tutoring and recovery strategies",
                icon: BookOpen
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg card-hover border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={section3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-primary-500 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link href="/services" className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={section3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/services" className="button-primary text-lg px-8 py-4">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 