'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
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
        &copy; {new Date().getFullYear()} Khawab Nagar Ki Basi. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
