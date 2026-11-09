import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const modules = import.meta.glob<string>(
  '../../assets/tortelFotos/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
);
const images = Object.values(modules);


export default function HomeCarousel(){
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
      
    </Carousel>
  );
}