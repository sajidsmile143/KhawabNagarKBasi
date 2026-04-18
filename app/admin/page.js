import prisma from '@/lib/prisma';
import AdminDashboard from './AdminDashboard';

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

export default async function AdminPage() {
  const poems = await getPoems();
  
  return (
    <div className="fade-in">
      <AdminDashboard initialPoems={poems} />
    </div>
  );
}
