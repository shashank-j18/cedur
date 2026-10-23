import express from 'express';
import repo from '../db/index.js';

const router = express.Router();

// List all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await repo.listBlogPosts();
    // Return summaries for list view
    const list = posts.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      category: p.category,
      author: p.author,
      readTime: p.readTime,
      publishedAt: p.publishedAt,
    }));
    return res.json({ posts: list });
  } catch (err) {
    console.error('List blog error:', err);
    return res.status(500).json({ message: 'Failed to fetch blog posts.' });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await repo.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Blog article not found.' });
    }
    return res.json({ post });
  } catch (err) {
    console.error('Get blog post error:', err);
    return res.status(500).json({ message: 'Failed to load blog post.' });
  }
});

export default router;
