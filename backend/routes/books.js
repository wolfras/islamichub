import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Scholar from '../models/Scholar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Simple storage config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, 'scholar-' + Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Get all scholars
router.get('/', async (req, res) => {
  try {
    const scholars = await Scholar.find().sort({ name: 1 });
    res.json(scholars);
  } catch (error) {
    console.error('Error fetching scholars:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single scholar
router.get('/:id', async (req, res) => {
  try {
    const scholar = await Scholar.findById(req.params.id);
    if (scholar) {
      scholar.views += 1;
      await scholar.save();
      res.json(scholar);
    } else {
      res.status(404).json({ message: 'Scholar not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add scholar
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Adding scholar - Body:', req.body);
  console.log('File:', req.file);
  
  try {
    const scholarData = {
      name: req.body.name,
      nameArabic: req.body.nameArabic || '',
      title: req.body.title || '',
      biography: req.body.biography || '',
      birthYear: req.body.birthYear || '',
      deathYear: req.body.deathYear || '',
      region: req.body.region || '',
      books: req.body.books ? req.body.books.split(',').map(b => b.trim()).filter(b => b) : [],
      specialties: req.body.specialties ? req.body.specialties.split(',').map(s => s.trim()).filter(s => s) : [],
      website: req.body.website || '',
      featured: req.body.featured === 'true' || false,
      uploadedBy: 'Admin'
    };

    if (req.file) {
      scholarData.image = '/uploads/' + req.file.filename;
    }

    const scholar = new Scholar(scholarData);
    const saved = await scholar.save();
    console.log('Scholar saved:', saved._id);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving scholar:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update scholar
router.put('/:id', upload.single('image'), async (req, res) => {
  console.log('Updating scholar:', req.params.id);
  
  try {
    const scholar = await Scholar.findById(req.params.id);
    if (!scholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }

    scholar.name = req.body.name || scholar.name;
    scholar.nameArabic = req.body.nameArabic || scholar.nameArabic;
    scholar.title = req.body.title || scholar.title;
    scholar.biography = req.body.biography || scholar.biography;
    scholar.birthYear = req.body.birthYear || scholar.birthYear;
    scholar.deathYear = req.body.deathYear || scholar.deathYear;
    scholar.region = req.body.region || scholar.region;
    
    if (req.body.books) {
      scholar.books = req.body.books.split(',').map(b => b.trim()).filter(b => b);
    }
    if (req.body.specialties) {
      scholar.specialties = req.body.specialties.split(',').map(s => s.trim()).filter(s => s);
    }
    
    scholar.website = req.body.website || scholar.website;
    scholar.featured = req.body.featured === 'true';

    if (req.file) {
      scholar.image = '/uploads/' + req.file.filename;
    }

    const updated = await scholar.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating scholar:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete scholar
router.delete('/:id', async (req, res) => {
  try {
    await Scholar.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholar deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;