# Resource Upload Guide

## Adding a Blog Post
1. Place a `.md` file in `public/resources/blogs/`.
2. Start the file with frontmatter, for example:
   ```markdown
   ---
   title: Your Blog Title
   description: Short summary
   author: Your Name
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   featured: true
   image: /resources/blogs/your-image.jpg
   ---
   
   # Your Blog Title
   Blog content goes here.
   ```
3. (Optional) Add an image to the same folder and reference it in the frontmatter.

## Adding a Video
1. Edit `public/resources/videos/videos.json`.
2. Add a new entry:
   ```json
   {
     "title": "Video Title",
     "description": "Short summary",
     "videoUrl": "https://...",
     "duration": 300,
     "author": "Your Name",
     "date": "YYYY-MM-DD",
     "tags": ["tag1", "tag2"],
     "featured": false,
     "image": "/resources/videos/your-thumb.jpg"
   }
   ```
3. (Optional) Add a thumbnail image to the same folder and reference it in the entry.

---

**No backend or database required.**
Just add or edit files in the specified folders. The Resources page will display them automatically. 