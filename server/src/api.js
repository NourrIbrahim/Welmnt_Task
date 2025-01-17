const express = require('express');
const payload = require('payload');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config(); 
const app = express();

const corsOptions = {
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(express.json()); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

payload.init({
  secret: process.env.PAYLOAD_SECRET, 
  mongoURL: process.env.DATABASE_URI, 
  express: app, 
});

app.get('/api/posts', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const apiKey = req.headers['x-api-key']; 

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        publishDate: { lte: new Date() }, 
      },
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      populate: 'author', 
    });
    const simplifiedPosts = posts.docs.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body.root.children.map(child => child.children.map(c => c.text)).join(' '), 
      coverImage: post.coverImage.url, 
      author: post.author.name,
      publishDate: post.publishDate, 
    }));

    return res.status(200).json(simplifiedPosts); 
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
});
