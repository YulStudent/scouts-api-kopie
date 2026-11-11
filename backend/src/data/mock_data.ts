export interface Tak {
  id: number;
  takNaam: string;
  minimumLeeftijd: number;
  maximumLeeftijd: number;
  maximumAantallenLedenGeboortejaar: number;
}

export const TAKKEN: Tak[] = [
  {id: 1, takNaam: 'Bevers', minimumLeeftijd: 6, maximumLeeftijd: 8, maximumAantallenLedenGeboortejaar: 25},
  {id: 2, takNaam: 'Welpen', minimumLeeftijd: 8, maximumLeeftijd: 10, maximumAantallenLedenGeboortejaar: 25},
  {id: 3, takNaam: 'Wolven', minimumLeeftijd: 10, maximumLeeftijd: 12, maximumAantallenLedenGeboortejaar: 20}
]