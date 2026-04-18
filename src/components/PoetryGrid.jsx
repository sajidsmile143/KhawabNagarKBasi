import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoetryGrid = ({ poems }) => {
  const shareOnWhatsApp = (poem) => {
    const text = `*${poem.title}*\n\n${poem.excerpt}\n\nRead full poem at: ${window.location.origin}/poem/${poem.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2.5rem'
    }}>
      {poems.map((poem, index) => (
        <motion.div
          key={poem.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '2.5rem',
            border: '1px solid rgba(0,0,0,0.03)',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 'bold' }}>
              {poem.category}
            </span>
          </div>

          <Link to={`/poem/${poem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 className="urdu" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
              {poem.title}
            </h3>
          </Link>
          
          <p className="urdu" style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-muted)', 
            marginBottom: '2rem',
            lineHeight: '2',
            height: '100px',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}>
            {poem.excerpt}
          </p>
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => shareOnWhatsApp(poem)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25D366' }}><MessageCircle size={18} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Heart size={18} /></button>
            </div>
            <Link to={`/poem/${poem.id}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              READ FULL <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PoetryGrid;
