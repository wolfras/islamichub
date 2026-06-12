import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Quran from './pages/Quran';
import Hadith from './pages/Hadith';
import Duas from './pages/Duas';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Scholars from './pages/Scholars';
import Audio from './pages/Audio';
import Learn from './pages/Learn';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ScholarDetail from './pages/ScholarDetail';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/hadith" element={<Hadith />} />
              <Route path="/duas" element={<Duas />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/scholars" element={<Scholars />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/scholars/:id" element={<ScholarDetail />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}