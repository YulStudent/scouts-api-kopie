import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { gebruikers } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CreateGebruikerRequestDto,
  UpdateGebruikerRequestDto,
  GebruikerListResponseDto,
  GebruikerResponseDto,
} from './gebruiker.dto';

@Injectable()
export class GebruikerService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAll(): Promise<GebruikerListResponseDto> {
    const items = await this.db.query.gebruikers.findMany();
    return { items };
  }

  async getById(id: number): Promise<GebruikerResponseDto> {
    const gebruiker = await this.db.query.gebruikers.findFirst({
      where: eq(gebruikers.gebruikerId, id),
    });
    if (!gebruiker) {
      throw new NotFoundException('Geen gebruiker gevonden met dit id');
    }
    return gebruiker;
  }

  async create(dto: CreateGebruikerRequestDto): Promise<GebruikerResponseDto> {
    const [nieuwe] = await this.db
      .insert(gebruikers)
      .values({
        ...dto,
        startdatumLeiding: dto.startdatumLeiding ? new Date(dto.startdatumLeiding) : undefined,
        geboortedatum: dto.geboortedatum ? new Date(dto.geboortedatum) : undefined,
      })
      .$returningId();

    return this.getById(nieuwe.gebruikerId);
  }

  async updateById(id: number, dto: UpdateGebruikerRequestDto): Promise<GebruikerResponseDto> {
    await this.db
      .update(gebruikers)
      .set({
        ...dto,
        startdatumLeiding: dto.startdatumLeiding ? new Date(dto.startdatumLeiding) : undefined,
        geboortedatum: dto.geboortedatum ? new Date(dto.geboortedatum) : undefined,
      })
      .where(eq(gebruikers.gebruikerId, id));

    return this.getById(id); // gooit zelf de 404 als de gebruiker niet bestaat
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db
      .delete(gebruikers)
      .where(eq(gebruikers.gebruikerId, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('Geen gebruiker gevonden met dit id');
    }
  }
}