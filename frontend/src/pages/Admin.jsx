import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Aqeedah',
    level: 'Beginner',
    language: 'English',
    pages: '',
    publisher: '',
    publishYear: '',
    tags: '',
    featured: false
  });
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);

  const categories = ['Aqeedah', 'Hadith', 'Tafsir', 'Fiqh', 'Seerah', 'Tazkiyah', 'Arabic', 'History', 'Self-Help', 'Spirituality', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Contemporary'];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/books');
      setBooks(data || []);
    } catch (error) {
      toast.error('Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('title', formData.title);
    form.append('author', formData.author);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('level', formData.level);
    form.append('language', formData.language);
    form.append('pages', formData.pages || '0');
    form.append('publisher', formData.publisher || '');
    form.append('publishYear', formData.publishYear || '');
    form.append('tags', formData.tags || '');
    form.append('featured', formData.featured);
    
    if (file) form.append('file', file);
    if (cover) form.append('cover', cover);

    try {
      if (editingBook) {
        await api.put(`/books/${editingBook._id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Book updated successfully!');
      } else {
        await api.post('/books', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Book added successfully!');
      }
      resetForm();
      fetchBooks();
    } catch (error) {
      console.error('Submit error:', error);
      const message = error.response?.data?.message || 'Failed to save book';
      toast.error(message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      category: book.category || 'Aqeedah',
      level: book.level || 'Beginner',
      language: book.language || 'English',
      pages: book.pages || '',
      publisher: book.publisher || '',
      publishYear: book.publishYear || '',
      tags: book.tags?.join(', ') || '',
      featured: book.featured || false
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      try {
        await api.delete(`/books/${id}`);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  const handleDownload = (book) => {
    if (book.fileUrl) {
      window.open(`http://localhost:5000${book.fileUrl}`, '_blank');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      category: 'Aqeedah',
      level: 'Beginner',
      language: 'English',
      pages: '',
      publisher: '',
      publishYear: '',
      tags: '',
      featured: false
    });
    setFile(null);
    setCover(null);
    setEditingBook(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Calculate stats
  const booksWithFiles = books.filter(b => b.fileUrl).length;
  const totalDownloads = books.reduce((sum, b) => sum + (b.downloads || 0), 0);
  const totalViews = books.reduce((sum, b) => sum + (b.views || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your Islamic book collection</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Icon icon={showForm ? 'ph:x-duotone' : 'ph:plus-duotone'} className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Book'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Books', value: books.length, icon: 'ph:books-duotone', color: 'text-blue-600' },
          { label: 'With Files', value: booksWithFiles, icon: 'ph:file-pdf-duotone', color: 'text-red-600' },
          { label: 'Downloads', value: totalDownloads, icon: 'ph:download-duotone', color: 'text-green-600' },
          { label: 'Views', value: totalViews, icon: 'ph:eye-duotone', color: 'text-purple-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center hover:shadow-lg transition-shadow">
            <Icon icon={stat.icon} className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2">
            <Icon icon={editingBook ? 'ph:pencil-duotone' : 'ph:plus-circle-duotone'} className="w-6 h-6" />
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500" 
                placeholder="Enter book title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author *</label>
              <input type="text" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500" 
                placeholder="Enter author name" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500" 
                placeholder="Enter book description" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <input type="text" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pages</label>
              <input type="number" value={formData.pages} onChange={e => setFormData({...formData, pages: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publisher</label>
              <input type="text" value={formData.publisher} onChange={e => setFormData({...formData, publisher: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publish Year</label>
              <input type="number" value={formData.publishYear} onChange={e => setFormData({...formData, publishYear: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g., Islam, Quran, Beginner"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            
            {/* Book File Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Book File (PDF) - Max 500MB</label>
              <input 
                type="file" 
                accept=".pdf,.epub,.mobi"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
                    if (selectedFile.size > 500 * 1024 * 1024) {
                      toast.error('File too large! Max 500MB.');
                      e.target.value = '';
                      return;
                    }
                    setFile(selectedFile);
                    toast.success(`Selected: ${selectedFile.name} (${sizeMB} MB)`);
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
              />
              {file && (
                <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center gap-3">
                  <Icon icon="ph:file-pdf-duotone" className="w-8 h-8 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 truncate">{file.name}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
                    <Icon icon="ph:x-circle-duotone" className="w-5 h-5" />
                  </button>
                </div>
              )}
              {editingBook?.fileUrl && !file && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center gap-3">
                  <Icon icon="ph:file-pdf-duotone" className="w-8 h-8 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                      Current: {editingBook.fileUrl.split('/').pop()}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Upload new file to replace</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setCover(e.target.files[0])}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
              />
              {cover && (
                <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center gap-3">
                  <Icon icon="ph:image-duotone" className="w-8 h-8 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 truncate">{cover.name}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{(cover.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button type="button" onClick={() => setCover(null)} className="text-red-500 hover:text-red-700">
                    <Icon icon="ph:x-circle-duotone" className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={formData.featured} 
                onChange={e => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label htmlFor="featured" className="text-sm font-medium">Featured Book</label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-all">
                <Icon icon={editingBook ? 'ph:check-circle-duotone' : 'ph:plus-circle-duotone'} className="w-5 h-5" />
                {editingBook ? 'Update Book' : 'Add Book'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 px-6 py-2.5 rounded-lg font-semibold transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Books List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
            All Books ({books.length})
          </h2>
          {books.length > 0 && (
            <span className="text-sm text-gray-500">
              {booksWithFiles} with files • {totalDownloads} downloads
            </span>
          )}
        </div>
        
        {books.length === 0 ? (
          <div className="p-12 text-center">
            <Icon icon="ph:books-duotone" className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No books added yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Click "Add New Book" to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Title</th>
                  <th className="text-left p-4 text-sm font-semibold hidden md:table-cell">Author</th>
                  <th className="text-left p-4 text-sm font-semibold hidden md:table-cell">Category</th>
                  <th className="text-left p-4 text-sm font-semibold hidden md:table-cell">Level</th>
                  <th className="text-left p-4 text-sm font-semibold hidden lg:table-cell">File</th>
                  <th className="text-left p-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {books.map(book => (
                  <tr key={book._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{book.title}</div>
                      <div className="text-xs text-gray-500 md:hidden">{book.author} • {book.category}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-400">{book.author}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${book.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                        ${book.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                        ${book.level === 'Advanced' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' : ''}
                        ${book.level === 'Contemporary' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}
                      `}>
                        {book.level}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {book.fileUrl ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600">
                          <Icon icon="ph:check-circle-duotone" className="w-4 h-4" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                          <Icon icon="ph:x-circle-duotone" className="w-4 h-4" />
                          No file
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(book)} className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 transition-colors" title="Edit">
                          <Icon icon="ph:pencil-duotone" className="w-5 h-5" />
                        </button>
                        {book.fileUrl && (
                          <button onClick={() => handleDownload(book)} className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 text-green-600 transition-colors" title="Download">
                            <Icon icon="ph:download-duotone" className="w-5 h-5" />
                          </button>
                        )}
                        <button onClick={() => handleDelete(book._id)} className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 transition-colors" title="Delete">
                          <Icon icon="ph:trash-duotone" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}