import { Module } from '@nestjs/common';
import { MedischeFicheService } from './medische-fiche.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [MedischeFicheService],
  exports: [MedischeFicheService],
})
export class MedischeFicheModule {}