import React, { useState } from 'react';
import { Save, Eye, Image as ImageIcon, Send } from 'lucide-react';

const AdminPreview = ({ onPublish }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Ghazal');

  const handlePublish = () => {
    if (!title || !content) return alert("Please add both title and content!");
    
    onPublish({
      id: Date.now(),
      title: title,
      excerpt: content,
      category: category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });

    setTitle('');
    setContent('');
  };

  return (
    <div className="container" id="admin" style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-card)', marginTop: '4rem', borderRadius: '12px', border: '2px dashed var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '600' }}>POET'S PRIVATE WORKSPACE</span>
        <h2 className="serif" style={{ fontSize: '2.5rem' }}>Ink your thoughts...</h2>
        <p style={{ color: 'var(--text-muted)' }}>Write your next masterpiece here.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'var(--secondary)', color: 'var(--text-main)' }}
          >
            <option>Ghazal</option>
            <option>Nazm</option>
            <option>Rubai</option>
            <option>Sher</option>
          </select>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #ddd', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-main)' }}>
              <ImageIcon size={16} /> Image
            </button>
            <button 
              onClick={handlePublish}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
              <Send size={16} /> Publish Now
            </button>
          </div>
        </div>

        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Unwan (Title)..." 
          className="urdu"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            fontSize: '2.5rem', 
            border: 'none', 
            borderBottom: '2px solid var(--accent)',
            backgroundColor: 'transparent',
            outline: 'none',
            color: 'var(--text-main)',
            textAlign: 'right'
          }} 
        />

        <textarea 
          placeholder="Apni shayari yahan likhen..."
          className="urdu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ 
            width: '100%', 
            height: '350px', 
            padding: '1.5rem', 
            fontSize: '1.5rem', 
            border: '1px solid #eee',
            borderRadius: '8px',
            backgroundColor: 'var(--secondary)',
            outline: 'none',
            color: 'var(--text-main)',
            resize: 'none',
            textAlign: 'right',
            lineHeight: '2.5'
          }}
        />
      </div>
    </div>
  );
};

export default AdminPreview;
