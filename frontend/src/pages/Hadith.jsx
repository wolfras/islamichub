import { Icon } from '@iconify/react';

export default function Hadith() {
  const resources = [
    { icon: 'ph:book-open-duotone', name: 'Sunnah.com', desc: 'Most comprehensive Hadith database online', link: 'https://sunnah.com' },
    { icon: 'ph:magnifying-glass-duotone', name: 'Hadith Encyclopedia', desc: 'Searchable Hadith with chain analysis', link: 'https://hadith.inoor.ir' },
    { icon: 'ph:building-duotone', name: 'Al-Maktaba Al-Shamela', desc: 'Definitive Arabic digital library', link: 'https://shamela.ws' },
    { icon: 'ph:check-circle-duotone', name: 'IslamWeb Hadith', desc: 'Verified Hadith with scholarly grading', link: 'https://islamweb.net/hadith' },
    { icon: 'ph:star-duotone', name: '40 Hadith an-Nawawi', desc: '42 foundational Hadith by Imam al-Nawawi', link: 'https://sunnah.com/nawawi40' },
    { icon: 'ph:flower-duotone', name: 'Riyad as-Salihin', desc: 'Comprehensive collection for daily life', link: 'https://sunnah.com/riyadussalihin' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Hadith Collections</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The authenticated sayings and actions of Prophet Muhammad ﷺ — the second source of Islamic law.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { num: '7,563', label: 'Sahih Bukhari' },
          { num: '5,362', label: 'Sahih Muslim' },
          { num: '4,590', label: 'Sunan Abu Dawud' },
          { num: '3,956', label: "Jami' Tirmidhi" },
        ].map(stat => (
          <div key={stat.label} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="text-3xl font-bold text-green-600">{stat.num}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Hadith Resources</h2>
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