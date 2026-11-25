import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { TotemController } from './totem.controller';
import { TotemService } from './totem.service';

@Module({
  imports: [DrizzleModule],
  controllers: [TotemController],
  providers: [TotemService],
})
export class TotemModule {}