import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { takken } from '../drizzle/schema';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import {
  CreateTakRequestDto,
  UpdateTakRequestDto,
  TakListResponseDto,
  TakResponseDto,
} from './tak.dto';

@Injectable()
export class TakService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<TakListResponseDto> {
    const items = await this.db.query.takken.findMany();
    return {items}
  }

  async getById(id: number): Promise<TakResponseDto> {
    const tak = await this.db.query.takken.findFirst({ where: eq(takken.id, id),});
    if (!tak) {
      throw new NotFoundException('Geen tak met deze id bestaat'); 
    }
    return tak;
  }

  async create(dto: CreateTakRequestDto): Promise<TakResponseDto> {
    const [nieuweTak] = await this.db.insert(takken).values(dto).$returningId();
    return this.getById(nieuweTak.id);
  }

  async updateById(id: number, changes: UpdateTakRequestDto): Promise<TakResponseDto> {
    await this.db.update(takken).set(changes).where(eq(takken.id, id));
    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db.delete(takken).where(eq(takken.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No tak with this id exists');
    }
  }
}
