import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function resetDatabase() {
  console.log('Resetting database...');
  await db.delete(schema.medicaties);
  await db.delete(schema.medischeFiches);
  await db.delete(schema.lidOuder);
  await db.delete(schema.lidPatrouille);
  await db.delete(schema.lidmaatschappen);
  await db.delete(schema.LeidingWerkjaar);
  await db.delete(schema.patrouilles);
  await db.delete(schema.gebruikers);
  await db.delete(schema.takken);
  console.log('Database reset completed\n');
}

async function seedTakken() {
  console.log('Seeding takken...');
  await db.insert(schema.takken).values([
    { id: 1, takNaam: 'Bevers',  minimumLeeftijd: 6,  maximumLeeftijd: 8,  maximumAantalLedenGeboortejaar: 25 },
    { id: 2, takNaam: 'Welpen',  minimumLeeftijd: 8,  maximumLeeftijd: 10, maximumAantalLedenGeboortejaar: 25 },
    { id: 3, takNaam: 'Wolven',  minimumLeeftijd: 10, maximumLeeftijd: 12, maximumAantalLedenGeboortejaar: 20 },
    { id: 4, takNaam: 'Jvg',     minimumLeeftijd: 12, maximumLeeftijd: 14, maximumAantalLedenGeboortejaar: 20 },
    { id: 5, takNaam: 'Vg',      minimumLeeftijd: 14, maximumLeeftijd: 16, maximumAantalLedenGeboortejaar: 20 },
    { id: 6, takNaam: 'Seniors', minimumLeeftijd: 16, maximumLeeftijd: 17, maximumAantalLedenGeboortejaar: 20 },
  ]);
  console.log('Takken seeded successfully\n');
}

