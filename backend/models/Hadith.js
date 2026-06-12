import mongoose from 'mongoose';

const hadithSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    enum: ['Bukhari', 'Muslim', 'Abu Dawud', 'Tirmidhi', 'Nasai', 'Ibn Majah', 'Malik', 'Ahmad'],
    required: true
  },
  bookNumber: Number,
  bookName: String,
  bookNameArabic: String,
  chapterNumber: Number,
  chapterName: String,
  chapterNameArabic: String,
  hadithNumber: {
    type: Number,
    required: true
  },
  textArabic: {
    type: String,
    required: true
  },
  textEnglish: {
    type: String,
    required: true
  },
  narrator: String,
  grade: {
    type: String,
    enum: ['Sahih', 'Hasan', 'Daif', 'Mawdu'],
    default: 'Sahih'
  },
  tags: [String],
  explanation: String
}, {
  timestamps: true
});

hadithSchema.index({ textEnglish: 'text', textArabic: 'text', narrator: 'text' });

export default mongoose.model('Hadith', hadithSchema);