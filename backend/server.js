import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import scholarRoutes from './routes/scholars.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Increase payload limit
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/scholars', scholarRoutes);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    console.log('Saving to:', uploadPath);
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    console.log('Filename:', uniqueName);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/islamic-hub')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err.message));
// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  category: String,
  level: String,
  language: String,
  pages: Number,
  publisher: String,
  publishYear: Number,
  fileUrl: String,
  coverImage: String,
  tags: [String],
  featured: Boolean,
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.json([]);
  }
});

// GET single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      book.views += 1;
      await book.save();
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add book with file upload
app.post('/api/books', (req, res) => {
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ])(req, res, async function(err) {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ message: err.message });
    }
    
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    
    try {
      const bookData = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        level: req.body.level || 'Beginner',
        language: req.body.language || 'English',
        pages: parseInt(req.body.pages) || 0,
        publisher: req.body.publisher || '',
        publishYear: parseInt(req.body.publishYear) || new Date().getFullYear(),
        tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()).filter(t => t) : [],
        featured: req.body.featured === 'true' || req.body.featured === true,
        uploadedBy: 'Admin'
      };

      // Add file URLs if files were uploaded
      if (req.files?.file && req.files.file[0]) {
        bookData.fileUrl = '/uploads/' + req.files.file[0].filename;
        console.log('File saved:', bookData.fileUrl);
      }
      if (req.files?.cover && req.files.cover[0]) {
        bookData.coverImage = '/uploads/' + req.files.cover[0].filename;
        console.log('Cover saved:', bookData.coverImage);
      }

      const book = new Book(bookData);
      const saved = await book.save();
      console.log('Book saved:', saved._id, saved.title);
      
      res.status(201).json(saved);
    } catch (error) {
      console.error('Save error:', error);
      res.status(400).json({ message: error.message });
    }
  });
});

// PUT - Update book
app.put('/api/books/:id', (req, res) => {
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ])(req, res, async function(err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.description = req.body.description || book.description;
      book.category = req.body.category || book.category;
      book.level = req.body.level || book.level;
      book.language = req.body.language || book.language;
      book.pages = parseInt(req.body.pages) || book.pages;
      book.publisher = req.body.publisher || book.publisher;
      book.publishYear = parseInt(req.body.publishYear) || book.publishYear;
      
      if (req.body.tags) {
        book.tags = req.body.tags.split(',').map(t => t.trim()).filter(t => t);
      }
      
      book.featured = req.body.featured === 'true' || req.body.featured === true;

      if (req.files?.file && req.files.file[0]) {
        book.fileUrl = '/uploads/' + req.files.file[0].filename;
      }
      if (req.files?.cover && req.files.cover[0]) {
        book.coverImage = '/uploads/' + req.files.cover[0].filename;
      }

      const updated = await book.save();
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Download book
app.get('/api/books/:id/download', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book && book.fileUrl) {
      book.downloads += 1;
      await book.save();
      const filePath = path.join(__dirname, book.fileUrl);
      res.download(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});