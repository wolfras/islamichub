import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/quran', label: 'Quran', icon: 'ph:book-open-duotone' },
    { to: '/hadith', label: 'Hadith', icon: 'ph:scroll-duotone' },
    { to: '/duas', label: 'Duas', icon: 'ph:hands-praying-duotone' },
    { to: '/books', label: 'Books', icon: 'ph:books-duotone' },
    { to: '/scholars', label: 'Scholars', icon: 'ph:users-duotone' },
    { to: '/audio', label: 'Audio', icon: 'ph:headphones-duotone' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Icon icon="ph:book-open-duotone" className="w-4 h-4" />
            Seeking knowledge is obligatory upon every Muslim
          </span>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="hover:text-yellow-300">
              <Icon icon={isDark ? 'ph:sun-duotone' : 'ph:moon-duotone'} className="w-4 h-4" />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="hover:text-yellow-300">
                  <Icon icon="ph:user-circle-duotone" className="w-4 h-4" />
                </Link>
                <button onClick={logout} className="text-green-200 hover:text-white text-xs">
                  Logout
                </button>
              </div>
            ) : (
              <span className="text-green-200 text-xs">Guest</span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl flex items-center justify-center">
              <Icon icon="ph:star-four-duotone" className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-green-700 dark:text-green-400">Islamic Knowledge Hub</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Authentic Islamic Resources</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-all text-sm font-medium"
              >
                <Icon icon={link.icon} className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/learn" className="hidden md:inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Icon icon="ph:graduation-cap-duotone" className="w-4 h-4" />
              Start Learning
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon icon={isMenuOpen ? 'ph:x-duotone' : 'ph:list-duotone'} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 transition-all"
              >
                <Icon icon={link.icon} className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}