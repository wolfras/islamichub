import { Icon } from '@iconify/react';

export default function Audio() {
  const platforms = [
    { icon: 'ph:microphone-duotone', name: 'Muslim Central', desc: 'Thousands of lectures from 140+ speakers', link: 'https://muslimcentral.com' },
    { icon: 'ph:book-open-duotone', name: 'Bayyinah.org', desc: 'Deep Quranic reflections by Nouman Ali Khan', link: 'https://bayyinah.org' },
    { icon: 'ph:tree-duotone', name: 'Yaqeen Institute', desc: 'Dr. Omar Suleiman\'s series on faith and contemporary issues', link: 'https://yaqeeninstitute.org/audio' },
    { icon: 'ph:books-duotone', name: 'EmaanLibrary Audio', desc: 'Over 10,000 authentic lectures', link: 'https://emaanlibrary.com' },
    { icon: 'ph:building-duotone', name: 'AlMaghrib Institute', desc: 'University-style intensive seminars', link: 'https://almaghrib.org' },
    { icon: 'ph:graduation-cap-duotone', name: 'Bakkah.net', desc: 'Free courses with audio recordings', link: 'https://bakkah.net' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Audio Lectures</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          High-quality, authentic lectures from world-renowned scholars. Listen anytime, anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map(platform => (
          <a key={platform.name} href={platform.link} target="_blank" rel="noopener noreferrer" 
             className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <Icon icon={platform.icon} className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">{platform.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{platform.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}