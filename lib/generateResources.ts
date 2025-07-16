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
        blogs.push({
          ...data,
          content,
          slug: file.replace(/\.md$/, ''),
          category: 'blogs',
          type: 'Blog',
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
      videos = videosJson.map((v: any) => ({
        ...v,
        slug: v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: 'videos',
        type: 'Video',
      }))
    } catch {}
  }
  return [...blogs, ...videos]
} 