import { Module } from '@nestjs/common';
import { GebruikerController } from './gebruiker.controller';
import { GebruikerService } from './gebruiker.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [GebruikerController],
  providers: [GebruikerService]
})
export class GebruikerModule {}
