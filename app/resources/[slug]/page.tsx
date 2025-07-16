import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navigation from '@/components/Navigation'

export async function generateStaticParams() {
  const blogsDir = path.join(process.cwd(), 'public/resources/blogs')
  if (!fs.existsSync(blogsDir)) return []
  const files = fs.readdirSync(blogsDir)
  return files.filter(f => f.endsWith('.md')).map(f => ({ slug: f.replace(/\.md$/, '') }))
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const blogsDir = path.join(process.cwd(), 'public/resources/blogs')
  const filePath = path.join(blogsDir, `${params.slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  // Use placeholder if image missing
  let image = data.image || ''
  if (image && !fs.existsSync(path.join(process.cwd(), 'public', image.replace(/^\//, '')))) {
    image = 'https://via.placeholder.com/800x400?text=No+Image'
  }
  return (
    <div className="min-h-screen bg-white font-academic">
      <Navigation />
      <section className="container-max px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-navy mb-4">{data.title}</h1>
          <div className="text-gray-500 text-sm mb-6">{data.date ? new Date(data.date).toLocaleDateString() : ''} {data.author && `• ${data.author}`}</div>
          {image && (
            <div className="relative w-full h-64 mb-8">
              <Image src={image} alt={data.title} fill className="object-cover rounded-md" unoptimized />
            </div>
          )}
          <article className="prose prose-lg max-w-none">
            {content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
          </article>
        </div>
      </section>
    </div>
  )
}

export const dynamic = 'force-static' 