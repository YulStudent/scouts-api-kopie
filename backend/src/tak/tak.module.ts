import { Module } from '@nestjs/common';
import { TakController } from './tak.controller';
import { TakService } from './tak.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [TakController],
  providers: [TakService],
})
export class TakModule {}
