import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { EventListResponseDto } from './event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents(): Promise<EventListResponseDto> {
    return this.eventService.getAll();
  }
}
