import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
@Module({
  imports: [DrizzleModule],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
