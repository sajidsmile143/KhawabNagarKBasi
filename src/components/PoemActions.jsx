'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Download } from 'lucide-react';
import { likePoem } from '@/lib/actions';

export default function PoemActions({ poemId, initialLikes, title, content }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('liked_poems');
    if (saved) {
      const likedList = JSON.parse(saved);
      setIsLiked(likedList.includes(poemId));
    }
  }, [poemId]);

  const handleLike = async () => {
    if (isLiked) return;
    
    setLikes(prev => prev + 1);
    setIsLiked(true);
    
    const saved = localStorage.getItem('liked_poems');
    const likedList = saved ? JSON.parse(saved) : [];
    localStorage.setItem('liked_poems', JSON.stringify([...likedList, poemId]));

    try {
      await likePoem(poemId);
    } catch (error) {
      console.error("Error liking poem:", error);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `*${title}*\n\n${content?.substring(0, 150)}...\n\nRead full poem at: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ marginTop: '5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '3rem' }}>
      <button 
        onClick={handleLike}
        className="btn-premium" 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem',
          backgroundColor: isLiked ? 'var(--accent)' : 'transparent',
          color: isLiked ? 'white' : 'var(--accent)',
          border: '2px solid var(--accent)'
        }}
      >
        <Heart size={20} fill={isLiked ? 'white' : 'none'} /> 
        {likes} {likes === 1 ? 'Like' : 'Likes'}
      </button>
      
      <button 
        onClick={shareOnWhatsApp}
        className="btn-premium" 
        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem' }}
      >
        <MessageCircle size={20} /> Share on WhatsApp
      </button>

      <button 
        onClick={() => {
            const text = `Check out this beautiful poem "${title}" on Khawab Nagar Kay Basi.\n\nLink: ${window.location.href}`;
            if (navigator.share) {
                navigator.share({ title, text, url: window.location.href });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        }}
        className="btn-secondary" 
        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid #ddd', cursor: 'pointer', background: 'white' }}
      >
        <Share2 size={20} /> Invite Friends
      </button>
    </div>
  );
}
