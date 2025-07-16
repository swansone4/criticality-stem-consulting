import { generateResources } from '@/lib/generateResources'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export const dynamic = 'force-static'

export default function ResourcesPage() {
  const resources = generateResources()
  const categories = [
    { key: 'blogs', label: 'Blogs' },
    { key: 'videos', label: 'Videos' },
  ]
  const availableTags = Array.from(new Set(resources.flatMap(r => r.tags || [])))
  const featuredResource = resources.find(r => r.featured) || null

  return (
    <div className="min-h-screen bg-white font-academic">
      <Navigation />
      <section className="container-max px-4 pt-24 pb-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-2">Resources</h1>
        </div>
        {/* Category Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 border-b border-gray-200 pb-2" aria-label="Resource categories">
          {categories.map(cat => (
            <span
              key={cat.key}
              className={`text-lg font-semibold pb-1 transition-colors duration-200 text-accent-navy`}
            >
              {cat.label}
            </span>
          ))}
        </nav>
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
                  {featuredResource.date || featuredResource.publishedAt ? new Date(featuredResource.date || featuredResource.publishedAt).toLocaleDateString() : 'Recently'}
                  {featuredResource.duration && ` • ${Math.floor(featuredResource.duration / 60)}:${(featuredResource.duration % 60).toString().padStart(2, '0')}`}
                </div>
                <a href={featuredResource.category === 'videos' ? featuredResource.videoUrl : `/resources/${featuredResource.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium" target={featuredResource.category === 'videos' ? '_blank' : undefined}>
                  {featuredResource.type === 'Video' ? 'Watch' : 'Read More'}
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources.map((r) => (
            <div
              key={r.slug}
              className="bg-[#f8f6f1] rounded-lg shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-lg"
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
                {r.date || r.publishedAt ? new Date(r.date || r.publishedAt).toLocaleDateString() : 'Recently'}
                {r.duration && ` • ${Math.floor(r.duration / 60)}:${(r.duration % 60).toString().padStart(2, '0')}`}
              </div>
              <a href={r.category === 'videos' ? r.videoUrl : `/resources/${r.slug}`} className="inline-block border border-accent-burgundy text-accent-burgundy px-4 py-2 rounded transition-colors duration-200 hover:bg-accent-burgundy hover:text-white font-medium" target={r.category === 'videos' ? '_blank' : undefined}>
                {r.type === 'Video' ? 'Watch' : 'Read More'}
              </a>
            </div>
          ))}
        </div>
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