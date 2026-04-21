'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Image as ImageIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { likePoem } from '@/lib/actions';

const PoetryGrid = ({ initialPoems }) => {
  const [poems, setPoems] = React.useState(initialPoems || []);
  const [likedPoems, setLikedPoems] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('liked_poems');
    if (saved) setLikedPoems(JSON.parse(saved));
  }, []);

  const handleLike = async (id) => {
    if (likedPoems.includes(id)) return;
    
    // Optimistic Update
    setPoems(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    const newLiked = [...likedPoems, id];
    setLikedPoems(newLiked);
    localStorage.setItem('liked_poems', JSON.stringify(newLiked));

    try {
      await likePoem(id);
    } catch (error) {
      console.error("Error liking poem:", error);
    }
  };

  const shareOnWhatsApp = (poem) => {
    const text = `*${poem.title}*\n\n${poem.content?.substring(0, 100)}...\n\nRead full poem at: ${window.location.origin}/poem/${poem.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const sharePortfolio = () => {
    const text = `Check out "Khawab Nagar Kay Basi" - A beautiful Urdu Poetry Portfolio by Naveed-e-Subh.\n\nVisit: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '2rem 1rem'
      }}
    >
      {poems.map((poem, index) => (
        <motion.div
          key={poem.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.03)',
          }}
        >
          {/* Image Area */}
          <div style={{ position: 'relative', height: '200px', width: '100%', backgroundColor: '#f7fafc' }}>
            {poem.image ? (
              <img 
                src={poem.image} 
                alt={poem.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={40} color="#cbd5e0" />
              </div>
            )}
            <div style={{ 
              position: 'absolute', top: '1rem', right: '1rem', 
              backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', 
              borderRadius: '20px', fontSize: '0.7rem', color: 'var(--accent)', 
              fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              {poem.category}
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <Link href={`/poem/${poem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 className="urdu" style={{ fontSize: '2rem', marginBottom: '1.2rem', cursor: 'pointer' }}>
                {poem.title}
              </h3>
            </Link>
            
            <p className="urdu" style={{ 
              fontSize: '1rem', 
              color: 'var(--text-muted)', 
              marginBottom: '2rem',
              lineHeight: '2',
              height: '80px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {poem.content}
            </p>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <button onClick={() => handleLike(poem.id)} style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  color: likedPoems.includes(poem.id) ? '#E644A9' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem', transition: '0.2s'
                }}>
                  <Heart size={18} fill={likedPoems.includes(poem.id) ? '#E644A9' : 'none'} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{poem.likes || 0}</span>
                </button>
                <button onClick={() => shareOnWhatsApp(poem)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25D366' }}>
                  <MessageCircle size={18} />
                </button>
                <button onClick={sharePortfolio} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <Share2 size={18} />
                </button>
              </div>
              <Link href={`/poem/${poem.id}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                READ <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PoetryGrid;
