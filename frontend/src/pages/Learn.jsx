import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Learn() {
  const paths = [
    { icon: 'ph:book-open-duotone', title: 'Quran Studies', desc: 'Learn Tajweed, Tafsir, and memorization', steps: ['Arabic Alphabet', 'Tajweed Rules', 'Memorization', 'Tafsir Study'] },
    { icon: 'ph:scroll-duotone', title: 'Hadith Studies', desc: 'Study the sayings of Prophet ﷺ', steps: ['40 Hadith Nawawi', 'Riyad as-Salihin', 'Sahih Bukhari', 'Hadith Sciences'] },
    { icon: 'ph:scale-duotone', title: 'Fiqh', desc: 'Islamic jurisprudence and law', steps: ['Purification', 'Prayer', 'Fasting', 'Zakat & Hajj'] },
    { icon: 'ph:shield-check-duotone', title: 'Aqeedah', desc: 'Islamic creed and belief', steps: ['Tawhid Basics', 'Names & Attributes', 'Prophethood', 'Day of Judgment'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 p-12 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-yellow-900 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">Learning Paths</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Structured learning paths to guide your journey through Islamic sciences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paths.map(path => (
          <div key={path.title} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <Icon icon={path.icon} className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{path.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{path.desc}</p>
            <div className="space-y-3">
              {path.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/books" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
          <Icon icon="ph:books-duotone" className="w-5 h-5" />
          Browse Library
        </Link>
      </div>
    </div>
  );
}