import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function ScholarDetail() {
  const { id } = useParams();
  const [scholar, setScholar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
    website: '',
    featured: false
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchScholar();
  }, [id]);

  const fetchScholar = async () => {
    try {
      const { data } = await api.get(`/scholars/${id}`);
      setScholar(data);
      setFormData({
        name: data.name || '',
        nameArabic: data.nameArabic || '',
        title: data.title || '',
        biography: data.biography || '',
        birthYear: data.birthYear || '',
        deathYear: data.deathYear || '',
        region: data.region || '',
        books: data.books?.join(', ') || '',
        specialties: data.specialties?.join(', ') || '',
        website: data.website || '',
        featured: data.featured || false
      });
    } catch (error) {
      toast.error('Failed to load scholar');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));
    if (image) form.append('image', image);

    try {
      const { data } = await api.put(`/scholars/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setScholar(data);
      setIsEditing(false);
      toast.success('Scholar updated!');
    } catch (error) {
      toast.error('Failed to update scholar');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!scholar) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Icon icon="ph:user-circle-duotone" className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Scholar Not Found</h1>
        <Link to="/scholars" className="btn-primary">Back to Scholars</Link>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Edit Scholar</h2>
        <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name (Arabic)</label>
              <input type="text" value={formData.nameArabic} onChange={e => setFormData({...formData, nameArabic: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 arabic-text" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Imam, Sheikh, Dr." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Birth Year</label>
              <input type="text" value={formData.birthYear} onChange={e => setFormData({...formData, birthYear: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., 699 CE / 80 AH" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Death Year</label>
              <input type="text" value={formData.deathYear} onChange={e => setFormData({...formData, deathYear: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., 767 CE / 150 AH" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Biography</label>
              <textarea rows="8" value={formData.biography} onChange={e => setFormData({...formData, biography: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                placeholder="Write detailed biography here..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Books (comma separated)</label>
              <input type="text" value={formData.books} onChange={e => setFormData({...formData, books: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                placeholder="e.g., Kitaab at-Tawheed, Al-Usool" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Specialties (comma separated)</label>
              <input type="text" value={formData.specialties} onChange={e => setFormData({...formData, specialties: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                placeholder="e.g., Hadith, Fiqh, Tafsir" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4" />
              <label className="text-sm font-medium">Featured Scholar</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg font-semibold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Icon icon="ph:caret-right-duotone" className="w-4 h-4" />
        <Link to="/scholars" className="hover:text-green-600">Scholars</Link>
        <Icon icon="ph:caret-right-duotone" className="w-4 h-4" />
        <span className="text-gray-700">{scholar.name}</span>
      </div>

      {/* Scholar Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 text-center">
            {scholar.image ? (
              <img src={`http://localhost:5000${scholar.image}`} alt={scholar.name}
                className="w-48 h-48 object-cover rounded-2xl shadow-lg mx-auto" />
            ) : (
              <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                <Icon icon="ph:user-circle-duotone" className="w-24 h-24 text-white/80" />
              </div>
            )}
            <button onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-1">
              <Icon icon="ph:pencil-duotone" className="w-4 h-4" />
              Edit Scholar
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{scholar.name}</h1>
            {scholar.nameArabic && (
              <p className="arabic-text text-2xl text-green-600 dark:text-green-400 mb-3">{scholar.nameArabic}</p>
            )}
            {scholar.title && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{scholar.title}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {scholar.birthYear && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Born</span>
                  <p className="font-medium">{scholar.birthYear}</p>
                </div>
              )}
              {scholar.deathYear && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Died</span>
                  <p className="font-medium">{scholar.deathYear}</p>
                </div>
              )}
              {scholar.region && (
                <div>
                  <span className="text-xs text-gray-500 uppercase">Region</span>
                  <p className="font-medium">{scholar.region}</p>
                </div>
              )}
              <div>
                <span className="text-xs text-gray-500 uppercase">Views</span>
                <p className="font-medium">{scholar.views || 0}</p>
              </div>
            </div>

            {scholar.specialties?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {scholar.specialties.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {s}
                  </span>
                ))}
              </div>
            )}

            {scholar.website && (
              <a href={scholar.website} target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                <Icon icon="ph:globe-duotone" className="w-4 h-4" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Biography */}
      {scholar.biography && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">Biography</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{scholar.biography}</p>
          </div>
        </div>
      )}

      {/* Books */}
      {scholar.books?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">Notable Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scholar.books.map((book, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon icon="ph:book-open-duotone" className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{book}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center">
        <Link to="/scholars" className="btn-primary inline-flex items-center gap-2">
          <Icon icon="ph:arrow-left-duotone" className="w-5 h-5" />
          Back to Scholars
        </Link>
      </div>
    </div>
  );
}