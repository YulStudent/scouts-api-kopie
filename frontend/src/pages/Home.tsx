import HomeCarousel from '@/components/home/HomeCarousel';
import HomeEvents from '@/components/home/HomeEvents';

const Home = () => {
  return (
    <>
      <HomeCarousel
        title='De Tortels'
        subtitle='204° FOS De Tortels · Wondelgem'
      />
      <HomeEvents />
    </>
  );
};

export default Home;