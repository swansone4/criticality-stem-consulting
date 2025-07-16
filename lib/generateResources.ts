import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function generateResources() {
  // Blogs
  const blogsDir = path.join(process.cwd(), 'public/resources/blogs')
  let blogs: any[] = []
  if (fs.existsSync(blogsDir)) {
    const files = fs.readdirSync(blogsDir)
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(blogsDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        // Check for image existence, fallback to placeholder
        let image = data.image || ''
        if (image && !fs.existsSync(path.join(process.cwd(), 'public', image.replace(/^\//, '')))) {
          image = 'https://via.placeholder.com/400x300?text=No+Image'
        }
        blogs.push({
          ...data,
          content,
          slug: file.replace(/\.md$/, ''),
          category: 'blogs',
          type: 'Blog',
          image,
        })
      }
    }
  }
  // Videos
  const videosPath = path.join(process.cwd(), 'public/resources/videos/videos.json')
  let videos: any[] = []
  if (fs.existsSync(videosPath)) {
    const videosRaw = fs.readFileSync(videosPath, 'utf8')
    try {
      const videosJson = JSON.parse(videosRaw)
      videos = videosJson.map((v: any) => {
        let image = v.image || ''
        if (image && !fs.existsSync(path.join(process.cwd(), 'public', image.replace(/^\//, '')))) {
          image = 'https://via.placeholder.com/400x300?text=No+Image'
        }
        return {
          ...v,
          slug: v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          category: 'videos',
          type: 'Video',
          image,
        }
      })
    } catch {}
  }
  return [...blogs, ...videos]
} 