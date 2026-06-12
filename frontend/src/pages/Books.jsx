import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const HARDCODED_BOOKS = [
  { 
    title: "Kitaab at-Tawheed", 
    author: "Muhammad ibn Abd al-Wahhab", 
    level: "Beginner", 
    category: "Aqeedah", 
    desc: "Foundational book on Islamic monotheism. Essential for every Muslim to understand the core of their faith.",
    link: "https://kalamullah.com/Books/Kitaab%20At-Tawheed.pdf",
    isExternal: true
  },
  { 
    title: "Riyad as-Salihin", 
    author: "Imam al-Nawawi", 
    level: "Intermediate", 
    category: "Hadith", 
    desc: "Gardens of the Righteous — comprehensive Hadith compilation covering all aspects of daily Muslim life.",
    link: "https://sunnah.com/riyadussalihin",
    isExternal: true
  },
  { 
    title: "Ihya Ulum al-Din", 
    author: "Imam al-Ghazali", 
    level: "Advanced", 
    category: "Tazkiyah", 
    desc: "The Revival of the Religious Sciences — 4-volume magnum opus on worship, ethics, and spiritual purification.",
    link: "https://emaanlibrary.com",
    isExternal: true
  },
  { 
    title: "Ar-Raheeq al-Makhtum", 
    author: "Saifur Rahman al-Mubarakpuri", 
    level: "Beginner", 
    category: "Seerah", 
    desc: "The Sealed Nectar — the most famous biography of Prophet Muhammad ﷺ, winner of the World Muslim League prize.",
    link: "https://kalamullah.com/Books/The%20Sealed%20Nectar.pdf",
    isExternal: true
  },
  { 
    title: "Tafsir Ibn Kathir", 
    author: "Ibn Kathir", 
    level: "Advanced", 
    category: "Tafsir", 
    desc: "The most widely studied Quran commentary — clear, Hadith-based, and accessible for students of knowledge.",
    link: "https://quran.com/tafsirs/en-tafisr-ibn-kathir",
    isExternal: true
  },
  { 
    title: "Don't Be Sad", 
    author: "Aid al-Qarni", 
    level: "Contemporary", 
    category: "Self-Help", 
    desc: "A practical and comforting guide to peace of mind and happiness grounded in Islamic teachings.",
    link: "https://muslim-library.com",
    isExternal: true
  },
  { 
    title: "Thalaathat al-Usool", 
    author: "Muhammad ibn Abd al-Wahhab", 
    level: "Beginner", 
    category: "Aqeedah", 
    desc: "The Three Fundamental Principles — a concise text on your Lord, your religion, and your Prophet ﷺ.",
    link: "https://kalamullah.com",
    isExternal: true
  },
  { 
    title: "Madarij as-Salikin", 
    author: "Ibn al-Qayyim", 
    level: "Advanced", 
    category: "Tazkiyah", 
    desc: "Ranks of the Divine Seekers — Ibn al-Qayyim's profound commentary on the stations of the spiritual path.",
    link: "https://kalamullah.com",
    isExternal: true
  },
  { 
    title: "Al-Aqeedah al-Waasitiyyah", 
    author: "Ibn Taymiyyah", 
    level: "Intermediate", 
    category: "Aqeedah", 
    desc: "Creed of the Middle Path — a concise yet comprehensive statement of Islamic beliefs.",
    link: "https://kalamullah.com",
    isExternal: true
  },
  { 
    title: "Buloogh al-Maram", 
    author: "Ibn Hajar al-Asqalani", 
    level: "Intermediate", 
    category: "Hadith", 
    desc: "Collection of Hadith on Islamic rulings — essential for students of Fiqh.",
    link: "https://sunnah.com",
    isExternal: true
  },
  { 
    title: "Zaad al-Ma'ad", 
    author: "Ibn al-Qayyim", 
    level: "Advanced", 
    category: "Seerah", 
    desc: "Provisions for the Hereafter from the guidance of the Prophet ﷺ.",
    link: "https://kalamullah.com",
    isExternal: true
  },
  { 
    title: "Reclaim Your Heart", 
    author: "Yasmin Mogahed", 
    level: "Contemporary", 
    category: "Spirituality", 
    desc: "Spiritual reflections on detachment, purpose, and finding fulfillment by connecting the heart to Allah.",
    link: "https://muslimcentral.com",
    isExternal: true
  },
  { 
    title: "Purification of the Heart", 
    author: "Hamza Yusuf", 
    level: "Contemporary", 
    category: "Tazkiyah", 
    desc: "Translation and commentary on Imam Mawlud's Matharat al-Qulub — a guide to Islamic ethics.",
    link: "https://emaanlibrary.com",
    isExternal: true
  },
  { 
    title: "Al-Sirah Al-Nabawiyyah", 
    author: "Ibn Ishaq", 
    level: "Advanced", 
    category: "Seerah", 
    desc: "The oldest foundational biography of the Prophet ﷺ — a classical work of Islamic history.",
    link: "https://archive.org/details/TheLifeOfMohammad",
    isExternal: true
  },
  { 
    title: "40 Hadith an-Nawawi", 
    author: "Imam al-Nawawi", 
    level: "Beginner", 
    category: "Hadith", 
    desc: "The famous collection of 42 foundational Hadith — essential reading for every Muslim.",
    link: "https://sunnah.com/nawawi40",
    isExternal: true
  },
];

