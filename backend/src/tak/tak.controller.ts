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
import { TakService } from './tak.service';
import { GebruikerService } from '../gebruiker/gebruiker.service';
import { GebruikerListResponseDto } from '../gebruiker/gebruiker.dto';
import {
  CreateTakRequestDto,
  UpdateTakRequestDto,
  TakListResponseDto,
  TakResponseDto,
} from './tak.dto';

@Controller('takken')
export class TakController {
  constructor(
    private readonly takService: TakService,
    private readonly gebruikerService: GebruikerService,
  ) {}

  @Get()
  getAllTakken(): Promise<TakListResponseDto> {
    return this.takService.getAll();
  }

  @Get(':id')
  getTakById(@Param('id', ParseIntPipe) id: number): Promise<TakResponseDto> {
    return this.takService.getById(id);
  }

  @Get(':id/leden')
  async getLeden(
    @Param('id', ParseIntPipe) id: number,
    @Query('werkjaar', new ParseIntPipe({ optional: true })) werkjaar?: number,
  ): Promise<GebruikerListResponseDto> {
    await this.takService.getById(id); // 404 als de tak niet bestaat
    return this.gebruikerService.getAllByTak(id, 'Lid', werkjaar);
  }

  @Get(':id/leiding')
  async getLeiding(
    @Param('id', ParseIntPipe) id: number,
    @Query('werkjaar', new ParseIntPipe({ optional: true })) werkjaar?: number,
  ): Promise<GebruikerListResponseDto> {
    await this.takService.getById(id);
    return this.gebruikerService.getAllByTak(id, 'Leiding', werkjaar);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTak(@Body() dto: CreateTakRequestDto): Promise<TakResponseDto> {
    return this.takService.create(dto);
  }

  @Put(':id')
  updateTak(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTakRequestDto,
  ): Promise<TakResponseDto> {
    return this.takService.updateById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTak(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.takService.deleteById(id); // return, anders mist Nest de 404
  }
}