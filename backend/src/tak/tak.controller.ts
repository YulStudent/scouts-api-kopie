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

@Controller('tak')
export class TakController {
  constructor(private readonly takService: TakService) {}

  @Get()
  getAllTakken(): TakListResponseDto {
    return this.takService.getAll();
  }

  @Get(':id')
  getTakById(@Param('id') id: String){
    return this.takService.getById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTak(@Body() dto: CreateTakRequestDto): TakResponseDto{
    return this.takService.create(dto);
  }

   @Put(':id')
  updateTak(
    @Param('id') id: string,
    @Body() dto: UpdateTakRequestDto,
  ): TakResponseDto {
    return this.takService.updateById(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTak(@Param('id') id: string): void {
    this.takService.deleteById(Number(id));
  }
}
