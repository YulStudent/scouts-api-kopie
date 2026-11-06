import HomeCarousel from '@/components/home/HomeCarousel';



const Home = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Home</h1>
      <p className='text-muted-foreground'>Hier komt de Home page.</p>
      <HomeCarousel />
    </>
  );
};

export default Home;