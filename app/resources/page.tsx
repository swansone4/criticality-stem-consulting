'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

const categories = [
  { key: 'blogs', label: 'Blogs' },
  { key: 'videos', label: 'Videos' },
  // Removed 'Guides & Templates' and 'Tools & Downloads'
]

const featuredResource = {
  id: 1,
  category: 'blogs',
  title: 'How to Build a Research Portfolio',
  description: 'A step-by-step guide to assembling a compelling research portfolio for STEM applications.',
  date: 'May 2024',
  image: '/placeholder-thumb.jpg',
  type: 'Blog',
}

const resources = [
  {
    id: 2,
    category: 'blogs',
    title: 'Networking for Scientists',
    description: 'Practical strategies for building your professional network in academia and industry.',
    date: 'April 2024',
    image: '/placeholder-thumb.jpg',
    type: 'Blog',
  },
  {
    id: 3,
    category: 'videos',
    title: 'How to Write a Winning STEM Resume',
    description: 'Video walkthrough of resume best practices for STEM students.',
    date: 'March 2024',
    image: '/placeholder-thumb.jpg',
    type: 'Video',
    duration: '8:32',
  },
  // Removed guides and tools resources
]

const recommended = [
  {
    id: 6,
    title: 'How to Find STEM Internships',
    image: '/placeholder-thumb.jpg',
  },
  {
    id: 7,
    title: 'Writing Your First Research Paper',
    image: '/placeholder-thumb.jpg',
  },
  {
    id: 8,
    title: 'Lab Notebook Best Practices',
    image: '/placeholder-thumb.jpg',
  },
]

const tags = ['Research', 'Networking', 'Portfolio', 'Applications']

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('blogs')
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Filtered resources
  const filteredResources = resources.filter(
    r =>
      r.category === activeCategory &&
      (!search || r.title.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedTag || r.description.toLowerCase().includes(selectedTag.toLowerCase()))
  )

  return (
    <motion.div
      className="min-h-screen bg-white font-academic"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />
      <section className="container-max px-4 pt-24 pb-12"> {/* Increased top padding from py-12 to pt-24 pb-12 */}
        {/* Hero Section */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-2">Resources</h1>
          {/* Removed subheading */}
        </motion.div>

        {/* Category Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 border-b border-gray-200 pb-2" aria-label="Resource categories">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`text-lg font-semibold pb-1 transition-colors duration-200 ${activeCategory === cat.key ? 'text-accent-burgundy border-b-2 border-accent-burgundy' : 'text-accent-navy hover:text-accent-burgundy'}`}
              onClick={() => setActiveCategory(cat.key)}
              aria-current={activeCategory === cat.key ? 'page' : undefined}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Search & Filter Bar */}
        <form className="flex flex-wrap gap-4 items-center justify-between mb-8" role="search" aria-label="Resource search and filter">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 font-academic text-base"
            placeholder="Search resources …"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search resources"
          />
          <select
            className="border border-gray-300 rounded px-4 py-2 font-academic text-base"
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            aria-label="Filter by topic"
          >
            <option value="">All Topics</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <button type="submit" className="button-primary px-6 py-2 text-base">Apply</button>
          <button type="button" className="button-secondary px-6 py-2 text-base" onClick={() => { setSearch(''); setSelectedTag(''); }}>Reset</button>
        </form>

        {/* Featured Section */}
        <div className="mb-10">
          <div className="bg-[#f8f6f1] border border-accent-burgundy rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6 relative">
            <div className="relative w-full md:w-48 h-40 flex-shrink-0 mb-4 md:mb-0">
              <Image
                src={featuredResource.image}
                alt={featuredResource.title}
                fill
                className="object-cover rounded-md grayscale hover:grayscale-0 transition duration-300"
              />
              <span className="absolute top-2 left-2 bg-white text-xs text-accent-navy px-2 py-1 rounded font-semibold">Featured</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-accent-navy mb-1">{featuredResource.title}</h2>
              <p className="text-gray-700 mb-2">{featuredResource.description}</p>
              <div className="text-xs text-gray-500 mb-2">{featuredResource.date}</div>
              <a href="#" className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">Read More</a>
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((r, i) => (
            <motion.div
              key={r.id}
              className="bg-[#f8f6f1] rounded-lg shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="relative mb-4 h-40 w-full">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover rounded-md grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-accent-navy mb-1">{r.title}</h3>
              <p className="text-gray-700 mb-2">{r.description}</p>
              <div className="text-xs text-gray-500 mb-4">{r.date}{r.duration ? ` • ${r.duration}` : ''}</div>
              <a href="#" className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">{r.type === 'Video' ? 'Watch' : 'Read More'}</a>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mb-16">
          <button className="border border-accent-burgundy text-accent-burgundy px-8 py-3 rounded font-medium transition-colors duration-200 hover:bg-accent-burgundy hover:text-white">Load More</button>
        </div>

        {/* Sidebar Recommended (desktop) */}
        {/* Removed the entire aside for 'Recommended for You' */}

        {/* Footer Newsletter Banner */}
        <footer className="mt-24 bg-[#f8f6f1] rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
          <div className="text-xl font-bold text-accent-navy mb-2">Subscribe to our Newsletter for Weekly STEM Insights</div>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <input
              type="email"
              className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64 font-academic text-base"
              placeholder="Enter your email"
              aria-label="Email address"
            />
            <button type="submit" className="button-primary px-6 py-2 text-base">Subscribe</button>
          </form>
        </footer>
      </section>
    </motion.div>
  )
} 