import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import PoemDetail from './pages/PoemDetail';
import AdminPreview from './components/AdminPreview';
import AboutPoet from './components/AboutPoet';

const initialPoems = [
  {
    id: 1,
    title: "محبت کا سفر",
    category: "Ghazal",
    excerpt: "محبت ایک روشن خواب ہے جو آنکھوں میں بستا ہے، ہر اک پل میں نیا احساس لے کر دل میں اترتا ہے۔",
    date: "April 2024"
  },
  {
    id: 2,
    title: "وقت کی دستک",
    category: "Nazm",
    excerpt: "گزرتے وقت کی آہٹ سنائی دیتی ہے ہر پل، کہ جیسے کوئی بھولا خواب پھر سے یاد آتا ہے۔",
    date: "March 2024"
  },
  {
    id: 3,
    title: "خوابوں کا شہر",
    category: "Ghazal",
    excerpt: "پرانے شہر کی گلیوں میں اب بھی یادیں زندہ ہیں، وہ قصے جو ہم نے مل کر لکھے تھے ادھورے رہ گئے۔",
    date: "February 2024"
  }
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [theme, setTheme] = useState('light');
  const [poems, setPoems] = useState(() => {
    const saved = localStorage.getItem('poems');
    return saved ? JSON.parse(saved) : initialPoems;
  });

  useEffect(() => {
    localStorage.setItem('poems', JSON.stringify(poems));
  }, [poems]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handlePublish = (newPoem) => {
    setPoems([newPoem, ...poems]);
    window.location.href = '/';
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <Routes>
            <Route path="/" element={<Home poems={poems} />} />
            <Route path="/poem/:id" element={<PoemDetail poems={poems} />} />
            <Route path="/about" element={<AboutPoet />} />
            <Route path="/admin" element={<AdminPreview onPublish={handlePublish} />} />
            <Route path="/ghazals" element={<Category title="Ghazals" poems={poems.filter(p => p.category === 'Ghazal')} />} />
            <Route path="/nazms" element={<Category title="Nazms" poems={poems.filter(p => p.category === 'Nazm')} />} />
            <Route path="/rubai" element={<Category title="Rubaiyat" poems={poems.filter(p => p.category === 'Rubai')} />} />
            <Route path="/sher" element={<Category title="Ashaar" poems={poems.filter(p => p.category === 'Sher')} />} />
          </Routes>
          
          <footer style={{ 
            padding: '6rem 2rem', 
            textAlign: 'center', 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            marginTop: '6rem',
            backgroundColor: 'var(--bg-card)'
          }}>
            <h2 className="serif" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Khawab Nagar Ki Basi</h2>
            <p className="serif" style={{ fontStyle: 'italic', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>
              "Words are the only bridge between two souls."
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.6 }}>
              &copy; 2026 Khawab Nagar Ki Basi. All Rights Reserved.
            </p>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
