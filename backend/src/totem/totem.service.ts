import { Injectable } from '@nestjs/common';
import { asc } from 'drizzle-orm';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import { totems } from '../drizzle/schema';
import { TotemListResponseDto } from './totem.dto';

@Injectable()
export class TotemService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAll(): Promise<TotemListResponseDto> {
    const items = await this.db.query.totems.findMany({
      columns: { id: true, totem: true, voortotem: true, plaats: true, jaar: true },
      with: { gebruiker: { columns: { id: true, voornaam: true, achternaam: true } } },
      orderBy: asc(totems.totem),
    });
    return { items };
  }
}