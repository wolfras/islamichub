import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function MobileNav() {
  const location = useLocation();

  const links = [
    { to: '/', icon: 'ph:house-duotone', label: 'Home' },
    { to: '/quran', icon: 'ph:book-open-duotone', label: 'Quran' },
    { to: '/hadith', icon: 'ph:scroll-duotone', label: 'Hadith' },
    { to: '/books', icon: 'ph:books-duotone', label: 'Books' },
    { to: '/learn', icon: 'ph:graduation-cap-duotone', label: 'Learn' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        {links.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-green-600'
              }`}
            >
              <Icon icon={link.icon} className="w-6 h-6" />
              <span className="text-xs">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}