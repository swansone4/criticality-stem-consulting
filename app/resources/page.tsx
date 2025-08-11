'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Resource {
  title: string
  description: string
  slug: string
  category: string
  type: string
  image: string
  date?: string
  featured?: boolean
  videoUrl?: string
  duration?: number
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [selectedCategory, setSelectedCategory] = useState('blogs')
  
  useEffect(() => {
    // Load resources on client side
    const loadResources = async () => {
      try {
        const response = await fetch('/api/resources')
        const data = await response.json()
        setResources(data)
      } catch (error) {
        console.error('Failed to load resources:', error)
        // Fallback to static data if API fails
        setResources([
          {
            title: 'Example Blog Post',
            description: 'This is a sample blog post to demonstrate the file-based resource system.',
            slug: 'example-blog',
            category: 'blogs',
            type: 'Blog',
            image: 'https://via.placeholder.com/400x300?text=No+Image',
            date: '2024-07-01',
            featured: true
          },
          {
            title: 'Example STEM Video',
            description: 'A sample video entry for the resources page.',
            slug: 'example-stem-video',
            category: 'videos',
            type: 'Video',
            image: 'https://via.placeholder.com/400x300?text=No+Image',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration: 300,
            date: '2024-07-01'
          }
        ])
      }
    }
    loadResources()
  }, [])

  const categories = [
    { key: 'blogs', label: 'Blogs' },
    { key: 'videos', label: 'Videos' },
  ]
  const filteredResources = resources.filter(r => r.category === selectedCategory)
  const featuredResource = filteredResources.find(r => r.featured) || filteredResources[0] || null

  return (
    <div className="min-h-screen bg-white font-academic">
      <Navigation />
      <section className="container-max px-4 pt-24 pb-12">
        <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-2">Resources</h1>
        </motion.div>
        {/* Category Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 border-b border-gray-200 pb-2" aria-label="Resource categories">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-lg font-semibold pb-1 transition-colors duration-200 ${selectedCategory === cat.key ? 'text-accent-burgundy border-b-2 border-accent-burgundy' : 'text-accent-navy'}`}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </nav>
        {/* Featured Section */}
        <AnimatePresence mode="wait">
          {featuredResource && (
            <motion.div key={`${selectedCategory}-featured`} className="mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div className="bg-[#f8f6f1] border border-accent-burgundy rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6 relative">
                <div className="relative w-full md:w-48 h-40 flex-shrink-0 mb-4 md:mb-0">
                  <Image
                    src={featuredResource.image}
                    alt={featuredResource.title}
                    fill
                    className="object-cover rounded-md grayscale hover:grayscale-0 transition duration-300"
                    unoptimized
                  />
                  <span className="absolute top-2 left-2 bg-white text-xs text-accent-navy px-2 py-1 rounded font-semibold">Featured</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-accent-navy mb-1">{featuredResource.title}</h2>
                  <p className="text-gray-700 mb-2">{featuredResource.description}</p>
                  <div className="text-xs text-gray-500 mb-2">
                    {featuredResource.date ? new Date(featuredResource.date).toLocaleDateString() : 'Recently'}
                    {featuredResource.duration && ` • ${Math.floor(featuredResource.duration / 60)}:${(featuredResource.duration % 60).toString().padStart(2, '0')}`}
                  </div>
                  {featuredResource.category === 'videos' ? (
                    <a href={featuredResource.videoUrl} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium" target="_blank" rel="noreferrer">
                      Watch
                    </a>
                  ) : (
                    <Link href={`/resources/${featuredResource.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Resource Grid */}
        <AnimatePresence mode="sync">
          <motion.div key={selectedCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            {filteredResources.map((r, idx) => (
              <motion.div
                key={r.slug}
                className="bg-[#f8f6f1] rounded-lg shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
              >
                <div className="relative mb-4 h-40 w-full">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover rounded-md grayscale hover:grayscale-0 transition duration-300"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-accent-navy mb-1">{r.title}</h3>
                <p className="text-gray-700 mb-2">{r.description}</p>
                <div className="text-xs text-gray-500 mb-4">
                  {r.date ? new Date(r.date).toLocaleDateString() : 'Recently'}
                  {r.duration && ` • ${Math.floor(r.duration / 60)}:${(r.duration % 60).toString().padStart(2, '0')}`}
                </div>
                {r.category === 'videos' ? (
                  <a href={r.videoUrl} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium" target="_blank" rel="noreferrer">
                    Watch
                  </a>
                ) : (
                  <Link href={`/resources/${r.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">
                    Read More
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
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
    </div>
  )
}