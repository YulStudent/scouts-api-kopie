import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getEvents, type EventItem } from '@/api/events';

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('nl-BE', {
    dateStyle: 'full',
    timeZone: 'UTC',
  });

function EventCard({ title, eventDate, description, imageUrl, externalUrl }: EventItem) {
  return (
    <div className='group block w-full max-w-sm'>
      <Card className='h-full transition-shadow hover:shadow-lg'>
        <img src={imageUrl} alt={title} className='w-full' />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{formatDate(eventDate)}</CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-between gap-4'>
          <p>{description}</p>
          {externalUrl && (
            <a
              href={externalUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Meer info over ${title}`}
            >
              <ExternalLink className='size-4' />
            </a>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function HomeEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

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
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}