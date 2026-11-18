export type Bloedgroep = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Dieet = 'Vegetarisch' | 'Vegan' | 'Halal' | 'Koosjer' | 'Geen Restricties';

export class CreateMedischeFicheRequestDto {
  naamHuisarts: string;
  telefoonnummerHuisarts: string;
  inentingTetanusDatum?: string;
  bloedgroep?: Bloedgroep;
  allergieen?: string;
  actueleZiektes?: string;
  beperkingen?: string;
  dieet: Dieet;
  aandachtpuntenSlapen?: string;
  aandachtpuntenAlgemeen?: string;
  opmerkingenActiviteiten?: string;
}

export class UpdateMedischeFicheRequestDto extends CreateMedischeFicheRequestDto {}

export class MedischeFicheResponseDto extends CreateMedischeFicheRequestDto{
  id: number;
  gebruikerId: number;
  datumLaatsteWijziging: Date;
}
export class CreateMedicatieRequestDto {
  naamMedicatie: string;
  dossering: string;
  opmerking?: string;
}

export class UpdateMedicatieRequestDto extends CreateMedicatieRequestDto {}

export class MedicatieResponseDto extends CreateMedicatieRequestDto{
  id: number;
  medischeFicheId: number;
}

export class MedicatieListResponseDto {
  items: MedicatieResponseDto[];
}