export default function Books() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [category, setCategory] = useState('All');
  const [databaseBooks, setDatabaseBooks] = useState([]);

  // Fetch books from database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get('/books');
        setDatabaseBooks(data || []);
      } catch (error) {
        console.log('No database books yet');
        setDatabaseBooks([]);
      }
    };
    fetchBooks();
  }, []);

  // Combine database books with hardcoded books
  const allBooks = [
    // Database books first (your uploaded books)
    ...databaseBooks.map(book => ({
      ...book,
      _id: book._id,
      title: book.title,
      author: book.author,
      level: book.level,
      category: book.category,
      desc: book.description,
      isExternal: false,
      isDownloadable: !!book.fileUrl,
      downloadUrl: book.fileUrl ? `http://localhost:5000${book.fileUrl}` : null
    })),
    // Then hardcoded books
    ...HARDCODED_BOOKS
  ];

  // Filter books
  const filtered = allBooks.filter(book => {
    const matchesSearch = search === '' || 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      (book.desc && book.desc.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = level === 'All' || book.level === level;
    const matchesCategory = category === 'All' || book.category === category;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Contemporary'];
  const categories = ['All', ...new Set(allBooks.map(b => b.category).filter(Boolean))];

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Advanced': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Contemporary': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="arabic-text text-5xl font-bold mb-4 text-green-700 dark:text-green-400">
          اقْرَأْ بِاسْمِ رَبِّكَ
        </h1>
        <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Islamic Books Library</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          "Read in the name of your Lord who created." — Quran 96:1
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          📚 {databaseBooks.length} uploaded books + {HARDCODED_BOOKS.length} reference books = {allBooks.length} total
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Icon icon="ph:magnifying-glass-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
          />
        </div>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
        >
          {levels.map(l => (
            <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Showing {filtered.length} of {allBooks.length} books
      </p>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book, index) => (
          <div key={book._id || index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(book.level)}`}>
                  {book.level}
                </span>
                <div className="flex gap-1">
                  {book.isExternal && (
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" title="External link">
                      <Icon icon="ph:link-duotone" className="w-3 h-3 inline" /> Link
                    </span>
                  )}
                  {book.isDownloadable && (
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" title="Downloadable">
                      <Icon icon="ph:file-pdf-duotone" className="w-3 h-3 inline" /> PDF
                    </span>
                  )}
                  {!book.isExternal && !book.isDownloadable && book._id && (
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" title="View Online">
                      <Icon icon="ph:eye-duotone" className="w-3 h-3 inline" /> View
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{book.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">by {book.author}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{book.desc}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  {book.category}
                </span>
              </div>
            </div>
            
            <div className="px-6 pb-4 pt-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              {book.isExternal ? (
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm transition-colors"
                >
                  <Icon icon="ph:arrow-square-out-duotone" className="w-4 h-4" />
                  Visit External Link
                </a>
              ) : book.isDownloadable ? (
                <div className="flex justify-between items-center">
                  <Link
                    to={`/books/${book._id}`}
                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-400 font-medium text-sm transition-colors"
                  >
                    <Icon icon="ph:book-open-duotone" className="w-4 h-4" />
                    Read Online
                  </Link>
                  <a
                    href={book.downloadUrl}
                    download
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm transition-colors"
                  >
                    <Icon icon="ph:download-duotone" className="w-4 h-4" />
                    Download
                  </a>
                </div>
              ) : (
                <Link
                  to={`/books/${book._id}`}
                  className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-400 font-medium text-sm transition-colors"
                >
                  <Icon icon="ph:eye-duotone" className="w-4 h-4" />
                  View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="ph:books-duotone" className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No books found matching your criteria</p>
          <button
            onClick={() => { setSearch(''); setLevel('All'); setCategory('All'); }}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Add Book CTA for Admin */}
      <div className="mt-12 text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-2xl">
        <Icon icon="ph:plus-circle-duotone" className="w-12 h-12 mx-auto text-green-600 mb-4" />
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Want to add your own books?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Upload and manage Islamic books through the admin panel.</p>
        <Link
          to="/admin"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
        >
          <Icon icon="ph:gear-duotone" className="w-5 h-5" />
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}