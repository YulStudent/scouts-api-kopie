import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { GebruikerModule } from '../gebruiker/gebruiker.module';
import { TakController } from './tak.controller';
import { TakService } from './tak.service';

@Module({
  imports: [DrizzleModule, GebruikerModule],
  controllers: [TakController],
  providers: [TakService],
})
export class TakModule {}