import { Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq, inArray, type SQL } from 'drizzle-orm';
import { gebruikers, lidmaatschappen, lidOuder, type GebruikersType } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import { huidigWerkjaar } from '../common/werkjaar';
import {
  CreateGebruikerRequestDto,
  UpdateGebruikerRequestDto,
  GebruikerListResponseDto,
  GebruikerResponseDto,
  GebruikerRelatieListResponseDto,
} from './gebruiker.dto';

@Injectable()
export class GebruikerService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAll(): Promise<GebruikerListResponseDto> {
    const items = await this.db.query.gebruikers.findMany();
    return { items };
  }

  async getAllByType(type: GebruikersType,werkjaar: number = huidigWerkjaar(),): Promise<GebruikerListResponseDto> {
    const items = await this.db.query.gebruikers.findMany({where: eq(gebruikers.gebruikersType, type),});
    return { items };
  }

  async getAllByRol(rol: 'takleiding' | 'eenheidsleiding',werkjaar: number = huidigWerkjaar(),): Promise<GebruikerListResponseDto> {
    let items: GebruikerListResponseDto['items'] = [];
    if (rol === 'takleiding')
        items = await this.db.query.gebruikers.findMany({where: this.heeftLidmaatschap([eq(lidmaatschappen.werkjaar, werkjaar), eq(lidmaatschappen.isTakleiding, true)]),});
    else if (rol === 'eenheidsleiding')
      items = await this.db.query.gebruikers.findMany({where: this.heeftLidmaatschap([eq(lidmaatschappen.werkjaar, werkjaar), eq(lidmaatschappen.isEenheidsleiding, true)]),});
    
    return { items };
  }

  async getAllByTak(takId: number,type: 'Lid' | 'Leiding',werkjaar: number = huidigWerkjaar(),): Promise<GebruikerListResponseDto> {
    const items = await this.db.query.gebruikers.findMany({where: and(eq(gebruikers.gebruikersType, type),this.heeftLidmaatschap([eq(lidmaatschappen.werkjaar, werkjaar), eq(lidmaatschappen.takId, takId)]),),});
    return { items };
  }

  private heeftLidmaatschap(lidmaatschapConditions: SQL[]): SQL {
    return inArray(
      gebruikers.id,
      this.db
        .select({ id: lidmaatschappen.gebruikerId })
        .from(lidmaatschappen)
        .where(and(...lidmaatschapConditions)),
    );
  }

  async getById(id: number): Promise<GebruikerResponseDto> {
    const gebruiker = await this.db.query.gebruikers.findFirst({where: eq(gebruikers.id, id),});

    if (!gebruiker) {
      throw new NotFoundException('Geen gebruiker met dit id bestaat');
    }

    return gebruiker;
  }

  async create(dto: CreateGebruikerRequestDto): Promise<GebruikerResponseDto> {
    const [nieuwe] = await this.db.insert(gebruikers).values(dto).$returningId();
    return this.getById(nieuwe.id);
  }
  async updateById(id: number, dto: UpdateGebruikerRequestDto): Promise<GebruikerResponseDto> {
    await this.db.update(gebruikers).set(dto).where(eq(gebruikers.id, id));
    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db.delete(gebruikers).where(eq(gebruikers.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No gebruiker with this id exists');
    }
  }

  async getKinderenPerOuder(ouderId: number): Promise<GebruikerListResponseDto>{
    await this.getById(ouderId)
    const koppelingen = await this.db.query.lidOuder.findMany({where: eq(lidOuder.ouderGebruikerId, ouderId),})
    const kinderenIds = koppelingen.map((k) => k.lidGebruikerId);
    if (kinderenIds.length === 0) 
      return { items: [] };
    const items = await this.db.query.gebruikers.findMany({where: inArray(gebruikers.id, kinderenIds),});
    return {items};
  }

  async getOudersPerKind(lidId: number): Promise<GebruikerListResponseDto>{
    await this.getById(lidId)
    const koppelingen = await this.db.query.lidOuder.findMany({where: eq(lidOuder.lidGebruikerId, lidId),})
    const oudersIds = koppelingen.map((k) => k.ouderGebruikerId);
    if (oudersIds.length === 0) 
      return { items: [] };
    const items = await this.db.query.gebruikers.findMany({where: inArray(gebruikers.id, oudersIds),});
    return {items};
  }
}