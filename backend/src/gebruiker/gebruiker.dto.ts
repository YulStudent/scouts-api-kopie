export type GebruikersType = 'Lid' | 'Ouder' | 'Leiding';

export class CreateGebruikerRequestDto {
  voornaam: string;
  achternaam: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  gemeente: string;
  gebruikersType: GebruikersType;
  email?: string;
  telefoonnummer?: string;
  rijksregisternummer?: string;
  heeftToestemmingFotos?: boolean;
  startdatumLeiding?: string;
  geboortedatum?: string;
}

export class UpdateGebruikerRequestDto extends CreateGebruikerRequestDto {}

export class GebruikerResponseDto extends CreateGebruikerRequestDto{
  gebruikerId: number;
  datumAccountcreatie: Date;
}

export class GebruikerListResponseDto {
  items: GebruikerResponseDto[];
}