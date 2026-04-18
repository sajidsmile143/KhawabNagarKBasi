import PoetryGrid from '@/components/PoetryGrid';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getPoemsByCategory(category) {
  try {
    const poems = await prisma.poem.findMany({
      where: { category: category },
      orderBy: { createdAt: 'desc' }
    });
    return poems;
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const poems = await getPoemsByCategory(slug);
  
  const titleMap = {
    'ghazals': 'Ghazals',
    'nazms': 'Nazms',
    'rubai': 'Rubaiyat',
    'sher': 'Ashaar'
  };

  return (
    <div className="fade-in" style={{ padding: '3rem 1rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>COLLECTION</span>
          <h1 className="serif" style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{titleMap[slug] || slug}</h1>
        </div>

        {poems.length > 0 ? (
          <PoetryGrid poems={poems} />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <p className="urdu" style={{ fontSize: '1.5rem' }}>Abhi is category mein koi shayari nahi hai.</p>
          </div>
        )}
      </div>
    </div>
  );
}
