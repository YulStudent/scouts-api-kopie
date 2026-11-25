import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { MedischeFicheModule } from '../medische-fiche/medische-fiche.module';
import { GebruikerController } from './gebruiker.controller';
import { GebruikerService } from './gebruiker.service';

@Module({
  imports: [DrizzleModule, MedischeFicheModule],
  controllers: [GebruikerController],
  providers: [GebruikerService],
  exports: [GebruikerService],
})
export class GebruikerModule {}