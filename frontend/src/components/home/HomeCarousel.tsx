import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      className="w-full max-w-lg mx-auto" 
      opts={{ loop: true }}
      plugins={[ Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false, }),
    ]}>
      <CarouselContent>
        {images.map((src, index) =>  (
          <CarouselItem key={src}>
            <img 
              src={src} 
              alt={`Foto ${index + 1}`} 
              className="w-full max-w-lg aspect-video object-cover rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}