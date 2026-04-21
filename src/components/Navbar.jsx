'use client';

import React, { useState, useEffect } from 'react';
import { Feather, Moon, Sun, ChevronDown, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Hide Navbar for Admin pages
  if (pathname && pathname.startsWith('/admin')) return null;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
  ];

  const categories = [
    { name: 'Ghazals (غزلیات)', href: '/category/ghazals' },
    { name: 'Nazms (نظمیں)', href: '/category/nazms' },
    { name: 'Rubaiyat (رباعیات)', href: '/category/rubai' },
    { name: 'Ashaar (اشعار)', href: '/category/sher' },
    { name: 'Novels (ناول)', href: '/category/novels' },
    { name: 'Afsany (افسانے)', href: '/category/afsany' },
    { name: 'Tehreer (تحاریر)', href: '/category/tehreer' },
    { name: 'Rohani Shairi (روحانی شاعری)', href: '/category/rohani' },
    { name: 'Mery Alfaz (میرے الفاظ)', href: '/category/alfaz' },
  ];

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--secondary)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)',
        height: '70px'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
          <Feather color="var(--accent)" size={22} />
          <span className="serif" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            Khawab Nagar Kay Basi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: '500' }}>
              {link.name}
            </Link>
          ))}

          {/* Categories Dropdown */}
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            style={{ position: 'relative' }}
          >
            <span style={{
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              letterSpacing: '1px',
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
                minWidth: '220px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {categories.map(cat => (
                  <Link key={cat.href} href={cat.href} className="dropdown-link" style={{ fontSize: '0.8rem' }}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
            <input
              type="text"
              placeholder="Dhoonden..."
              className="urdu"
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '0.85rem',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                width: '120px',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.width = '200px'}
              onBlur={(e) => e.target.style.width = '120px'}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
            <Link
              href="/admin"
              style={{
                textDecoration: 'none',
                color: 'var(--accent)',
                fontSize: '0.7rem',
                letterSpacing: '1px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <User size={14} /> ADMIN
            </Link>
            <button
              onClick={toggleTheme}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 2000,
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-enter"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80%',
              maxWidth: '300px',
              height: '100%',
              backgroundColor: 'var(--bg-card)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 50px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <span className="serif" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>NAVEED-E-SUBH</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={28} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '600' }}
                >
                  {link.name}
                </Link>
              ))}

              <div style={{ margin: '1rem 0', height: '1px', backgroundColor: 'rgba(0,0,0,0.05)' }}></div>

              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 'bold' }}>COLLECTIONS</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {categories.map(cat => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.9rem' }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link
                  href="/admin"
                  className="btn-premium"
                  style={{ width: '100%', display: 'block' }}
                >
                  ADMIN LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
