import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(var(--hero-overlay), var(--hero-overlay)), url("file:///C:/Users/hp/.gemini/antigravity/brain/872b8689-9b2f-4ebe-836c-ae9341ef1c0e/poetic_hero_bg_1776514357323.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        zIndex: 2,
        padding: '0 2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span style={{ 
            letterSpacing: '6px', 
            color: 'var(--accent)', 
            fontSize: '0.9rem', 
            fontWeight: '600',
            marginBottom: '1.5rem',
            display: 'block' 
          }}>
            KHUSH AMDEED
          </span>
          <h1 className="urdu" style={{ 
            fontSize: '6rem', 
            marginBottom: '1.5rem', 
            color: 'var(--text-main)',
            textShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            خواب نگر کی باسی
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
            lineHeight: '1.8'
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
