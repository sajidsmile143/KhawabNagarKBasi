import React from 'react';
import Hero from '../components/Hero';
import PoetryGrid from '../components/PoetryGrid';
import { motion } from 'framer-motion';

const Home = ({ poems }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.8rem' }}>FEATURED WORKS</span>
          <h2 className="serif" style={{ fontSize: '2.5rem' }}>Selected Verses</h2>
        </div>
        <PoetryGrid poems={poems.slice(0, 3)} />
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-premium" onClick={() => window.location.href='/ghazals'}>View All Collections</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
