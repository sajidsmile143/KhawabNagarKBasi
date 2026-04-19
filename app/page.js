import Hero from '@/components/Hero';
import PoetryGrid from '@/components/PoetryGrid';
import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getPoems() {
  try {
    const poems = await prisma.poem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return poems;
  } catch (error) {
    console.error("Error fetching poems:", error);
    return [];
  }
}

export default async function Home() {
  const poems = await getPoems();
  
  // Fallback for demo if DB is empty
  const displayPoems = poems.length > 0 ? poems : [
    {
      id: 1,
      title: "محبت کا سفر",
      category: "Ghazal",
      excerpt: "محبت ایک روشن خواب ہے جو آنکھوں میں بستا ہے، ہر اک پل میں نیا احساس لے کر دل میں اترتا ہے۔",
      date: "April 2024"
    },
    {
      id: 2,
      title: "وقت کی دستک",
      category: "Nazm",
      excerpt: "گزرتے وقت کی آہٹ سنائی دیتی ہے ہر پل، کہ جیسے کوئی بھولا خواب پھر سے یاد آتا ہے۔",
      date: "March 2024"
    }
  ];

  return (
    <div className="fade-in">
      <Hero />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.8rem' }}>FEATURED WORKS</span>
          <h2 className="serif" style={{ fontSize: '2.5rem' }}>Selected Verses</h2>
        </div>
        <PoetryGrid poems={displayPoems.slice(0, 6)} />
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/collections">
            <button className="btn-premium">View All Collections</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
