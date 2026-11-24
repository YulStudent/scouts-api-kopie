import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TakService } from './tak.service';
import {
  CreateTakRequestDto,
  UpdateTakRequestDto,
  TakListResponseDto,
  TakResponseDto,
} from './tak.dto';

@Controller('takken')
export class TakController {
  constructor(private readonly takService: TakService) {}

  @Get()
  async getAllTakken(): Promise<TakListResponseDto> {
    return this.takService.getAll();
  }

  @Get(':id')
  async getTakById(@Param('id') id: string): Promise<TakResponseDto> {
    return this.takService.getById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTak(@Body() dto: CreateTakRequestDto): Promise<TakResponseDto>{
    return this.takService.create(dto);
  }

   @Put(':id')
  async updateTak(
    @Param('id') id: string,
    @Body() dto: UpdateTakRequestDto,
  ): Promise<TakResponseDto> {
    return this.takService.updateById(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTak(@Param('id') id: string): Promise<void> {
    this.takService.deleteById(Number(id));
  }
}
