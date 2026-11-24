import { Injectable } from '@nestjs/common';
import { asc } from 'drizzle-orm';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import { events } from '../drizzle/schema';
import { EventListResponseDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAll(): Promise<EventListResponseDto> {
    const items = await this.db.query.events.findMany({
      orderBy: asc(events.eventDate), // eerstvolgende evenement eerst
    });
    return { items };
  }
}