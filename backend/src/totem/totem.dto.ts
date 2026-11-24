export class CreateTotemRequestDto {
  totem: string;
  voortotem: string | null;
  plaats: string;
  jaar: number;
  gebruikerId: number;
}

export class UpdateTotemRequestDto extends CreateTotemRequestDto {}

export class TotemResponseDto {
  id: number;
}

export class TotemListResponseDto {
  items: TotemResponseDto[];
}