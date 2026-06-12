import { Icon } from '@iconify/react';

export default function Quran() {
  const resources = [
    { icon: 'ph:book-open-duotone', name: 'Quran.com', desc: 'Complete Quran with 50+ translations and tafsir', link: 'https://quran.com' },
    { icon: 'ph:magnifying-glass-duotone', name: 'Al-Quran.info', desc: 'Word-by-word Quran analysis with grammar tools', link: 'https://al-quran.info' },
    { icon: 'ph:headphones-duotone', name: 'Quran Central', desc: 'Listen to 200+ Qaris worldwide', link: 'https://qurancentral.com' },
    { icon: 'ph:globe-duotone', name: 'Tanzil.net', desc: 'Multi-translation Quran navigator', link: 'https://tanzil.net' },
    { icon: 'ph:pen-duotone', name: 'Quran Explorer', desc: 'Interactive Quran with audio and bookmarks', link: 'https://quranexplorer.com' },
    { icon: 'ph:device-mobile-duotone', name: 'iQuran (KSU)', desc: 'Clean reading experience from King Saud University', link: 'https://quran.ksu.edu.sa' },
  ];

  const verses = [
    {
      arabic: 'إِنَّ اللَّهَ لَا يَظْلِمُ مِثْقَالَ ذَرَّةٍ',
      translation: 'Indeed, Allah does not do injustice, even as much as an atom\'s weight.',
      reference: 'Surah An-Nisa (4:40)'
    },
    {
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah — He will make for him a way out.',
      reference: 'Surah At-Talaq (65:2)'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="arabic-text text-5xl md:text-6xl font-bold mb-4 text-green-700 dark:text-green-400">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
        <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">The Holy Quran</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore the word of Allah — authentic Quranic resources with translations, tafsir, and recitations.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { num: '114', label: 'Surahs' },
          { num: '6,236', label: 'Verses' },
          { num: '77,430', label: 'Words' },
          { num: '30', label: 'Juz' },
        ].map(stat => (
          <div key={stat.label} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="text-3xl font-bold text-green-600">{stat.num}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Featured Verses</h2>
      <div className="space-y-4 mb-12">
        {verses.map((verse, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border-l-4 border-green-500">
            <p className="arabic-text text-2xl text-green-700 dark:text-green-400 mb-3">{verse.arabic}</p>
            <p className="text-gray-600 dark:text-gray-400 italic mb-2">{verse.translation}</p>
            <p className="text-sm font-semibold text-yellow-600">{verse.reference}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Quran Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(res => (
          <a key={res.name} href={res.link} target="_blank" rel="noopener noreferrer" 
             className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <Icon icon={res.icon} className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">{res.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{res.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}