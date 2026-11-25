import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { gebruikers, medicaties, medischeFiches } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CreateMedicatieRequestDto,
  CreateMedischeFicheRequestDto,
  MedicatieResponseDto,
  MedischeFicheResponseDto,
  UpdateMedischeFicheRequestDto,
} from './medische-fiche.dto';
 
@Injectable()
export class MedischeFicheService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getByGebruikerId(gebruikerId: number): Promise<MedischeFicheResponseDto> {
    const fiche = await this.db.query.medischeFiches.findFirst({where: eq(medischeFiches.gebruikerId, gebruikerId),with: { medicaties: {columns: { medischeFicheId: false },orderBy: asc(medicaties.naamMedicatie),},},});
    if (!fiche)
      throw new NotFoundException('Deze gebruiker heeft geen medische fiche');
    return fiche;
  }
 
  async createByGebruikerId(gebruikerId: number, dto: CreateMedischeFicheRequestDto): Promise<MedischeFicheResponseDto> {
    const { medicaties: nieuweMedicaties = [], ...ficheGegevens } = dto;
    const gebruiker = await this.db.query.gebruikers.findFirst({where: eq(gebruikers.id, gebruikerId),});
    if (!gebruiker)
      throw new NotFoundException('Geen gebruiker met dit id bestaat');
    const bestaande = await this.db.query.medischeFiches.findFirst({columns: { id: true },where: eq(medischeFiches.gebruikerId, gebruikerId), });
    if (bestaande)
      throw new ConflictException('Deze gebruiker heeft al een medische fiche');
    await this.db.transaction(async (tx) => {
      const [nieuweFiche] = await tx.insert(medischeFiches).values({ ...ficheGegevens, gebruikerId }).$returningId();
      if (nieuweMedicaties.length > 0)
        await tx.insert(medicaties).values(nieuweMedicaties.map((m) => ({ ...m, medischeFicheId: nieuweFiche.id })));
    });
    await this.db.insert(medischeFiches).values({ ...dto, gebruikerId });
    return this.getByGebruikerId(gebruikerId);
  }
 
  async updateByGebruikerId( gebruikerId: number,{ medicaties: nieuweMedicaties, ...ficheGegevens }: UpdateMedischeFicheRequestDto,): Promise<MedischeFicheResponseDto> {
    const fiche = await this.getByGebruikerId(gebruikerId);
    await this.db.transaction(async (tx) => {
      await tx.update(medischeFiches).set({ ...ficheGegevens, datumLaatsteWijziging: new Date() }).where(eq(medischeFiches.id, fiche.id));
      if (nieuweMedicaties) {
        await tx.delete(medicaties).where(eq(medicaties.medischeFicheId, fiche.id));
        if (nieuweMedicaties.length > 0) {
          await tx.insert(medicaties).values(nieuweMedicaties.map((m) => ({ ...m, medischeFicheId: fiche.id })));
        }
      }
    });
 
    return this.getByGebruikerId(gebruikerId);
  }
 
  async deleteByGebruikerId(gebruikerId: number): Promise<void> {
    const [result] = await this.db.delete(medischeFiches).where(eq(medischeFiches.gebruikerId, gebruikerId));
    if (result.affectedRows === 0) 
      throw new NotFoundException('Deze gebruiker heeft geen medische fiche');
  }
}