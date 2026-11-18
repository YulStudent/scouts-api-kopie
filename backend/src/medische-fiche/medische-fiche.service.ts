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

  // ---------- Fiche ----------

  async getByGebruikerId(gebruikerId: number): Promise<MedischeFicheResponseDto> {
    const fiche = await this.db.query.medischeFiches.findFirst({
      where: eq(medischeFiches.gebruikerId, gebruikerId),
    });
    if (!fiche) {
      throw new NotFoundException('Deze gebruiker heeft geen medische fiche');
    }
    return fiche;
  }

  async create(
    gebruikerId: number,
    dto: CreateMedischeFicheRequestDto,
  ): Promise<MedischeFicheResponseDto> {
    const gebruiker = await this.db.query.gebruikers.findFirst({
      where: eq(gebruikers.gebruikerId, gebruikerId),
    });
    if (!gebruiker) {
      throw new NotFoundException('Geen gebruiker gevonden met dit id');
    }

    const bestaand = await this.db.query.medischeFiches.findFirst({
      where: eq(medischeFiches.gebruikerId, gebruikerId),
    });
    if (bestaand) {
      throw new ConflictException('Deze gebruiker heeft al een medische fiche');
    }

    await this.db.insert(medischeFiches).values({
      ...dto,
      gebruikerId,
      inentingTetanusDatum: dto.inentingTetanusDatum
        ? new Date(dto.inentingTetanusDatum)
        : undefined,
    });

    return this.getByGebruikerId(gebruikerId);
  }

  async updateByGebruikerId(
    gebruikerId: number,
    dto: UpdateMedischeFicheRequestDto,
  ): Promise<MedischeFicheResponseDto> {
    await this.getByGebruikerId(gebruikerId); // 404 als er geen fiche is

    await this.db
      .update(medischeFiches)
      .set({
        ...dto,
        inentingTetanusDatum: dto.inentingTetanusDatum
          ? new Date(dto.inentingTetanusDatum)
          : undefined,
        datumLaatsteWijziging: new Date(),
      })
      .where(eq(medischeFiches.gebruikerId, gebruikerId));

    return this.getByGebruikerId(gebruikerId);
  }

  async deleteByGebruikerId(gebruikerId: number): Promise<void> {
    const fiche = await this.getByGebruikerId(gebruikerId);
    await this.db.delete(medicaties).where(eq(medicaties.medischeFicheId, fiche.id));
    await this.db.delete(medischeFiches).where(eq(medischeFiches.id, fiche.id));
  }


  async getAllMedicatie(gebruikerId: number): Promise<MedicatieListResponseDto> {
    const fiche = await this.getByGebruikerId(gebruikerId);
    const items = await this.db.query.medicaties.findMany({
      where: eq(medicaties.medischeFicheId, fiche.id),
    });
    return { items };
  }

  async getMedicatieById(
    gebruikerId: number,
    medicatieId: number,
  ): Promise<MedicatieResponseDto> {
    const fiche = await this.getByGebruikerId(gebruikerId);
    const medicatie = await this.db.query.medicaties.findFirst({
      where: and(
        eq(medicaties.id, medicatieId),
        eq(medicaties.medischeFicheId, fiche.id),
      ),
    });
    if (!medicatie) {
      throw new NotFoundException('Geen medicatie gevonden met dit id');
    }
    return medicatie;
  }

  async createMedicatie(
    gebruikerId: number,
    dto: CreateMedicatieRequestDto,
  ): Promise<MedicatieResponseDto> {
    const fiche = await this.getByGebruikerId(gebruikerId);

    const [nieuwe] = await this.db
      .insert(medicaties)
      .values({ ...dto, medischeFicheId: fiche.id })
      .$returningId();

    await this.markeerGewijzigd(fiche.id);
    return this.getMedicatieById(gebruikerId, nieuwe.id);
  }

  async updateMedicatie(
    gebruikerId: number,
    medicatieId: number,
    dto: UpdateMedicatieRequestDto,
  ): Promise<MedicatieResponseDto> {
    const fiche = await this.getByGebruikerId(gebruikerId);

    await this.db
      .update(medicaties)
      .set(dto)
      .where(and(eq(medicaties.id, medicatieId), eq(medicaties.medischeFicheId, fiche.id)));

    await this.markeerGewijzigd(fiche.id);
    return this.getMedicatieById(gebruikerId, medicatieId); // 404 als hij niet bestaat
  }

  async deleteMedicatie(gebruikerId: number, medicatieId: number): Promise<void> {
    const fiche = await this.getByGebruikerId(gebruikerId);

    const [result] = await this.db
      .delete(medicaties)
      .where(and(eq(medicaties.id, medicatieId), eq(medicaties.medischeFicheId, fiche.id)));

    if (result.affectedRows === 0) {
      throw new NotFoundException('Geen medicatie gevonden met dit id');
    }
    await this.markeerGewijzigd(fiche.id);
  }

  // Elke wijziging aan medicatie telt als wijziging van de fiche
  private async markeerGewijzigd(ficheId: number): Promise<void> {
    await this.db
      .update(medischeFiches)
      .set({ datumLaatsteWijziging: new Date() })
      .where(eq(medischeFiches.id, ficheId));
  }
}