'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail } from 'lucide-react';

const AboutPoet = () => {
  return (
    <section className="container" id="about" style={{ padding: '4rem 1rem' }}>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={{ flex: '1', minWidth: '280px' }}
        >
          <div style={{ 
            width: '100%', 
            height: 'clamp(350px, 50vh, 500px)', 
            backgroundColor: 'var(--bg-card)', 
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
          }}>
            {/* Portrait Image */}
            <img 
              src="/images/poet.png" 
              alt="Khawab Nagar Kay Basi" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={{ flex: '1.5', minWidth: '280px' }}
        >
          <span style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.8rem' }}>MEET THE WRITER & POETESS</span>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '1rem 0' }}>Samreena Adeel</h2>
          <p className="serif" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            "Har shair aik kahani hai, aur har kahani aik adhura khawab."
          </p>
          <p style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
            An Urdu writer and poetess dedicated to capturing the whispers of the heart and the silence of the night. Through my verses and stories, I explore the depths of love, the ache of longing, and the beauty found in life's transient moments.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--accent)' }}><Instagram size={20} /></a>
              <a href="#" style={{ color: 'var(--accent)' }}><Twitter size={20} /></a>
              <a href="#" style={{ color: 'var(--accent)' }}><Mail size={20} /></a>
            </div>
            <button className="btn-premium" style={{ fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}>Contact Me</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPoet;
