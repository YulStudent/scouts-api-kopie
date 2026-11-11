import { Module } from '@nestjs/common';
import { TakController } from './tak.controller';
import { TakService } from './tak.service';

@Module({
  imports: [],
  controllers: [TakController],
  providers: [TakService],
})
export class TakModule {}
