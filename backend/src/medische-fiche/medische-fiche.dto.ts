export type Bloedgroep = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Dieet = 'Vegetarisch' | 'Vegan' | 'Halal' | 'Koosjer' | 'Geen Restricties';
 
export class CreateMedicatieRequestDto {
  naamMedicatie: string;
  dosering: string;
  tijdstip?: string | null;
  opmerking?: string | null;
}
 
export class MedicatieResponseDto extends CreateMedicatieRequestDto {
  id: number;
}
 
export class CreateMedischeFicheRequestDto {
  naamHuisarts: string;
  telefoonnummerHuisarts: string;
  adresHuisarts?: string | null;
  inentingTetanusDatum?: Date | null;
  bloedgroep?: Bloedgroep | null;
  allergieen?: string | null;
  actueleZiektes?: string | null;
  beperkingen?: string | null;
  dieet: Dieet;
  aandachtpuntenSlapen?: string | null;
  aandachtpuntenAlgemeen?: string | null;
  opmerkingenActiviteiten?: string | null;
  medicaties?: CreateMedicatieRequestDto[]; // 👈 medicatie zit in de fiche
}
 
export class UpdateMedischeFicheRequestDto extends CreateMedischeFicheRequestDto {}
 
export class MedischeFicheResponseDto extends CreateMedischeFicheRequestDto {
  id: number;
  gebruikerId: number;
  datumLaatsteWijziging: Date;
  declare medicaties: MedicatieResponseDto[]; 
}
 