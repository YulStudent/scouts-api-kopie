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
import { PatrouilleService } from './patrouille.service';
import {
  CreatePatrouilleRequestDto,
  UpdatePatrouilleRequestDto,
  PatrouilleResponseDto,
  PatrouilleListResponseDto,
} from './patrouille.dto';

@Controller('patrouilles')
export class PatrouilleController  {
  constructor(private readonly service: PatrouilleService) {}

  @Get()
  async getAllTakken(): Promise<PatrouilleListResponseDto> {
    return this.service.getAll();
  }

  @Get(':id')
  async getTakById(@Param('id') id: string): Promise<PatrouilleResponseDto> {
    return this.service.getById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTak(@Body() dto: CreatePatrouilleRequestDto): Promise<PatrouilleResponseDto>{
    return this.service.create(dto);
  }

   @Put(':id')
  async updateTak(@Param('id') id: string,@Body() dto: UpdatePatrouilleRequestDto,): Promise<PatrouilleResponseDto> {
    return this.service.updateById(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTak(@Param('id') id: string): Promise<void> {
    this.service.deleteById(Number(id));
  }
}
