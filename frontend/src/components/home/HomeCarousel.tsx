import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const modules = import.meta.glob<string>(
  '../../assets/tortelFotos/*.{jpg,jpeg,png}',
  { eager: true, query: '?url', import: 'default' },
);

const images = Object.values(modules);

interface HomeCarouselProps {
  title: string;
  subtitle?: string;
}

export default function HomeCarousel({title,subtitle}:HomeCarouselProps){
  if (images.length===0){
    return null; 
  }

  return (
    <Carousel 
      className="w-full mx-auto" 
      opts={{ loop: true }}
      plugins={[ Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false, }),
    ]}>
      <CarouselContent>
        {images.map((src, index) =>  (
          <CarouselItem key={src}>
            <img 
              src={src} 
              alt={`Foto ${index + 1}`} 
              className="w-full h-64 sm:h-80 md:h-96 lg:h-128 object-cover rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <div className='pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-linear-to-t p-6 md:p-10'>
        <h1 className='mb-0 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl lg:text-6xl'>
          {title}
        </h1>
        {subtitle && (
          <p className='mt-2 text-base text-white/90 drop-shadow-md sm:text-lg lg:text-xl'>
            {subtitle}
          </p>
        )}
      </div>
    </Carousel>
    
  );
}