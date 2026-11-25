import { Controller, Get } from '@nestjs/common';
import { TotemService } from './totem.service';
import { TotemListResponseDto } from './totem.dto';

@Controller('totems')
export class TotemController {
  constructor(private readonly totemService: TotemService) {}

  @Get()
  getAllTotems(): Promise<TotemListResponseDto> {
    return this.totemService.getAll();
  }
}