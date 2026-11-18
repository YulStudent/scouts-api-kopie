import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { patrouilles } from '../drizzle/schema';
import { type DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CreatePatrouilleRequestDto,
  UpdatePatrouilleRequestDto,
  PatrouilleListResponseDto,
  PatrouilleResponseDto,
} from './patrouille.dto';

@Injectable()
export class PatrouilleService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider){}

  async getAll(): Promise<PatrouilleListResponseDto>{
    const items = await this.db.query.patrouilles.findMany();
    return {items};
  }

  async getById(id: number): Promise<PatrouilleResponseDto> {
    const patrouille = await this.db.query.patrouilles.findFirst({where: eq(patrouilles.id, id),})
    if (!patrouille)
      throw new NotFoundException('Geen Patrouille gevonden met dit id')
    return patrouille
  }

  async create(dto: CreatePatrouilleRequestDto): Promise<PatrouilleResponseDto>{
    const [nieuwe] = await this.db.insert(patrouilles).values(dto).$returningId();
    return this.getById(nieuwe.id);
  }

  async updateById(id: number, dto: UpdatePatrouilleRequestDto): Promise<PatrouilleResponseDto> {
    await this.db.update(patrouilles).set(dto).where(eq(patrouilles.id, id));
    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db.delete(patrouilles).where(eq(patrouilles.id, id));
    if (result.affectedRows === 0)
      throw new NotFoundException('No patrouille with this id exists');
  }
}
