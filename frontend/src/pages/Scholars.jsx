import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Scholars() {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameArabic: '',
    title: '',
    biography: '',
    birthYear: '',
    deathYear: '',
    region: '',
    books: '',
    specialties: '',
    website: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchScholars();
  }, []);

  const fetchScholars = async () => {
    try {
      const { data } = await api.get('/scholars');
      setScholars(data || []);
    } catch (error) {
      setScholars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddScholar = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('nameArabic', formData.nameArabic);
    form.append('title', formData.title);
    form.append('biography', formData.biography);
    form.append('birthYear', formData.birthYear);
    form.append('deathYear', formData.deathYear);
    form.append('region', formData.region);
    form.append('books', formData.books);
    form.append('specialties', formData.specialties);
    form.append('website', formData.website);
    form.append('featured', 'false');
    
    if (image) form.append('image', image);

    try {
      await api.post('/scholars', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Scholar added successfully!');
      setShowAddForm(false);
      setFormData({
        name: '',
        nameArabic: '',
        title: '',
        biography: '',
        birthYear: '',
        deathYear: '',
        region: '',
        books: '',
        specialties: '',
        website: ''
      });
      setImage(null);
      fetchScholars();
    } catch (error) {
      console.error('Error adding scholar:', error);
      toast.error('Failed to add scholar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholar?')) {
      try {
        await api.delete(`/scholars/${id}`);
        toast.success('Scholar deleted');
        fetchScholars();
      } catch (error) {
        toast.error('Failed to delete scholar');
      }
    }
  };

  const filtered = scholars.filter(s => 
    search === '' || 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.region?.toLowerCase().includes(search.toLowerCase()) ||
    s.specialties?.some(sp => sp.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Islamic Scholars</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Learn about the great scholars who preserved and transmitted Islamic knowledge through the centuries
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Icon icon="ph:magnifying-glass-duotone" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search scholars by name, region, or specialty..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
          />
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
        >
          <Icon icon={showAddForm ? 'ph:x-duotone' : 'ph:plus-duotone'} className="w-5 h-5" />
          {showAddForm ? 'Cancel' : 'Add Scholar'}
        </button>
      </div>

      {/* Add Scholar Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2">
            <Icon icon="ph:plus-circle-duotone" className="w-6 h-6" />
            Add New Scholar
          </h2>
          
          <form onSubmit={handleAddScholar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., Imam Abu Hanifa" 
                />
              </div>

              {/* Arabic Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Name (Arabic)</label>
                <input 
                  type="text" 
                  value={formData.nameArabic} 
                  onChange={e => setFormData({...formData, nameArabic: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white arabic-text text-right" 
                  placeholder="أبو حنيفة" 
                  dir="rtl"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">Title / Honorific</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., Imam al-A'zam, Shaykh al-Islam" 
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-semibold mb-2">Region</label>
                <input 
                  type="text" 
                  value={formData.region} 
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., Kufa, Iraq" 
                />
              </div>

              {/* Birth Year */}
              <div>
                <label className="block text-sm font-semibold mb-2">Birth Year</label>
                <input 
                  type="text" 
                  value={formData.birthYear} 
                  onChange={e => setFormData({...formData, birthYear: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., 80 AH / 699 CE" 
                />
              </div>

              {/* Death Year */}
              <div>
                <label className="block text-sm font-semibold mb-2">Death Year</label>
                <input 
                  type="text" 
                  value={formData.deathYear} 
                  onChange={e => setFormData({...formData, deathYear: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., 150 AH / 767 CE" 
                />
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-semibold mb-2">Specialties (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.specialties} 
                  onChange={e => setFormData({...formData, specialties: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., Hadith, Fiqh, Tafsir" 
                />
              </div>

              {/* Books */}
              <div>
                <label className="block text-sm font-semibold mb-2">Notable Books (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.books} 
                  onChange={e => setFormData({...formData, books: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="e.g., Al-Muwatta, Al-Fiqh al-Akbar" 
                />
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Website</label>
                <input 
                  type="url" 
                  value={formData.website} 
                  onChange={e => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="https://en.wikipedia.org/wiki/..." 
                />
              </div>

              {/* Biography */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Biography *</label>
                <textarea 
                  required
                  rows="10" 
                  value={formData.biography} 
                  onChange={e => setFormData({...formData, biography: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:text-white" 
                  placeholder="Write a detailed biography of the scholar here..."
                />
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Scholar Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setImage(e.target.files[0])}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                />
                {image && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {image.name} ({(image.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 border-t dark:border-gray-700">
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Icon icon="ph:check-circle-duotone" className="w-5 h-5" />
                Add Scholar
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)} 
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Scholars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(scholar => (
          <div key={scholar._id} className="relative group">
            <Link 
              to={`/scholars/${scholar._id}`}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden block"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {scholar.image ? (
                    <img 
                      src={`http://localhost:5000${scholar.image}`} 
                      alt={scholar.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon icon="ph:user-circle-duotone" className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {scholar.name}
                    </h3>
                    {scholar.title && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{scholar.title}</p>
                    )}
                    {scholar.region && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Icon icon="ph:map-pin-duotone" className="w-3 h-3" />
                        {scholar.region}
                      </div>
                    )}
                    {(scholar.birthYear || scholar.deathYear) && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Icon icon="ph:calendar-duotone" className="w-3 h-3" />
                        {scholar.birthYear && scholar.deathYear 
                          ? `${scholar.birthYear} - ${scholar.deathYear}`
                          : scholar.birthYear || scholar.deathYear
                        }
                      </div>
                    )}
                  </div>
                </div>
                
                {scholar.specialties?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {scholar.specialties.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {s}
                      </span>
                    ))}
                    {scholar.specialties.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        +{scholar.specialties.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
            
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(scholar._id);
              }}
              className="absolute top-3 right-3 p-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete scholar"
            >
              <Icon icon="ph:trash-duotone" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="ph:users-duotone" className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No scholars found</p>
          {scholars.length === 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Be the first to add a scholar
            </button>
          )}
        </div>
      )}

      {/* Scholar Count */}
      {scholars.length > 0 && (
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Showing {filtered.length} of {scholars.length} scholars
        </div>
      )}
    </div>
  );
}