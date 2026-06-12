import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
          Welcome, {user?.name || 'Student'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your learning dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: 'ph:book-open-duotone', label: 'Books Reading', value: '0' },
          { icon: 'ph:headphones-duotone', label: 'Lectures Heard', value: '0' },
          { icon: 'ph:star-duotone', label: 'Bookmarks', value: '0' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
            <Icon icon={stat.icon} className="w-10 h-10 mx-auto text-green-600 mb-3" />
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Continue Reading</h2>
          <p className="text-gray-500">No books in progress. Start reading today!</p>
          <Link to="/books" className="text-green-600 hover:text-green-700 mt-2 inline-block">Browse Books →</Link>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Recommended Lectures</h2>
          <p className="text-gray-500">Audio lecture recommendations coming soon.</p>
          <Link to="/audio" className="text-green-600 hover:text-green-700 mt-2 inline-block">Browse Audio →</Link>
        </div>
      </div>
    </div>
  );
}