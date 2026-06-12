import { Icon } from '@iconify/react';

export default function Duas() {
  const resources = [
    { icon: 'ph:hands-praying-duotone', name: 'Hisn al-Muslim', desc: 'Fortress of the Muslim — authentic Duas for every occasion', link: 'https://hisnulmuslim.com' },
    { icon: 'ph:sun-duotone', name: 'Morning & Evening Adhkar', desc: 'Daily shield of the believer from the Sunnah', link: 'https://sunnah.com/collections' },
    { icon: 'ph:moon-duotone', name: 'Ramadhan Duas', desc: 'Special Duas for the blessed month', link: 'https://ramadhanguide.com/duas' },
    { icon: 'ph:prayer-duotone', name: 'Daily Duas', desc: 'Supplications for everyday occasions', link: 'https://dailyduas.com' },
    { icon: 'ph:heart-break-duotone', name: 'Duas for Hardship', desc: 'Prophetic remedies for difficult times', link: 'https://hisnulmuslim.com' },
    { icon: 'ph:mosque-duotone', name: 'Post-Prayer Adhkar', desc: 'Authenticated dhikr after prayers', link: 'https://sunnah.com/nawawi40' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Duas & Dhikr</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          "And your Lord says: Call upon Me; I will respond to you." — Quran 40:60
        </p>
      </div>

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