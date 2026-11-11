import { Injectable, NotFoundException } from '@nestjs/common';
import { TAKKEN, Tak } from '../data/mock_data';
import {
  CreateTakRequestDto,
  UpdateTakRequestDto,
  TakListResponseDto,
  TakResponseDto,
} from './tak.dto';

@Injectable()
export class TakService {
  getAll(): TakListResponseDto {
    return { items: TAKKEN };
  }

  getById(id: number): TakResponseDto {
    const tak = TAKKEN.find((item: Tak) => item.id === id);
    if (!tak) {
      throw new NotFoundException('Geen tak met deze id bestaat'); 
    }
    return tak;
  }

  create(dto: CreateTakRequestDto): TakResponseDto {
    const nieuweTak = {
      id: Math.max(0, ...TAKKEN.map((item: Tak) => item.id)) + 1,
      ...dto,
    };
    TAKKEN.push(nieuweTak);
    return nieuweTak;
  }

  updateById(id: number, dto: UpdateTakRequestDto): TakResponseDto {
    const tak = this.getById(id);
    Object.assign(tak, dto);
    return tak;
  }

  deleteById(id: number): void {
    const index = TAKKEN.findIndex((item: Tak) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Geen tak met deze id bestaat');
    }
    TAKKEN.splice(index, 1);
  }
}
