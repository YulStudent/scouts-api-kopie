export class CreatePatrouilleRequestDto{
  patrouilleNaam: string;
  takId: number;
  kreet: string;
}

export class UpdatePatrouilleRequestDto extends CreatePatrouilleRequestDto{}

export class PatrouilleResponseDto extends CreatePatrouilleRequestDto{
  id: number;
}

export class PatrouilleListResponseDto {
  items: PatrouilleResponseDto[]
}