import mongoose from 'mongoose';

const scholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameArabic: String,
  title: String,
  biography: String,
  birthYear: String,
  deathYear: String,
  region: String,
  image: String,
  books: [String],
  specialties: [String],
  website: String,
  views: {
    type: Number,
    default: 0
  },
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

export default mongoose.model('Scholar', scholarSchema);