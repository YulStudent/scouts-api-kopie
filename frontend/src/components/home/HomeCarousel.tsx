import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';


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
    <Carousel className="w-full" opts={{loop: true}}>
      <CarouselContent>
        {images.map((src, index) =>  (
          <CarouselItem key={src}>
            <img
              src={src} alt={`Foto ${index + 1}`} className="flex aspect-square items-center justify-center p-6" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}