'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

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
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'blogs' as 'blogs' | 'videos',
    type: 'Blog' as 'Blog' | 'Video',
    content: {
      body: '',
      videoUrl: '',
      duration: 0
    },
    image: '/placeholder-thumb.jpg',
    tags: [] as string[],
    featured: false,
    status: 'draft' as 'draft' | 'published' | 'archived',
    author: {
      name: '',
      bio: '',
      avatar: '/default-avatar.jpg'
    },
    metaTitle: '',
    metaDescription: ''
  })

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources?status=all')
      const data = await response.json()
      if (data.success) {
        setResources(data.data.resources)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingResource 
        ? `/api/resources/${editingResource._id}`
        : '/api/resources'
      
      const method = editingResource ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setShowForm(false)
        setEditingResource(null)
        resetForm()
        fetchResources()
        alert(editingResource ? 'Resource updated successfully!' : 'Resource created successfully!')
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error saving resource:', error)
      alert('Error saving resource')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'blogs',
      type: 'Blog',
      content: {
        body: '',
        videoUrl: '',
        duration: 0
      },
      image: '/placeholder-thumb.jpg',
      tags: [],
      featured: false,
      status: 'draft',
      author: {
        name: '',
        bio: '',
        avatar: '/default-avatar.jpg'
      },
      metaTitle: '',
      metaDescription: ''
    })
  }

  const editResource = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      type: resource.type,
      content: {
        body: resource.content.body || '',
        videoUrl: resource.content.videoUrl || '',
        duration: resource.content.duration ?? 0,
      },
      image: resource.image,
      tags: resource.tags,
      featured: resource.featured,
      status: resource.status,
      author: {
        name: resource.author.name,
        bio: resource.author.bio || '',
        avatar: resource.author.avatar || '/default-avatar.jpg',
      },
      metaTitle: resource.metaTitle || '',
      metaDescription: resource.metaDescription || ''
    })
    setShowForm(true)
  }

  const deleteResource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return
    
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        fetchResources()
        alert('Resource deleted successfully!')
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error deleting resource:', error)
      alert('Error deleting resource')
    }
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault()
      const newTag = e.currentTarget.value.trim().toLowerCase()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
      }
      e.currentTarget.value = ''
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-academic flex items-center justify-center">
        <div className="text-xl text-accent-navy">Loading...</div>
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-accent-navy">Resource Management</h1>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingResource(null)
              resetForm()
            }}
            className="button-primary px-6 py-2"
          >
            Add New Resource
          </button>
        </div>

        {/* Resource Form */}
        {showForm && (
          <motion.div
            className="mb-8 bg-[#f8f6f1] rounded-lg p-6 border border-accent-burgundy"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-accent-navy mb-4">
              {editingResource ? 'Edit Resource' : 'Create New Resource'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value as 'blogs' | 'videos',
                      type: e.target.value === 'blogs' ? 'Blog' : 'Video'
                    }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                  >
                    <option value="blogs">Blog</option>
                    <option value="videos">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-navy mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                />
              </div>

              {formData.category === 'blogs' ? (
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Blog Content *
                  </label>
                  <textarea
                    required
                    value={formData.content.body}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      content: { ...prev.content, body: e.target.value }
                    }))}
                    rows={10}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                    placeholder="Write your blog content here (supports markdown)..."
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent-navy mb-1">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.content.videoUrl}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        content: { ...prev.content, videoUrl: e.target.value }
                      }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent-navy mb-1">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={formData.content.duration}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        content: { ...prev.content, duration: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Featured Image
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                    placeholder="/path/to/image.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      status: e.target.value as 'draft' | 'published' | 'archived'
                    }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-navy mb-1">
                  Tags (press Enter to add)
                </label>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                  placeholder="Type a tag and press Enter..."
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-accent-burgundy text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-white hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author.name}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      author: { ...prev.author, name: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-academic"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-accent-navy mb-1">
                    Featured
                  </label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Mark as featured</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="button-primary px-6 py-2"
                >
                  {editingResource ? 'Update Resource' : 'Create Resource'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingResource(null)
                    resetForm()
                  }}
                  className="button-secondary px-6 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Resources List */}
        <div className="space-y-4">
          {resources.map((resource) => (
            <motion.div
              key={resource._id}
              className="bg-[#f8f6f1] rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-accent-navy">{resource.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      resource.status === 'published' ? 'bg-green-100 text-green-800' :
                      resource.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resource.status}
                    </span>
                    {resource.featured && (
                      <span className="bg-accent-burgundy text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{resource.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Category: {resource.category}</span>
                    <span>Type: {resource.type}</span>
                    <span>Author: {resource.author.name}</span>
                    <span>Created: {new Date(resource.createdAt).toLocaleDateString()}</span>
                  </div>
                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editResource(resource)}
                    className="text-accent-burgundy hover:text-accent-navy px-3 py-1 border border-accent-burgundy rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteResource(resource._id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {resources.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No resources found. Create your first resource to get started.
          </div>
        )}
      </section>
    </motion.div>
  )
} 