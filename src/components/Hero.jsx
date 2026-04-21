'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '4rem 1rem',
      overflow: 'hidden',
      background: 'var(--secondary)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Decorative background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(45deg, rgba(230, 68, 169, 0.05) 0%, transparent 100%)',
        zIndex: 1
      }}></div>

      <div style={{
        textAlign: 'center',
        zIndex: 2,
        padding: '0 1rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span style={{ color: 'var(--accent)', letterSpacing: '6px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'block' }}>KHUSH AMDEED</span>
          <h1 className="urdu" style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            marginBottom: '1.5rem', 
            color: 'var(--text-main)',
            textShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            خواب نگر کے باسی
          </h1>
          <div style={{
            width: '80px',
            height: '2px',
            background: 'var(--accent)',
            margin: '2rem auto'
          }}></div>
          <p className="serif" style={{ 
            fontStyle: 'italic', 
            fontSize: '1.4rem', 
            color: 'var(--text-muted)', 
            maxWidth: '700px',
            lineHeight: '1.8',
            margin: '0 auto'
          }}>
            "Har shair aik mehak hai jo rooh ko chhoo jaye..."
          </p>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          border: '1px solid var(--accent)',
          borderRadius: '50%',
          opacity: 0.1
        }}
      />
    </section>
  );
};

export default Hero;
