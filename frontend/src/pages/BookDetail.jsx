import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('read'); // 'read', 'details', 'related'

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const { data } = await api.get(`/books/${id}`);
      setBook(data);
      
      // Fetch related books (same category)
      if (data.category) {
        const { data: allBooks } = await api.get(`/books?category=${data.category}`);
        setRelatedBooks(allBooks.filter(b => b._id !== id).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      toast.error('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (book?.fileUrl) {
      window.open(`http://localhost:5000${book.fileUrl}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Icon icon="ph:book-open-duotone" className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Book Not Found</h1>
        <p className="text-gray-500 mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/books" className="btn-primary inline-flex items-center gap-2">
          <Icon icon="ph:arrow-left-duotone" className="w-5 h-5" />
          Back to Library
        </Link>
      </div>
    );
  }

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Advanced': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Contemporary': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const isPDF = book.fileUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Icon icon="ph:caret-right-duotone" className="w-4 h-4" />
        <Link to="/books" className="hover:text-green-600">Books</Link>
        <Icon icon="ph:caret-right-duotone" className="w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-300">{book.title}</span>
      </div>

      {/* Book Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover / Icon */}
          <div className="flex-shrink-0">
            {book.coverImage ? (
              <img 
                src={`http://localhost:5000${book.coverImage}`} 
                alt={book.title}
                className="w-48 h-64 object-cover rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-48 h-64 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg flex items-center justify-center">
                <Icon icon="ph:book-open-duotone" className="w-20 h-20 text-white/80" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(book.level)}`}>
                {book.level}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {book.category}
              </span>
              {book.fileUrl && (
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
                  <Icon icon="ph:check-circle-duotone" className="w-3 h-3" />
                  Downloadable
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {book.language && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Language</span>
                  <p className="font-medium">{book.language}</p>
                </div>
              )}
              {book.pages > 0 && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Pages</span>
                  <p className="font-medium">{book.pages}</p>
                </div>
              )}
              {book.publisher && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Publisher</span>
                  <p className="font-medium">{book.publisher}</p>
                </div>
              )}
              {book.publishYear && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Year</span>
                  <p className="font-medium">{book.publishYear}</p>
                </div>
              )}
              <div>
                <span className="text-xs text-gray-500 uppercase">Downloads</span>
                <p className="font-medium">{book.downloads || 0}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Views</span>
                <p className="font-medium">{book.views || 0}</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{book.description}</p>

            {book.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {book.fileUrl && (
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <Icon icon="ph:download-duotone" className="w-5 h-5" />
                  Download Book
                </button>
              )}
              <Link
                to="/books"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
              >
                <Icon icon="ph:arrow-left-duotone" className="w-5 h-5" />
                Back to Library
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {book.fileUrl && isPDF && (
        <div className="mb-6">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'read' 
                  ? 'bg-white dark:bg-gray-600 shadow text-green-700 dark:text-green-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Icon icon="ph:book-open-duotone" className="w-4 h-4 inline mr-1" />
              Read Online
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'details' 
                  ? 'bg-white dark:bg-gray-600 shadow text-green-700 dark:text-green-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Icon icon="ph:info-duotone" className="w-4 h-4 inline mr-1" />
              Details
            </button>
            <button
              onClick={() => setActiveTab('related')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'related' 
                  ? 'bg-white dark:bg-gray-600 shadow text-green-700 dark:text-green-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Icon icon="ph:books-duotone" className="w-4 h-4 inline mr-1" />
              Related Books
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'read' && book.fileUrl && isPDF && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              <Icon icon="ph:book-open-duotone" className="w-5 h-5 inline mr-2" />
              Reading: {book.title}
            </h3>
            <button
              onClick={handleDownload}
              className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
            >
              <Icon icon="ph:download-duotone" className="w-4 h-4" />
              Download
            </button>
          </div>
          <div className="h-[800px]">
            <iframe
              src={`http://localhost:5000${book.fileUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title={book.title}
            />
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400">Book Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Title</h4>
              <p className="text-gray-900 dark:text-white">{book.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Author</h4>
              <p className="text-gray-900 dark:text-white">{book.author}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h4>
              <p className="text-gray-900 dark:text-white">{book.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Level</h4>
              <p className="text-gray-900 dark:text-white">{book.level}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Language</h4>
              <p className="text-gray-900 dark:text-white">{book.language || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Pages</h4>
              <p className="text-gray-900 dark:text-white">{book.pages || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Publisher</h4>
              <p className="text-gray-900 dark:text-white">{book.publisher || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Publish Year</h4>
              <p className="text-gray-900 dark:text-white">{book.publishYear || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Downloads</h4>
              <p className="text-gray-900 dark:text-white">{book.downloads || 0}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Views</h4>
              <p className="text-gray-900 dark:text-white">{book.views || 0}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Added On</h4>
              <p className="text-gray-900 dark:text-white">
                {book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown'}
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h4>
              <p className="text-gray-900 dark:text-white leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'related' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400">
            Related Books in {book.category}
          </h3>
          
          {relatedBooks.length === 0 ? (
            <p className="text-gray-500">No related books found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBooks.map(relatedBook => (
                <Link
                  key={relatedBook._id}
                  to={`/books/${relatedBook._id}`}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">{relatedBook.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">by {relatedBook.author}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(relatedBook.level)}`}>
                    {relatedBook.level}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}