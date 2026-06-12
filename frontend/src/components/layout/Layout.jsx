import Header from './Header';
import MobileNav from './MobileNav';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}