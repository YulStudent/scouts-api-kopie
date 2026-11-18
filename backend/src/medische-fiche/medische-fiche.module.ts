import { Module } from '@nestjs/common';
import { MedischeFicheController } from './medische-fiche.controller';
import { MedischeFicheService } from './medische-fiche.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [MedischeFicheController],
  providers: [MedischeFicheService]
})
export class MedischeFicheModule {}
