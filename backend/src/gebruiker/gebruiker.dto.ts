export type GebruikersType = 'Lid' | 'Ouder' | 'Leiding';

export class CreateGebruikerRequestDto {
  voornaam: string;
  achternaam: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  gemeente: string;
  gebruikersType: GebruikersType;
  email?: string|null;
  telefoonnummer?: string|null;
  rijksregisternummer?: string|null;
  heeftToestemmingFotos?: boolean|null;
  startdatumLeiding?: Date|null;
  geboortedatum?: Date|null;
}

export class UpdateGebruikerRequestDto extends CreateGebruikerRequestDto {}

export class GebruikerResponseDto extends CreateGebruikerRequestDto{
  id: number;
  datumAccountcreatie: Date;
}

export class GebruikerListResponseDto {
  items: GebruikerResponseDto[];
}
export class GebruikerRelatieResponseDto extends GebruikerResponseDto {
  relatie: string;
  isNoodcontact: boolean;
}

export class GebruikerRelatieListResponseDto {
  items: GebruikerRelatieResponseDto[];
}