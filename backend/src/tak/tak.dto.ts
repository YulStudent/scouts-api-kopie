export class CreateTakRequestDto{
  takNaam: string;
  minimumLeeftijd: number;
  maximumLeeftijd: number;
  maximumAantalLedenGeboortejaar: number;
}

export class UpdateTakRequestDto extends CreateTakRequestDto{}

export class TakResponseDto extends CreateTakRequestDto{
  id: number;
}

export class TakListResponseDto{
  items: TakResponseDto[];
}