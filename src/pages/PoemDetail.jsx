import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Heart, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PoemDetail = ({ poems }) => {
  const { id } = useParams();
  const poem = poems.find(p => p.id === parseInt(id));

  if (!poem) return <div className="container">Poem not found.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: 'var(--secondary)' }}
    >
      <Helmet>
        <title>{poem.title} | Khawab Nagar Ki Basi</title>
        <meta name="description" content={poem.excerpt} />
        <meta property="og:title" content={poem.title} />
        <meta property="og:description" content={poem.excerpt} />
        <meta property="og:image" content="https://raw.githubusercontent.com/sajidsmile143/KhawabNagarKBasi/main/src/assets/hero.png" />
      </Helmet>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '4rem' }}>
          <ArrowLeft size={18} /> Back to Gallery
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            {poem.category}
          </span>
          <h1 className="urdu" style={{ fontSize: '4rem', margin: '2rem 0' }}>{poem.title}</h1>
          <div style={{ height: '1px', width: '60px', background: 'var(--accent)', margin: '0 auto' }}></div>
        </div>

        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          padding: '4rem', 
          borderRadius: '16px', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <p className="urdu" style={{ 
            fontSize: '1.8rem', 
            lineHeight: '3', 
            whiteSpace: 'pre-wrap',
            color: 'var(--text-main)'
          }}>
            {poem.excerpt}
          </p>
          
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
            <button className="btn-premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} /> Like
            </button>
            <button className="btn-premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={18} /> WhatsApp
            </button>
            <button className="btn-premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={18} /> Save
            </button>
          </div>
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <p className="serif" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
            Published on {poem.date} by Khawab Nagar Ki Basi
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PoemDetail;
