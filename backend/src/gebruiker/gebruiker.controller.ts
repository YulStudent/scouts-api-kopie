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
} from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import {
  CreateGebruikerRequestDto,
  UpdateGebruikerRequestDto,
  GebruikerListResponseDto,
  GebruikerResponseDto,
} from './gebruiker.dto';

@Controller('gebruikers')
export class GebruikerController {
  constructor(private readonly gebruikerService: GebruikerService) {}

  @Get()
  getAll(): Promise<GebruikerListResponseDto> {
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

  @Post()
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