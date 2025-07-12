'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import { Award, GraduationCap, Building2, Users, Target, BookOpen } from 'lucide-react'
import Image from 'next/image'

// INSTRUCTIONS: Place your portrait image at /public/about-portrait.jpg
// Example: /public/about-portrait.jpg (relative to project root)

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
    <div className="min-h-screen bg-white font-academic">
      <Navigation />
      {/* Section 1: The Why Quote Block */}
      <section className="container-max my-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Portrait Image */}
          <div className="flex-shrink-0">
            <Image
              src="/about-portrait.jpg"
              alt="Eric, Founder"
              width={224}
              height={224}
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-lg grayscale hover:grayscale-0 transition duration-300"
              priority
            />
          </div>
          {/* Right: Quote Block */}
          <div className="bg-[#f8f6f1] rounded-lg p-8 flex-1 shadow-sm">
            <blockquote className="italic text-2xl md:text-3xl font-serif mb-4">
              "I knew there was something wrong with the way we think about STEM careers when some of my students looked visibly confused after I told them that a physics degree is one of the most future-proof, flexible, and valuable degrees you can earn."
            </blockquote>
            <div className="text-right text-gray-500 text-base mt-2">— Eric, Founder of Criticality</div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission Statement Text Bubble */}
      <section className="max-w-xl mx-auto my-12 px-4">
        <div className="relative bg-[#f8f6f1] rounded-xl shadow-md px-8 py-6">
          <div className="font-bold text-lg mb-2">Why Criticality Exists</div>
          <div className="text-base leading-relaxed">
            As we approach a world that increasingly depends on minds trained in research, development, and innovation across STEM, a stark reality remains:<br /><br />
            Access to meaningful STEM careers is often reserved for those closest to elite professors, prestigious institutions, and expensive resources.<br /><br />
            <span className="font-semibold">Criticality exists to change that.</span><br />
            Our mission is to demystify the pathway into STEM roles—whether in academia, R&D, or industry—so that talent, not privilege, becomes the determining factor for success.
          </div>
        </div>
      </section>

      {/* Section 3: The Founder's Story */}
      <section className="relative my-16 px-4">
        {/* Optionally, faded image watermark for desktop */}
        <div className="hidden md:block absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none select-none" style={{zIndex:0}}>
          <Image
            src="/about-portrait.jpg"
            alt="Eric, Founder watermark"
            fill
            style={{objectFit:'cover'}}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="font-extrabold text-3xl font-serif mb-2">The Founder’s Story</div>
          <div className="w-24 h-1 bg-accent-burgundy mb-6 rounded"></div>
          <div className="text-lg leading-relaxed">
            <span className="font-bold text-xl">I almost failed out of college.</span><br /><br />
            By the end of my second semester at a state university, my GPA had dropped below 2.0. I was lost—directionless—and unsure if I belonged in the world of science at all.<br /><br />
            But I kept moving. After countless cold emails, I landed my first research role doing work I didn’t even enjoy. Still, it was a start. I pivoted. Again and again.<br /><br />
            Eventually, something stuck.<br /><br />
            Within a year, I was conducting research at Oak Ridge National Laboratory and the National Institute of Standards and Technology. Not long after, I was accepted into a Ph.D. program at the University of Florida.<br /><br />
            That’s what Criticality is built on: the belief that with the right access, support, and strategy, any driven person can break into high-impact STEM fields—no matter where they start.
          </div>
        </div>
      </section>
    </div>
  )
} 