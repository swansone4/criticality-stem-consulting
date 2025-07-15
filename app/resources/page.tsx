'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

interface Resource {
  _id: string
  title: string
  description: string
  category: 'blogs' | 'videos'
  type: 'Blog' | 'Video'
  content: {
    body?: string
    videoUrl?: string
    duration?: number
  }
  image: string
  slug: string
  tags: string[]
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  author: {
    name: string
    bio?: string
    avatar?: string
  }
  views: number
  likes: number
  publishedAt: string
  createdAt: string
  updatedAt: string
}

const categories = [
  { key: 'blogs', label: 'Blogs' },
  { key: 'videos', label: 'Videos' },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [featuredResource, setFeaturedResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('blogs')
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [availableTags, setAvailableTags] = useState<string[]>([])

  useEffect(() => {
    fetchResources()
    fetchTags()
  }, [])

  useEffect(() => {
    fetchFeaturedResource()
  }, [])

  const fetchResources = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/resources?status=published')
      const data = await response.json()
      
      if (data.success) {
        setResources(data.data.resources)
      } else {
        setError('Failed to fetch resources')
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
      setError('Failed to fetch resources')
    } finally {
      setLoading(false)
    }
  }

  const fetchFeaturedResource = async () => {
    try {
      const response = await fetch('/api/resources/featured')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        setFeaturedResource(data.data[0])
      }
    } catch (error) {
      console.error('Error fetching featured resource:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/resources/tags/all')
      const data = await response.json()
      
      if (data.success) {
        setAvailableTags(data.data)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  // Filtered resources
  const filteredResources = resources.filter(
    r =>
      r.category === activeCategory &&
      (!search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedTag || r.tags.includes(selectedTag.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-academic flex items-center justify-center">
        <div className="text-xl text-accent-navy">Loading resources...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white font-academic flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-white font-academic"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />
      <section className="container-max px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-2">Resources</h1>
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
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <button type="button" className="button-secondary px-6 py-2 text-base" onClick={() => { setSearch(''); setSelectedTag(''); }}>Reset</button>
        </form>

        {/* Featured Section */}
        {featuredResource && (
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
                <div className="text-xs text-gray-500 mb-2">
                  {featuredResource.publishedAt ? new Date(featuredResource.publishedAt).toLocaleDateString() : 'Recently'}
                  {featuredResource.content.duration && ` • ${Math.floor(featuredResource.content.duration / 60)}:${(featuredResource.content.duration % 60).toString().padStart(2, '0')}`}
                </div>
                <a href={`/resources/${featuredResource.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">
                  {featuredResource.type === 'Video' ? 'Watch' : 'Read More'}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((r, i) => (
            <motion.div
              key={r._id}
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
              <div className="text-xs text-gray-500 mb-4">
                {r.publishedAt ? new Date(r.publishedAt).toLocaleDateString() : 'Recently'}
                {r.content.duration && ` • ${Math.floor(r.content.duration / 60)}:${(r.content.duration % 60).toString().padStart(2, '0')}`}
              </div>
              <a href={`/resources/${r.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium">
                {r.type === 'Video' ? 'Watch' : 'Read More'}
              </a>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No resources found in this category. Try adjusting your search or filters.
          </div>
        )}

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