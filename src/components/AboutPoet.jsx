import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail } from 'lucide-react';

const AboutPoet = () => {
  return (
    <section className="container" id="about" style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={{ flex: '1', minWidth: '300px' }}
        >
          <div style={{ 
            width: '100%', 
            height: '500px', 
            backgroundColor: '#eee', 
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Placeholder for Poet's Photo */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#aaa',
              fontStyle: 'italic'
            }}>
              [ Poet's Portrait ]
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={{ flex: '1.5', minWidth: '300px' }}
        >
          <span style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.8rem' }}>MEET THE POET</span>
          <h2 className="serif" style={{ fontSize: '3rem', margin: '1rem 0' }}>Khawab Nagar Ki Basi</h2>
          <p className="serif" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            "Har shair aik kahani hai, aur har kahani aik adhura khawab."
          </p>
          <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            An Urdu poet dedicated to capturing the whispers of the heart and the silence of the night. Through my verses, I explore the depths of love, the ache of longing, and the beauty found in life's transient moments.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--accent)' }}><Instagram size={24} /></a>
            <a href="#" style={{ color: 'var(--accent)' }}><Twitter size={24} /></a>
            <a href="#" style={{ color: 'var(--accent)' }}><Mail size={24} /></a>
            <button className="btn-premium" style={{ marginLeft: 'auto' }}>Contact for Collaborations</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPoet;
