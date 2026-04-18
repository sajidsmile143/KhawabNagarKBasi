import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Khawab Nagar Ki Basi | Premium Urdu Poetry',
  description: 'Explore the beautiful world of Urdu poetry by Khawab Nagar Ki Basi. Ghazals, Nazms, Rubaiyat and more in stunning Nastaliq.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
