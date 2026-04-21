import prisma from '@/lib/prisma';
import { ArrowLeft, MessageCircle, Heart, Download } from 'lucide-react';
import Link from 'next/link';
import PoemActions from '@/components/PoemActions';

async function getPoem(id) {
  try {
    const poem = await prisma.poem.findUnique({
      where: { id: parseInt(id) }
    });
    return poem;
  } catch (error) {
    return null;
  }
}

export default async function PoemPage({ params }) {
  const { id } = await params;
  const poem = await getPoem(id);

  if (!poem) {
    return (
      <div className="container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h1 className="serif">Poem not found.</h1>
        <Link href="/" style={{ color: 'var(--accent)' }}>Back to home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: 'var(--secondary)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '4rem' }}>
          <ArrowLeft size={18} /> Back to Gallery
        </Link>

        {/* Featured Image at the top if exists */}
        {poem.image && (
          <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <img src={poem.image} alt={poem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            {poem.category}
          </span>
          <h1 className="urdu" style={{ fontSize: '4.5rem', margin: '1.5rem 0', lineHeight: '1.4' }}>{poem.title}</h1>
          <div style={{ height: '1px', width: '60px', background: 'var(--accent)', margin: '0 auto' }}></div>
        </div>

        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          padding: '5rem 4rem', 
          borderRadius: '24px', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
          textAlign: 'center',
          position: 'relative',
          border: '1px solid rgba(0,0,0,0.02)'
        }}>
          <p className="urdu" style={{ 
            fontSize: '2rem', 
            lineHeight: '3.2', 
            whiteSpace: 'pre-wrap',
            color: 'var(--text-main)'
          }}>
            {poem.content}
          </p>
          
          <PoemActions 
            poemId={poem.id} 
            initialLikes={poem.likes} 
            title={poem.title} 
            content={poem.content} 
          />
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <p className="serif" style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Published on {poem.date} by Khawab Nagar Kay Basi
          </p>
        </div>
      </div>
    </div>
  );
}
