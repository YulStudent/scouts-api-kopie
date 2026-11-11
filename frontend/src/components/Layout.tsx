import { Outlet } from 'react-router';
import Navbar from './NavBar';
import FooterComponent from '@/components/Footer';


export default function Layout() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-6 max-w-5xl'>
        <Outlet />
      </main>
      <FooterComponent/>
    </div>
  );
}
