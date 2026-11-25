import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { MedischeFicheService } from '../medische-fiche/medische-fiche.service';
import type { GebruikersType } from '../drizzle/schema';
import {CreateMedischeFicheRequestDto,MedischeFicheResponseDto,UpdateMedischeFicheRequestDto,} from '../medische-fiche/medische-fiche.dto';
import { CreateGebruikerRequestDto, UpdateGebruikerRequestDto, GebruikerListResponseDto, GebruikerResponseDto } from './gebruiker.dto';

@Controller('gebruikers')
export class GebruikerController {
  constructor(
    private readonly gebruikerService: GebruikerService,
    private readonly medischeFicheService: MedischeFicheService,
  ) {}

  @Get()
  getAll(
    @Query('type') type?: GebruikersType,
    @Query('rol') rol?: 'takleiding' | 'eenheidsleiding',
    @Query('werkjaar', new ParseIntPipe({ optional: true })) werkjaar?: number,
  ): Promise<GebruikerListResponseDto> {
    if (rol) {
      return this.gebruikerService.getAllByRol(rol, werkjaar);
    }
    if (type) {
      return this.gebruikerService.getAllByType(type, werkjaar);
    }
    return this.gebruikerService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<GebruikerResponseDto> {
    return this.gebruikerService.getById(id);
  }

  @Get(':id/kinderen')
  getKinderen(@Param('id', ParseIntPipe) id: number): Promise<GebruikerListResponseDto> {
    return this.gebruikerService.getKinderenPerOuder(id);
  }

  @Get(':id/ouders')
  getOuders(@Param('id', ParseIntPipe) id: number): Promise<GebruikerListResponseDto> {
    return this.gebruikerService.getOudersPerKind(id);
  }

  @Get(':id/medische-fiche')
  getMedischeFiche(@Param('id', ParseIntPipe) id: number): Promise<MedischeFicheResponseDto> {
    return this.medischeFicheService.getByGebruikerId(id);
  }

  @Post(':id/medische-fiche')
  @HttpCode(HttpStatus.CREATED)
  createMedischeFiche(@Param('id', ParseIntPipe) id: number,@Body() dto: CreateMedischeFicheRequestDto,): Promise<MedischeFicheResponseDto> {
    return this.medischeFicheService.createByGebruikerId(id, dto);
  }

  @Put(':id/medische-fiche')
  updateMedischeFiche(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedischeFicheRequestDto,): Promise<MedischeFicheResponseDto> {
    return this.medischeFicheService.updateByGebruikerId(id, dto);
  }

  @Delete(':id/medische-fiche')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMedischeFiche(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.medischeFicheService.deleteByGebruikerId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateGebruikerRequestDto): Promise<GebruikerResponseDto> {
    return this.gebruikerService.create(dto);
  }

  @Put(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGebruikerRequestDto,
  ): Promise<GebruikerResponseDto> {
    return this.gebruikerService.updateById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gebruikerService.deleteById(id);
  }
}