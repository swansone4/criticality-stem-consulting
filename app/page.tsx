'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FlaskConical, ClipboardList, Brain, Network, GraduationCap, BookOpen, Users, Target, FileText, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react'
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

const serviceGroups = [
  {
    icon: Target,
    title: 'Strategic Direction & Career Mapping',
    description: 'Design your STEM journey with clarity and intention.',
    services: [
      'Personalized career roadmaps',
      'Graduate school preparation',
      'Industry transition strategies',
      'Academic recovery strategies',
      'Study skills coaching',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Research & Academic Development',
    description: 'Position yourself for high-impact work and academic credibility.',
    services: [
      'Research opportunity identification',
      'Research opportunity database',
      'Research methodology training',
      'Lab report writing assistance',
      'Project portfolio building',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Professional Skills & Application Prep',
    description: 'Build materials that get noticed and skills that get results.',
    services: [
      'Resume and CV optimization',
      'Cold outreach templates',
      'Interview preparation',
      'Presentation skills',
      'Scientific communication training',
    ],
  },
  {
    icon: Brain,
    title: 'STEM Tutoring & Subject Mastery',
    description: 'Strengthen your knowledge where it counts.',
    services: [
      'Physics and nuclear engineering tutoring',
      'Research methodology',
      'Study skills coaching',
    ],
  },
  {
    icon: Network,
    title: 'Community & Networking',
    description: 'Surround yourself with people and systems that help you grow.',
    services: [
      'Virtual networking events',
      'Cold outreach templates',
      'Mentorship access (optional future feature)',
    ],
  },
]

const processSteps = [
  {
    icon: FileText,
    title: 'Assessment',
    text: 'We start by understanding your background, goals, and current position. No guesswork—just a clear picture of where you stand.'
  },
  {
    icon: ClipboardList,
    title: 'Strategy',
    text: 'Based on your inputs, we co-design a path forward—customizing resources, services, and timelines that align with your unique vision.'
  },
  {
    icon: CheckCircle,
    title: 'Implementation',
    text: 'We walk with you through each step: applications, research, prep work, and community engagement—making sure no ball is dropped.'
  },
  {
    icon: GraduationCap,
    title: 'Success',
    text: 'Whether it’s a research lab, grad program, or internship offer—when you win, we win. And we stick around to support what comes next.'
  },
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
    <div className="min-h-screen bg-white font-academic">
      <Navigation />
      {/* Hero Section */}
      <section className="container-max pt-32 pb-20 px-4 flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="flex-1 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-6 text-left">Empowering the Next Generation of STEM Talent</h1>
          <p className="text-xl text-gray-700 mb-8 text-left max-w-2xl">
            We provide students, researchers, and professionals with the tools and strategies to thrive in the world of science—no matter where they’re starting from.
          </p>
          <a href="#services" className="button-primary text-lg px-8 py-4 inline-block">Explore Services</a>
        </div>
        <div className="flex-1 w-full flex justify-center md:justify-end">
          {/* Optionally, add a science-themed SVG or mesh here */}
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block">
            <circle cx="130" cy="130" r="120" stroke="#8b2635" strokeWidth="2" fill="#f8f6f1" />
            <circle cx="130" cy="130" r="80" stroke="#2c3e50" strokeWidth="1.5" fill="none" />
            <circle cx="130" cy="130" r="40" stroke="#adb5bd" strokeWidth="1" fill="none" />
            <circle cx="130" cy="70" r="8" fill="#8b2635" />
            <circle cx="200" cy="130" r="6" fill="#2c3e50" />
            <circle cx="130" cy="200" r="5" fill="#adb5bd" />
            <circle cx="60" cy="130" r="4" fill="#2c3e50" />
            <circle cx="130" cy="130" r="2" fill="#8b2635" />
          </svg>
        </div>
      </section>

      {/* Service Categories */}
      <section id="services" className="container-max py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-navy mb-12 text-center">Our Service Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {serviceGroups.map((group, idx) => (
            <div key={group.title} className="bg-[#f8f6f1] rounded-lg shadow-md p-8 flex flex-col gap-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <group.icon className="w-8 h-8 text-accent-burgundy" />
                <span className="text-xl font-bold text-accent-navy">{group.title}</span>
              </div>
              <div className="text-gray-700 mb-2 text-base">{group.description}</div>
              <ul className="list-disc pl-6 space-y-1">
                {group.services.map((service) => (
                  <li key={service} className="text-gray-800 text-base">{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process Section */}
      <section className="container-max py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-navy mb-12 text-center">Our Process: Built for Breakthroughs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="bg-[#f8f6f1] rounded-lg shadow-md p-8 flex flex-col items-center border border-gray-200">
              <step.icon className="w-10 h-10 mb-4 text-accent-burgundy" />
              <div className="text-xl font-bold text-accent-navy mb-2">{step.title}</div>
              <div className="text-gray-700 text-base text-center">{step.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 