// src/components/home/HomeEvents.tsx
import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import bbqPoster from '@/assets/events/BBQ-festijn oktober 2026.png';

interface EventItem {
  image: string;
  imageAlt: string;
  href: string;
  title: string;
  date: string;
  description: string;
}

const events: EventItem[] = [
  //mischien in de backend ?
  {
    image: bbqPoster,
    imageAlt: 'BBQ-eetfestijn',
    href: 'https://eetfestijn.tortels.be',
    title: 'BBQ-festijn',
    date: 'Zaterdag 3 oktober 2026',
    description: 'Inschrijven kan tot zondag 27 september.',
  },
  {
    image: bbqPoster,
    imageAlt: 'BBQ-eetfestijn',
    href: 'https://eetfestijn.tortels.be',
    title: 'BBQ-festijn',
    date: 'Zaterdag 3 oktober 2026',
    description: 'Inschrijven kan tot zondag 27 september.',
  },
];

function EventCard({ image, imageAlt, href, title, date, description }: EventItem) {
  return (
    <a href={href} className='group block w-full max-w-sm'>
      <Card className='h-full transition-shadow hover:shadow-lg'>
        <img src={image} alt={imageAlt} className='w-full' />
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-between gap-4'>
          <p>{description}</p>
          <a href={href}>
            <ExternalLink className='size-4' />
          </a>
        </CardFooter>
      </Card> 
    </a>
  );
}

export default function HomeEvents() {
  if (events.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className='mb-6 mt-6 text-center text-xl font-semibold'>
        Aankomende evenementen
      </h2>
      <div className='flex flex-wrap justify-center gap-6'>
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </div>
  );
}