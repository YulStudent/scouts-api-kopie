// src/medische-fiche/medische-fiche.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { gebruikers, medicaties, medischeFiches } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CreateMedischeFicheRequestDto,
  UpdateMedischeFicheRequestDto,
  MedischeFicheResponseDto,
  CreateMedicatieRequestDto,
  UpdateMedicatieRequestDto,
  MedicatieResponseDto,
  MedicatieListResponseDto,
} from './medische-fiche.dto';

@Injectable()
export class MedischeFicheService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

}