import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { gebruikers, medicaties, medischeFiches } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CreateMedicatieRequestDto,
  CreateMedischeFicheRequestDto,
  MedicatieListResponseDto,
  MedicatieResponseDto,
  MedischeFicheResponseDto,
  UpdateMedicatieRequestDto,
  UpdateMedischeFicheRequestDto,
} from './medische-fiche.dto';

@Injectable()
export class MedischeFicheService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getFicheById(id: number): Promise<MedischeFicheResponseDto> {
    const fiche = await this.db.query.medischeFiches.findFirst({where: eq(medischeFiches.id, id),});
    if (!fiche) 
      throw new NotFoundException('Medische fiche niet gevonden');
    return fiche;
  }

  async getFicheByGebruikerId(gebruikerId: number): Promise<MedischeFicheResponseDto> {
    const fiche = await this.db.query.medischeFiches.findFirst({where: eq(medischeFiches.gebruikerId, gebruikerId),});
    if (!fiche) throw new NotFoundException('Deze gebruiker heeft geen medische fiche');
    return fiche;
  }

  async createFiche(gebruikerId: number, dto: CreateMedischeFicheRequestDto): Promise<MedischeFicheResponseDto> {
    const [nieuwe] = await this.db.insert(medischeFiches).values({ ...dto, gebruikerId }).$returningId();
    return this.getFicheById(nieuwe.id);
  }

  async updateFicheById(id: number, dto: UpdateMedischeFicheRequestDto): Promise<MedischeFicheResponseDto> {
    await this.db.update(medischeFiches).set({ ...dto, datumLaatsteWijziging: new Date() }).where(eq(medischeFiches.id, id));
    return this.getFicheById(id);
  }

  async deleteFicheById(id: number): Promise<void> {
    const [result] = await this.db.delete(medischeFiches).where(eq(medischeFiches.id, id));
    if (result.affectedRows === 0)
      throw new NotFoundException('Medische fiche niet gevonden');
  }

  async getMedicatiesPerFiche(ficheId: number): Promise<MedicatieListResponseDto> {
    await this.getFicheById(ficheId);
    const items = await this.db.query.medicaties.findMany({
      where: eq(medicaties.medischeFicheId, ficheId),
    });
    return { items };
  }

  async getMedicatieById(id: number): Promise<MedicatieResponseDto> {
    const medicatie = await this.db.query.medicaties.findFirst({
      where: eq(medicaties.id, id),
    });
    if (!medicatie) throw new NotFoundException('Medicatie niet gevonden');
    return medicatie;
  }

}