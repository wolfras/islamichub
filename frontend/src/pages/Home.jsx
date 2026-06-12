import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Home() {
  const stats = [
    { icon: 'ph:book-open-duotone', value: '17,000+', label: 'Islamic Books' },
    { icon: 'ph:headphones-duotone', value: '10,000+', label: 'Audio Lectures' },
    { icon: 'ph:play-circle-duotone', value: '50,000+', label: 'Video Lectures' },
    { icon: 'ph:users-duotone', value: '500+', label: 'Scholars' },
  ];

  const categories = [
    { icon: 'ph:book-open-duotone', title: 'Quran & Tafsir', desc: 'Study the words of Allah', link: '/quran' },
    { icon: 'ph:scroll-duotone', title: 'Hadith Collection', desc: 'Authentic Prophetic traditions', link: '/hadith' },
    { icon: 'ph:hands-praying-duotone', title: 'Duas & Adhkar', desc: 'Daily supplications', link: '/duas' },
    { icon: 'ph:books-duotone', title: 'Islamic Library', desc: 'Classical & modern works', link: '/books' },
    { icon: 'ph:graduation-cap-duotone', title: 'Learning Paths', desc: 'Structured courses', link: '/learn' },
    { icon: 'ph:headphones-duotone', title: 'Audio Lectures', desc: 'Learn on the go', link: '/audio' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-400 arabic-text">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Islamic Knowledge Hub
          </h2>
          <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto">
            Your comprehensive platform for authentic Islamic knowledge. 
            Access thousands of books, lectures, and resources from classical and contemporary scholars.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/books" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center gap-2 transition-all transform hover:scale-105">
              <Icon icon="ph:books-duotone" className="w-6 h-6" />
              Explore Library
            </Link>
            <Link to="/quran" className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center gap-2 transition-all">
              <Icon icon="ph:book-open-duotone" className="w-6 h-6" />
              Read Quran
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700">
                <Icon icon={stat.icon} className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <div className="text-3xl font-bold text-green-700 dark:text-green-400">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-700 dark:text-green-400">
            Explore Islamic Sciences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} to={cat.link} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900">
                    <Icon icon={cat.icon} className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cat.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Icon icon="ph:star-four-duotone" className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-6">Begin Your Journey of Knowledge</h2>
          <p className="text-xl text-green-200 mb-8">
            Join thousands of students worldwide in exploring the rich Islamic tradition
          </p>
          <Link to="/learn" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center gap-2 transition-all">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}