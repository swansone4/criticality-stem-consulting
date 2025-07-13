'use client'

import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  return (
    <motion.div
      className="min-h-screen bg-white font-academic"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />
      <section className="container-max px-4 py-16">
        {/* Page Title & Intro */}
        <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-4">What We Offer</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-12">
          At Criticality, we offer structured, high-impact support for students and professionals navigating the STEM landscape—from academic recovery to advanced research training. Every service is designed to help you advance with intention, clarity, and support.
        </p>

        {/* Grouped Services - Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Career & Academic Strategy */}
          <div className="bg-[#f8f6f1] rounded-xl shadow-md p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-accent-navy mb-2">Career & Academic Strategy</h2>
            <p className="text-gray-700 mb-3">Helping you clarify direction and make informed decisions at every stage.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Personalized career roadmaps</li>
              <li>Graduate school preparation</li>
              <li>Industry transition strategies</li>
              <li>Academic recovery strategies</li>
              <li>Study skills coaching</li>
            </ul>
          </div>
          {/* Research & Development Preparation */}
          <div className="bg-[#f8f6f1] rounded-xl shadow-md p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-accent-navy mb-2">Research & Development Preparation</h2>
            <p className="text-gray-700 mb-3">Equipping you with access, skills, and experience for research-oriented paths.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Research opportunity identification</li>
              <li>Research opportunity database</li>
              <li>Research methodology training</li>
              <li>Project portfolio building</li>
              <li>Lab report writing assistance</li>
            </ul>
          </div>
          {/* Professional Readiness & Communication */}
          <div className="bg-[#f8f6f1] rounded-xl shadow-md p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-accent-navy mb-2">Professional Readiness & Communication</h2>
            <p className="text-gray-700 mb-3">Preparing your materials and mindset for applications, interviews, and collaboration.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Resume and CV optimization</li>
              <li>Interview preparation</li>
              <li>Cold outreach templates</li>
              <li>Scientific communication training</li>
              <li>Presentation skills</li>
            </ul>
          </div>
          {/* Subject Mastery & Tutoring */}
          <div className="bg-[#f8f6f1] rounded-xl shadow-md p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-accent-navy mb-2">Subject Mastery & Tutoring</h2>
            <p className="text-gray-700 mb-3">Strengthening core STEM understanding where it matters most.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Physics and nuclear engineering tutoring</li>
              <li>Research methodology</li>
            </ul>
          </div>
        </div>

        {/* Process Section - Card/Bubble Style */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-accent-navy mb-8">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#f8f6f1] rounded-xl shadow p-6 flex flex-col h-full">
              <div className="font-bold text-lg mb-2">Assessment</div>
              <div className="text-gray-700 text-base">We begin by understanding your academic background, goals, and current challenges.</div>
            </div>
            <div className="bg-[#f8f6f1] rounded-xl shadow p-6 flex flex-col h-full">
              <div className="font-bold text-lg mb-2">Strategy</div>
              <div className="text-gray-700 text-base">Together, we design a customized action plan—choosing relevant services and setting milestones.</div>
            </div>
            <div className="bg-[#f8f6f1] rounded-xl shadow p-6 flex flex-col h-full">
              <div className="font-bold text-lg mb-2">Implementation</div>
              <div className="text-gray-700 text-base">You’ll receive structured support as you execute, refine, and build the skills needed to advance.</div>
            </div>
            <div className="bg-[#f8f6f1] rounded-xl shadow p-6 flex flex-col h-full">
              <div className="font-bold text-lg mb-2">Success</div>
              <div className="text-gray-700 text-base">We measure outcomes, reflect, and recalibrate. Whether it’s a research role, internship, or acceptance letter, we prepare you for what comes next.</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
} 