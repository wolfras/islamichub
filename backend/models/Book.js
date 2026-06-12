import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Contemporary'],
    default: 'Beginner'
  },
  language: {
    type: String,
    default: 'English'
  },
  fileUrl: String,
  coverImage: String,
  pages: Number,
  publisher: String,
  publishYear: Number,
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  uploadedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

export default mongoose.model('Book', bookSchema);