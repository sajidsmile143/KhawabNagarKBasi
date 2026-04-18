'use client';

import React, { useState, useEffect } from 'react';
import { Feather, Moon, Sun, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Hide Navbar for Admin pages - Move this AFTER hooks
  if (pathname && pathname.startsWith('/admin')) return null;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--secondary)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      backdropFilter: 'blur(10px)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <Feather color="var(--accent)" size={24} />
        <span className="serif" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
          Khawab Nagar Ki Basi
        </span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '500' }}>HOME</Link>
        
        {/* Categories Dropdown */}
        <div 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          style={{ position: 'relative' }}
        >
          <span style={{ 
            textDecoration: 'none', 
            color: 'var(--text-main)', 
            fontSize: '0.85rem', 
            letterSpacing: '2px', 
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            COLLECTIONS <ChevronDown size={14} />
          </span>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '1rem 0',
              minWidth: '200px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <Link href="/category/ghazals" className="dropdown-link">Ghazals</Link>
              <Link href="/category/nazms" className="dropdown-link">Nazms</Link>
              <Link href="/category/rubai" className="dropdown-link">Rubaiyat</Link>
              <Link href="/category/sher" className="dropdown-link">Ashaar</Link>
            </div>
          )}
        </div>

        <Link href="/about" style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '500' }}>ABOUT</Link>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Dhoonden..." 
            className="urdu"
            style={{ 
              padding: '0.4rem 1rem', 
              borderRadius: '20px', 
              border: '1px solid rgba(0,0,0,0.1)', 
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              width: '150px',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.width = '250px'}
            onBlur={(e) => e.target.style.width = '150px'}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
          <Link 
            href="/admin" 
            title="Poet Login"
            style={{ 
              textDecoration: 'none', 
              color: 'var(--accent)', 
              fontSize: '0.75rem', 
              letterSpacing: '1px', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <User size={16} /> ADMIN
          </Link>
          <button 
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
