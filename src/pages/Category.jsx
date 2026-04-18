import React from 'react';
import { motion } from 'framer-motion';
import PoetryGrid from '../components/PoetryGrid';

const Category = ({ title, poems }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '5rem', 
          padding: '4rem 0',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: '600' }}>COLLECTION</span>
          <h1 className="urdu" style={{ fontSize: '4rem', marginTop: '1rem' }}>{title}</h1>
          <p className="serif" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
            Exploring the essence of {title.toLowerCase()}...
          </p>
        </div>
        
        {poems.length > 0 ? (
          <PoetryGrid poems={poems} />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            No poems found in this category yet.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Category;