async function seedGebruikers() {
  console.log('Seeding gebruikers...');
  await db.insert(schema.gebruikers).values([
    // Leden (1 t.e.m. 7)
    { gebruikerId: 1, voornaam: 'Noor',   achternaam: 'Janssens', straatnaam: 'Kerkstraat',   huisnummer: '12', postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Lid', geboortedatum: new Date('2020-02-11'), heeftToestemmingFotos: true },
    { gebruikerId: 2, voornaam: 'Lucas',  achternaam: 'Maes',     straatnaam: 'Dorpsstraat',  huisnummer: '5',  postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2019-09-30'), heeftToestemmingFotos: false },
    { gebruikerId: 3, voornaam: 'Emma',   achternaam: 'Peeters',  straatnaam: 'Molenstraat',  huisnummer: '8',  postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Lid', geboortedatum: new Date('2017-03-14'), heeftToestemmingFotos: true },
    { gebruikerId: 4, voornaam: 'Finn',   achternaam: 'De Smet',  straatnaam: 'Schoolstraat', huisnummer: '21', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2016-07-22'), heeftToestemmingFotos: true },
    { gebruikerId: 5, voornaam: 'Lotte',  achternaam: 'Claes',    straatnaam: 'Lindenlaan',   huisnummer: '3',  postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Lid', geboortedatum: new Date('2015-01-05'), heeftToestemmingFotos: true },
    { gebruikerId: 6, voornaam: 'Arthur', achternaam: 'Goossens', straatnaam: 'Stationsstraat', huisnummer: '40', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2013-11-18'), heeftToestemmingFotos: false },
    { gebruikerId: 7, voornaam: 'Mila',   achternaam: 'Wouters',  straatnaam: 'Hoogstraat',   huisnummer: '17', postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Lid', geboortedatum: new Date('2011-05-09'), heeftToestemmingFotos: true },

    // Ouders (8 t.e.m. 10)
    { gebruikerId: 8,  voornaam: 'Sofie', achternaam: 'Janssens', straatnaam: 'Kerkstraat',   huisnummer: '12', postcode: '9000', gemeente: 'Gent',       gebruikersType: 'Ouder', email: 'sofie.janssens@example.com', telefoonnummer: '0470 00 00 01' },
    { gebruikerId: 9,  voornaam: 'Tom',   achternaam: 'Peeters',  straatnaam: 'Molenstraat',  huisnummer: '8',  postcode: '9000', gemeente: 'Gent',       gebruikersType: 'Ouder', email: 'tom.peeters@example.com',    telefoonnummer: '0470 00 00 02' },
    { gebruikerId: 10, voornaam: 'An',    achternaam: 'De Smet',  straatnaam: 'Schoolstraat', huisnummer: '21', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'an.desmet@example.com',      telefoonnummer: '0470 00 00 03' },

    // Leiding (11 t.e.m. 13)
    { gebruikerId: 11, voornaam: 'Jonas',  achternaam: 'Vermeulen', straatnaam: 'Bosstraat',   huisnummer: '2',  postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Leiding', email: 'jonas.vermeulen@example.com', telefoonnummer: '0470 00 00 11', geboortedatum: new Date('2005-04-02'), startdatumLeiding: new Date('2023-09-01'), rijksregisternummer: '00.00.00-000.11' },
    { gebruikerId: 12, voornaam: 'Sara',   achternaam: 'Dubois',    straatnaam: 'Parklaan',    huisnummer: '14', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Leiding', email: 'sara.dubois@example.com',     telefoonnummer: '0470 00 00 12', geboortedatum: new Date('2006-08-19'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.12' },
    { gebruikerId: 13, voornaam: 'Pieter', achternaam: 'Hendrickx', straatnaam: 'Veldstraat',  huisnummer: '31', postcode: '9000', gemeente: 'Gent',      gebruikersType: 'Leiding', email: 'pieter.hendrickx@example.com', telefoonnummer: '0470 00 00 13', geboortedatum: new Date('2004-12-01'), startdatumLeiding: new Date('2022-09-01'), rijksregisternummer: '00.00.00-000.13' },
  ]);
  console.log('Gebruikers seeded successfully\n');
}

async function seedPatrouilles() {
  console.log('Seeding patrouilles...');
  await db.insert(schema.patrouilles).values([
    { id: 1, patrouilleNaam: 'Wit',     takId: 2, kreet: 'fit' },
    { id: 2, patrouilleNaam: 'Rood',    takId: 2, kreet: 'groot' },
    { id: 3, patrouilleNaam: 'Groen',   takId: 2, kreet: 'koen' },
    { id: 4, patrouilleNaam: 'Blauw',   takId: 2, kreet: 'trouw' },
    { id: 5, patrouilleNaam: 'Geel',    takId: 2, kreet: 'veel' },
    { id: 6, patrouilleNaam: 'Dingo',   takId: 3, kreet: 'Snuffelt' },
    { id: 7, patrouilleNaam: 'Pinguin', takId: 4, kreet: 'waggelt' },
    { id: 8, patrouilleNaam: 'Muizen',  takId: 5, kreet: 'strontjes' },
  ]);
  console.log('Patrouilles seeded successfully\n');
}

async function seedLidmaatschappen() {
  console.log('Seeding lidmaatschappen...');
  await db.insert(schema.lidmaatschappen).values([
    { gebruikerId: 1, werkjaar: 2026, takId: 1, betaald: true },
    { gebruikerId: 2, werkjaar: 2026, takId: 1, betaald: false },
    { gebruikerId: 3, werkjaar: 2026, takId: 2, betaald: true },
    { gebruikerId: 4, werkjaar: 2026, takId: 2, betaald: true },
    { gebruikerId: 5, werkjaar: 2026, takId: 3, betaald: false },
    { gebruikerId: 6, werkjaar: 2026, takId: 4, betaald: true },
    { gebruikerId: 7, werkjaar: 2026, takId: 5, betaald: true },
  ]);
  console.log('Lidmaatschappen seeded successfully\n');
}

async function seedLeidingWerkjaar() {
  console.log('Seeding leiding werkjaar...');
  await db.insert(schema.LeidingWerkjaar).values([
    { gebruikerId: 11, werkjaar: 2026, takId: 2, isTakleiding: true,  isEenheidsleiding: false },
    { gebruikerId: 12, werkjaar: 2026, takId: 4, isTakleiding: true,  isEenheidsleiding: false },
    { gebruikerId: 13, werkjaar: 2026, takId: 5, isTakleiding: false, isEenheidsleiding: true },
  ]);
  console.log('Leiding werkjaar seeded successfully\n');
}

async function seedLidPatrouille() {
  console.log('Seeding lid patrouille...');
  await db.insert(schema.lidPatrouille).values([
    { gebruikerId: 3, werkjaar: 2026, patrouilleId: 1, isPatrouilleLeider: true,  isAssistentPatrouilleLeider: false },
    { gebruikerId: 4, werkjaar: 2026, patrouilleId: 1, isPatrouilleLeider: false, isAssistentPatrouilleLeider: true },
    { gebruikerId: 5, werkjaar: 2026, patrouilleId: 6, isPatrouilleLeider: true,  isAssistentPatrouilleLeider: false },
    { gebruikerId: 6, werkjaar: 2026, patrouilleId: 7, isPatrouilleLeider: false, isAssistentPatrouilleLeider: false },
    { gebruikerId: 7, werkjaar: 2026, patrouilleId: 8, isPatrouilleLeider: true,  isAssistentPatrouilleLeider: false },
  ]);
  console.log('Lid patrouille seeded successfully\n');
}

async function seedLidOuder() {
  console.log('Seeding lid ouder...');
  await db.insert(schema.lidOuder).values([
    { lidGebruikerId: 1, ouderGebruikerId: 8,  relatie: 'Moeder', isNoodcontact: true },
    { lidGebruikerId: 3, ouderGebruikerId: 9,  relatie: 'Vader',  isNoodcontact: true },
    { lidGebruikerId: 4, ouderGebruikerId: 10, relatie: 'Moeder', isNoodcontact: true },
  ]);
  console.log('Lid ouder seeded successfully\n');
}

async function seedMedischeFiches() {
  console.log('Seeding medische fiches...');
  await db.insert(schema.medischeFiches).values([
    { id: 1, gebruikerId: 3, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', inentingTetanusDatum: new Date('2019-06-15'), bloedgroep: 'A+', allergieen: 'Hooikoorts', dieet: 'Geen Restricties' },
    { id: 2, gebruikerId: 4, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'O+', allergieen: 'Noten', dieet: 'Vegetarisch', aandachtpuntenSlapen: 'Slaapt graag met licht aan' },
    { id: 3, gebruikerId: 6, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', actueleZiektes: 'Astma', dieet: 'Geen Restricties', opmerkingenActiviteiten: 'Geen intensieve loopspelen zonder pauze' },
  ]);
  console.log('Medische fiches seeded successfully\n');
}

async function seedMedicaties() {
  console.log('Seeding medicaties...');
  await db.insert(schema.medicaties).values([
    { id: 1, medischeFicheId: 3, naamMedicatie: 'Ventolin', dossering: '1 puffje bij benauwdheid', opmerking: 'Steeds meenemen op kamp' },
    { id: 2, medischeFicheId: 2, naamMedicatie: 'Epipen',   dossering: 'Bij ernstige allergische reactie', opmerking: 'Bewaren bij de leiding' },
  ]);
  console.log('Medicaties seeded successfully\n');
}


async function main() {
  console.log('Starting seeding database...');

  await db.execute(sql`SELECT 1`);
  console.log('✅ Database connection OK\n');

  await resetDatabase();
  await seedTakken();
  await seedGebruikers();
  await seedPatrouilles();
  await seedLidmaatschappen();
  await seedLeidingWerkjaar();
  await seedLidPatrouille();
  await seedLidOuder();
  await seedMedischeFiches();
  await seedMedicaties();

  console.log('Database seeding completed succesfully');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
