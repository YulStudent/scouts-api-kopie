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
  await db.delete(schema.totems);
  await db.delete(schema.lidOuder);
  await db.delete(schema.lidmaatschappen);
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
  // Leden
    { id: 1, voornaam: 'Noor', achternaam: 'Janssens', straatnaam: 'Kerkstraat', huisnummer: '12', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2020-02-11'), heeftToestemmingFotos: true },
    { id: 2, voornaam: 'Lucas', achternaam: 'Maes', straatnaam: 'Dorpsstraat', huisnummer: '5', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2019-09-30'), heeftToestemmingFotos: false },
    { id: 3, voornaam: 'Emma', achternaam: 'Peeters', straatnaam: 'Molenstraat', huisnummer: '8', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2017-03-14'), heeftToestemmingFotos: true },
    { id: 4, voornaam: 'Finn', achternaam: 'De Smet', straatnaam: 'Schoolstraat', huisnummer: '21', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2016-07-22'), heeftToestemmingFotos: true },
    { id: 5, voornaam: 'Lotte', achternaam: 'Claes', straatnaam: 'Lindenlaan', huisnummer: '3', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2015-01-05'), heeftToestemmingFotos: true },
    { id: 6, voornaam: 'Arthur', achternaam: 'Goossens', straatnaam: 'Stationsstraat', huisnummer: '40', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2013-11-18'), heeftToestemmingFotos: false },
    { id: 7, voornaam: 'Mila', achternaam: 'Wouters', straatnaam: 'Hoogstraat', huisnummer: '17', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2011-05-09'), heeftToestemmingFotos: true },
    { id: 14, voornaam: 'Nina', achternaam: 'Janssens', straatnaam: 'Kerkstraat', huisnummer: '12', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2016-09-10'), heeftToestemmingFotos: false },
    { id: 15, voornaam: 'Siebe', achternaam: 'Janssens', straatnaam: 'Kerkstraat', huisnummer: '12', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2013-10-07'), heeftToestemmingFotos: true },
    { id: 17, voornaam: 'Ella', achternaam: 'Peeters', straatnaam: 'Molenstraat', huisnummer: '8', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Lid', geboortedatum: new Date('2014-05-03'), heeftToestemmingFotos: false },
    { id: 19, voornaam: 'Lander', achternaam: 'De Smet', straatnaam: 'Schoolstraat', huisnummer: '21', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2019-08-21'), heeftToestemmingFotos: false },
    { id: 26, voornaam: 'Kobe', achternaam: 'Michiels', straatnaam: 'Akkerstraat', huisnummer: '34', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2014-04-05'), heeftToestemmingFotos: true },
    { id: 27, voornaam: 'Rune', achternaam: 'Michiels', straatnaam: 'Akkerstraat', huisnummer: '34', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2015-02-05'), heeftToestemmingFotos: true },
    { id: 28, voornaam: 'Marie', achternaam: 'Michiels', straatnaam: 'Akkerstraat', huisnummer: '34', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2018-02-13'), heeftToestemmingFotos: true },
    { id: 31, voornaam: 'Fien', achternaam: 'Lambrecht', straatnaam: 'Schoolstraat', huisnummer: '38', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2009-12-24'), heeftToestemmingFotos: true },
    { id: 32, voornaam: 'Nora', achternaam: 'Lambrecht', straatnaam: 'Schoolstraat', huisnummer: '38', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2011-02-28'), heeftToestemmingFotos: true },
    { id: 33, voornaam: 'Cas', achternaam: 'Lambrecht', straatnaam: 'Schoolstraat', huisnummer: '38', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2016-04-05'), heeftToestemmingFotos: true },
    { id: 36, voornaam: 'Axelle', achternaam: 'Vandamme', straatnaam: 'Bosstraat', huisnummer: '8', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Lid', geboortedatum: new Date('2010-02-24'), heeftToestemmingFotos: true },
    { id: 37, voornaam: 'Juul', achternaam: 'Vandamme', straatnaam: 'Bosstraat', huisnummer: '8', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Lid', geboortedatum: new Date('2018-03-05'), heeftToestemmingFotos: true },
    { id: 39, voornaam: 'Thor', achternaam: 'Willems', straatnaam: 'Boslaan', huisnummer: '94', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2013-07-22'), heeftToestemmingFotos: true },
    { id: 40, voornaam: 'Tibo', achternaam: 'Willems', straatnaam: 'Boslaan', huisnummer: '94', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2020-02-08'), heeftToestemmingFotos: true },
    { id: 42, voornaam: 'Vic', achternaam: 'Hermans', straatnaam: 'Bosstraat', huisnummer: '1', postcode: '9052', gemeente: 'Zwijnaarde', gebruikersType: 'Lid', geboortedatum: new Date('2020-11-02'), heeftToestemmingFotos: true },
    { id: 45, voornaam: 'Jasper', achternaam: 'Martens', straatnaam: 'Hoogstraat', huisnummer: '70', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2018-10-16'), heeftToestemmingFotos: true },
    { id: 46, voornaam: 'Hailey', achternaam: 'Martens', straatnaam: 'Hoogstraat', huisnummer: '70', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2020-02-04'), heeftToestemmingFotos: true },
    { id: 49, voornaam: 'Wout', achternaam: 'Pauwels', straatnaam: 'Dorpsstraat', huisnummer: '52', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2010-04-07'), heeftToestemmingFotos: true },
    { id: 50, voornaam: 'Eva', achternaam: 'Pauwels', straatnaam: 'Dorpsstraat', huisnummer: '52', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Lid', geboortedatum: new Date('2012-08-08'), heeftToestemmingFotos: false },
    { id: 53, voornaam: 'Lore', achternaam: 'Van den Broeck', straatnaam: 'Stationsstraat', huisnummer: '53', postcode: '9031', gemeente: 'Drongen', gebruikersType: 'Lid', geboortedatum: new Date('2012-01-06'), heeftToestemmingFotos: true },
    { id: 54, voornaam: 'Yara', achternaam: 'Van den Broeck', straatnaam: 'Stationsstraat', huisnummer: '53', postcode: '9031', gemeente: 'Drongen', gebruikersType: 'Lid', geboortedatum: new Date('2015-08-10'), heeftToestemmingFotos: true },
    { id: 55, voornaam: 'Lies', achternaam: 'Van den Broeck', straatnaam: 'Stationsstraat', huisnummer: '53', postcode: '9031', gemeente: 'Drongen', gebruikersType: 'Lid', geboortedatum: new Date('2016-09-22'), heeftToestemmingFotos: true },
    { id: 58, voornaam: 'Febe', achternaam: 'De Backer', straatnaam: 'Koningin Astridlaan', huisnummer: '110', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2009-02-28'), heeftToestemmingFotos: true },
    { id: 59, voornaam: 'Ilse', achternaam: 'De Backer', straatnaam: 'Koningin Astridlaan', huisnummer: '110', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Lid', geboortedatum: new Date('2017-04-13'), heeftToestemmingFotos: true },
    { id: 62, voornaam: 'Stan', achternaam: 'Verhaeghe', straatnaam: 'Koningin Astridlaan', huisnummer: '34', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2014-04-09'), heeftToestemmingFotos: true },
    { id: 63, voornaam: 'Amber', achternaam: 'Verhaeghe', straatnaam: 'Koningin Astridlaan', huisnummer: '34', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2019-06-25'), heeftToestemmingFotos: false },
    { id: 66, voornaam: 'Pauline', achternaam: 'De Clercq', straatnaam: 'Ringlaan', huisnummer: '9', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2013-03-15'), heeftToestemmingFotos: false },
    { id: 67, voornaam: 'Milan', achternaam: 'De Clercq', straatnaam: 'Ringlaan', huisnummer: '9', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Lid', geboortedatum: new Date('2014-11-17'), heeftToestemmingFotos: true },
    { id: 69, voornaam: 'Lars', achternaam: 'Desmet', straatnaam: 'Parklaan', huisnummer: '15', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2020-09-05'), heeftToestemmingFotos: true },
    { id: 72, voornaam: 'Anna', achternaam: 'Dewaele', straatnaam: 'Ringlaan', huisnummer: '117', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Lid', geboortedatum: new Date('2010-11-14'), heeftToestemmingFotos: false },
    { id: 75, voornaam: 'Ferre', achternaam: 'Vermeersch', straatnaam: 'Akkerstraat', huisnummer: '91', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2009-02-23'), heeftToestemmingFotos: false },
    { id: 76, voornaam: 'Jana', achternaam: 'Vermeersch', straatnaam: 'Akkerstraat', huisnummer: '91', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2010-10-18'), heeftToestemmingFotos: true },
    { id: 77, voornaam: 'Liv', achternaam: 'Vermeersch', straatnaam: 'Akkerstraat', huisnummer: '91', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2017-01-12'), heeftToestemmingFotos: true },
    { id: 79, voornaam: 'Hanne', achternaam: 'Smet', straatnaam: 'Koningin Astridlaan', huisnummer: '120', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2011-07-01'), heeftToestemmingFotos: true },
    { id: 80, voornaam: 'Toon', achternaam: 'Smet', straatnaam: 'Koningin Astridlaan', huisnummer: '120', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Lid', geboortedatum: new Date('2020-07-26'), heeftToestemmingFotos: true },
    { id: 83, voornaam: 'Mats', achternaam: 'Mertens', straatnaam: 'Bosstraat', huisnummer: '26', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2012-04-01'), heeftToestemmingFotos: true },
    { id: 84, voornaam: 'Bent', achternaam: 'Mertens', straatnaam: 'Bosstraat', huisnummer: '26', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2013-02-25'), heeftToestemmingFotos: true },
    { id: 85, voornaam: 'Lisa', achternaam: 'Mertens', straatnaam: 'Bosstraat', huisnummer: '26', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Lid', geboortedatum: new Date('2014-09-11'), heeftToestemmingFotos: false },
 
    // Ouders
    { id: 8, voornaam: 'Sofie', achternaam: 'Janssens', straatnaam: 'Kerkstraat', huisnummer: '12', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'sofie.janssens@example.com', telefoonnummer: '0470 00 00 01' },
    { id: 9, voornaam: 'Tom', achternaam: 'Peeters', straatnaam: 'Molenstraat', huisnummer: '8', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'tom.peeters@example.com', telefoonnummer: '0470 00 00 02' },
    { id: 10, voornaam: 'An', achternaam: 'De Smet', straatnaam: 'Schoolstraat', huisnummer: '21', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'an.desmet@example.com', telefoonnummer: '0470 00 00 03' },
    { id: 16, voornaam: 'Bart', achternaam: 'Janssens', straatnaam: 'Kerkstraat', huisnummer: '12', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'bart.janssens@example.com', telefoonnummer: '0470 00 00 05' },
    { id: 18, voornaam: 'Els', achternaam: 'Peeters', straatnaam: 'Molenstraat', huisnummer: '8', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'els.peeters@example.com', telefoonnummer: '0470 00 00 06' },
    { id: 20, voornaam: 'Veerle', achternaam: 'Maes', straatnaam: 'Dorpsstraat', huisnummer: '5', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Ouder', email: 'veerle.maes@example.com', telefoonnummer: '0470 00 00 07' },
    { id: 21, voornaam: 'Lieve', achternaam: 'Claes', straatnaam: 'Lindenlaan', huisnummer: '3', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'lieve.claes@example.com', telefoonnummer: '0470 00 00 08' },
    { id: 22, voornaam: 'Ellen', achternaam: 'Goossens', straatnaam: 'Stationsstraat', huisnummer: '40', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Ouder', email: 'ellen.goossens@example.com', telefoonnummer: '0470 00 00 09' },
    { id: 23, voornaam: 'Kristof', achternaam: 'Goossens', straatnaam: 'Stationsstraat', huisnummer: '40', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Ouder', email: 'kristof.goossens@example.com', telefoonnummer: '0470 00 00 10' },
    { id: 24, voornaam: 'Ellen', achternaam: 'Wouters', straatnaam: 'Hoogstraat', huisnummer: '17', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'ellen.wouters@example.com', telefoonnummer: '0470 00 00 11' },
    { id: 25, voornaam: 'Joris', achternaam: 'Wouters', straatnaam: 'Hoogstraat', huisnummer: '17', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Ouder', email: 'joris.wouters@example.com', telefoonnummer: '0470 00 00 12' },
    { id: 29, voornaam: 'Els', achternaam: 'Michiels', straatnaam: 'Akkerstraat', huisnummer: '34', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Ouder', email: 'els.michiels@example.com', telefoonnummer: '0470 00 00 13' },
    { id: 30, voornaam: 'Tim', achternaam: 'Michiels', straatnaam: 'Akkerstraat', huisnummer: '34', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Ouder', email: 'tim.michiels@example.com', telefoonnummer: '0470 00 00 14' },
    { id: 34, voornaam: 'Els', achternaam: 'Lambrecht', straatnaam: 'Schoolstraat', huisnummer: '38', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Ouder', email: 'els.lambrecht@example.com', telefoonnummer: '0470 00 00 15' },
    { id: 35, voornaam: 'Dries', achternaam: 'Lambrecht', straatnaam: 'Schoolstraat', huisnummer: '38', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Ouder', email: 'dries.lambrecht@example.com', telefoonnummer: '0470 00 00 16' },
    { id: 38, voornaam: 'An', achternaam: 'Vandamme', straatnaam: 'Bosstraat', huisnummer: '8', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Ouder', email: 'an.vandamme@example.com', telefoonnummer: '0470 00 00 17' },
    { id: 41, voornaam: 'Griet', achternaam: 'Verstraete', straatnaam: 'Boslaan', huisnummer: '94', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Ouder', email: 'griet.verstraete@example.com', telefoonnummer: '0470 00 00 18' },
    { id: 43, voornaam: 'Annelies', achternaam: 'Hermans', straatnaam: 'Bosstraat', huisnummer: '1', postcode: '9052', gemeente: 'Zwijnaarde', gebruikersType: 'Ouder', email: 'annelies.hermans@example.com', telefoonnummer: '0470 00 00 19' },
    { id: 44, voornaam: 'Kristof', achternaam: 'Hermans', straatnaam: 'Bosstraat', huisnummer: '1', postcode: '9052', gemeente: 'Zwijnaarde', gebruikersType: 'Ouder', email: 'kristof.hermans@example.com', telefoonnummer: '0470 00 00 20' },
    { id: 47, voornaam: 'An', achternaam: 'Martens', straatnaam: 'Hoogstraat', huisnummer: '70', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Ouder', email: 'an.martens@example.com', telefoonnummer: '0470 00 00 21' },
    { id: 48, voornaam: 'Koen', achternaam: 'Martens', straatnaam: 'Hoogstraat', huisnummer: '70', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Ouder', email: 'koen.martens@example.com', telefoonnummer: '0470 00 00 22' },
    { id: 51, voornaam: 'Inge', achternaam: 'Pauwels', straatnaam: 'Dorpsstraat', huisnummer: '52', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Ouder', email: 'inge.pauwels@example.com', telefoonnummer: '0470 00 00 23' },
    { id: 52, voornaam: 'Bart', achternaam: 'Pauwels', straatnaam: 'Dorpsstraat', huisnummer: '52', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Ouder', email: 'bart.pauwels@example.com', telefoonnummer: '0470 00 00 24' },
    { id: 56, voornaam: 'Katrien', achternaam: 'Van den Broeck', straatnaam: 'Stationsstraat', huisnummer: '53', postcode: '9031', gemeente: 'Drongen', gebruikersType: 'Ouder', email: 'katrien.vandenbroeck@example.com', telefoonnummer: '0470 00 00 25' },
    { id: 57, voornaam: 'Koen', achternaam: 'Van den Broeck', straatnaam: 'Stationsstraat', huisnummer: '53', postcode: '9031', gemeente: 'Drongen', gebruikersType: 'Ouder', email: 'koen.vandenbroeck@example.com', telefoonnummer: '0470 00 00 26' },
    { id: 60, voornaam: 'Katrien', achternaam: 'De Backer', straatnaam: 'Koningin Astridlaan', huisnummer: '110', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Ouder', email: 'katrien.debacker@example.com', telefoonnummer: '0470 00 00 27' },
    { id: 61, voornaam: 'Jan', achternaam: 'De Backer', straatnaam: 'Koningin Astridlaan', huisnummer: '110', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Ouder', email: 'jan.debacker@example.com', telefoonnummer: '0470 00 00 28' },
    { id: 64, voornaam: 'Inge', achternaam: 'Verhaeghe', straatnaam: 'Koningin Astridlaan', huisnummer: '34', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Ouder', email: 'inge.verhaeghe@example.com', telefoonnummer: '0470 00 00 29' },
    { id: 65, voornaam: 'Steven', achternaam: 'Verhaeghe', straatnaam: 'Koningin Astridlaan', huisnummer: '34', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Ouder', email: 'steven.verhaeghe@example.com', telefoonnummer: '0470 00 00 30' },
    { id: 68, voornaam: 'Inge', achternaam: 'De Clercq', straatnaam: 'Ringlaan', huisnummer: '9', postcode: '9040', gemeente: 'Sint-Amandsberg', gebruikersType: 'Ouder', email: 'inge.declercq@example.com', telefoonnummer: '0470 00 00 31' },
    { id: 70, voornaam: 'Annelies', achternaam: 'Desmet', straatnaam: 'Parklaan', huisnummer: '15', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'annelies.desmet@example.com', telefoonnummer: '0470 00 00 32' },
    { id: 71, voornaam: 'Joris', achternaam: 'Desmet', straatnaam: 'Parklaan', huisnummer: '15', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'joris.desmet@example.com', telefoonnummer: '0470 00 00 33' },
    { id: 73, voornaam: 'Sarah', achternaam: 'Dewaele', straatnaam: 'Ringlaan', huisnummer: '117', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Ouder', email: 'sarah.dewaele@example.com', telefoonnummer: '0470 00 00 34' },
    { id: 74, voornaam: 'Joris', achternaam: 'Dewaele', straatnaam: 'Ringlaan', huisnummer: '117', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Ouder', email: 'joris.dewaele@example.com', telefoonnummer: '0470 00 00 35' },
    { id: 78, voornaam: 'An', achternaam: 'Vermeersch', straatnaam: 'Akkerstraat', huisnummer: '91', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Ouder', email: 'an.vermeersch@example.com', telefoonnummer: '0470 00 00 36' },
    { id: 81, voornaam: 'Griet', achternaam: 'Smet', straatnaam: 'Koningin Astridlaan', huisnummer: '120', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'griet.smet@example.com', telefoonnummer: '0470 00 00 37' },
    { id: 82, voornaam: 'Tim', achternaam: 'Smet', straatnaam: 'Koningin Astridlaan', huisnummer: '120', postcode: '9050', gemeente: 'Gentbrugge', gebruikersType: 'Ouder', email: 'tim.smet@example.com', telefoonnummer: '0470 00 00 38' },
    { id: 86, voornaam: 'Ellen', achternaam: 'Mertens', straatnaam: 'Bosstraat', huisnummer: '26', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Ouder', email: 'ellen.mertens@example.com', telefoonnummer: '0470 00 00 39' },
    { id: 87, voornaam: 'Joris', achternaam: 'Mertens', straatnaam: 'Bosstraat', huisnummer: '26', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Ouder', email: 'joris.mertens@example.com', telefoonnummer: '0470 00 00 40' },
 
    // Leiding
    { id: 11, voornaam: 'Jonas', achternaam: 'Vermeulen', straatnaam: 'Bosstraat', huisnummer: '2', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Leiding', email: 'jonas.vermeulen@example.com', telefoonnummer: '0470 00 00 11', geboortedatum: new Date('2005-04-02'), startdatumLeiding: new Date('2023-09-01'), rijksregisternummer: '00.00.00-000.11' },
    { id: 12, voornaam: 'Sara', achternaam: 'Dubois', straatnaam: 'Parklaan', huisnummer: '14', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Leiding', email: 'sara.dubois@example.com', telefoonnummer: '0470 00 00 12', geboortedatum: new Date('2006-08-19'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.12' },
    { id: 13, voornaam: 'Pieter', achternaam: 'Hendrickx', straatnaam: 'Veldstraat', huisnummer: '31', postcode: '9000', gemeente: 'Gent', gebruikersType: 'Leiding', email: 'pieter.hendrickx@example.com', telefoonnummer: '0470 00 00 13', geboortedatum: new Date('2004-12-01'), startdatumLeiding: new Date('2022-09-01'), rijksregisternummer: '00.00.00-000.13' },
    { id: 88, voornaam: 'Ruben', achternaam: 'De Wilde', straatnaam: 'Vijverlaan', huisnummer: '66', postcode: '9070', gemeente: 'Destelbergen', gebruikersType: 'Leiding', email: 'ruben.dewilde@example.com', telefoonnummer: '0470 00 00 41', geboortedatum: new Date('2003-02-13'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.88' },
    { id: 89, voornaam: 'Laura', achternaam: 'Van Hecke', straatnaam: 'Molenstraat', huisnummer: '86', postcode: '9070', gemeente: 'Destelbergen', gebruikersType: 'Leiding', email: 'laura.vanhecke@example.com', telefoonnummer: '0470 00 00 42', geboortedatum: new Date('2003-06-20'), startdatumLeiding: new Date('2022-09-01'), rijksregisternummer: '00.00.00-000.89' },
    { id: 90, voornaam: 'Thomas', achternaam: 'Vercruysse', straatnaam: 'Pastoriestraat', huisnummer: '38', postcode: '9070', gemeente: 'Destelbergen', gebruikersType: 'Leiding', email: 'thomas.vercruysse@example.com', telefoonnummer: '0470 00 00 43', geboortedatum: new Date('2003-09-05'), startdatumLeiding: new Date('2021-09-01'), rijksregisternummer: '00.00.00-000.90' },
    { id: 91, voornaam: 'Charlotte', achternaam: 'Moerman', straatnaam: 'Weverstraat', huisnummer: '39', postcode: '9052', gemeente: 'Zwijnaarde', gebruikersType: 'Leiding', email: 'charlotte.moerman@example.com', telefoonnummer: '0470 00 00 44', geboortedatum: new Date('2000-07-18'), startdatumLeiding: new Date('2018-09-01'), rijksregisternummer: '00.00.00-000.91' },
    { id: 92, voornaam: 'Arne', achternaam: 'Cools', straatnaam: 'Meersstraat', huisnummer: '57', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Leiding', email: 'arne.cools@example.com', telefoonnummer: '0470 00 00 45', geboortedatum: new Date('2003-11-07'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.92' },
    { id: 93, voornaam: 'Julie', achternaam: 'Van Acker', straatnaam: 'Veldstraat', huisnummer: '66', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Leiding', email: 'julie.vanacker@example.com', telefoonnummer: '0470 00 00 46', geboortedatum: new Date('2000-11-21'), startdatumLeiding: new Date('2023-09-01'), rijksregisternummer: '00.00.00-000.93' },
    { id: 94, voornaam: 'Kasper', achternaam: 'Bogaert', straatnaam: 'Bosstraat', huisnummer: '104', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Leiding', email: 'kasper.bogaert@example.com', telefoonnummer: '0470 00 00 47', geboortedatum: new Date('2001-04-05'), startdatumLeiding: new Date('2018-09-01'), rijksregisternummer: '00.00.00-000.94' },
    { id: 95, voornaam: 'Silke', achternaam: 'De Vos', straatnaam: 'Meersstraat', huisnummer: '54', postcode: '9820', gemeente: 'Merelbeke', gebruikersType: 'Leiding', email: 'silke.devos@example.com', telefoonnummer: '0470 00 00 48', geboortedatum: new Date('2007-11-19'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.95' },
    { id: 96, voornaam: 'Maarten', achternaam: 'Lievens', straatnaam: 'Bosstraat', huisnummer: '23', postcode: '9070', gemeente: 'Destelbergen', gebruikersType: 'Leiding', email: 'maarten.lievens@example.com', telefoonnummer: '0470 00 00 49', geboortedatum: new Date('1999-12-17'), startdatumLeiding: new Date('2025-09-01'), rijksregisternummer: '00.00.00-000.96' },
    { id: 97, voornaam: 'Eline', achternaam: 'Roels', straatnaam: 'Vijverlaan', huisnummer: '41', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Leiding', email: 'eline.roels@example.com', telefoonnummer: '0470 00 00 50', geboortedatum: new Date('2006-08-20'), startdatumLeiding: new Date('2026-09-01'), rijksregisternummer: '00.00.00-000.97' },
    { id: 98, voornaam: 'Brent', achternaam: 'Van Damme', straatnaam: 'Boslaan', huisnummer: '32', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Leiding', email: 'brent.vandamme@example.com', telefoonnummer: '0470 00 00 51', geboortedatum: new Date('2005-11-09'), startdatumLeiding: new Date('2026-09-01'), rijksregisternummer: '00.00.00-000.98' },
    { id: 99, voornaam: 'Lotte', achternaam: 'Schepens', straatnaam: 'Kouterstraat', huisnummer: '41', postcode: '9032', gemeente: 'Wondelgem', gebruikersType: 'Leiding', email: 'lotte.schepens@example.com', telefoonnummer: '0470 00 00 52', geboortedatum: new Date('2001-09-03'), startdatumLeiding: new Date('2020-09-01'), rijksregisternummer: '00.00.00-000.99' },
    { id: 100, voornaam: 'Yannick', achternaam: 'Bracke', straatnaam: 'Kouterstraat', huisnummer: '70', postcode: '9070', gemeente: 'Destelbergen', gebruikersType: 'Leiding', email: 'yannick.bracke@example.com', telefoonnummer: '0470 00 00 53', geboortedatum: new Date('2004-08-14'), startdatumLeiding: new Date('2021-09-01'), rijksregisternummer: '00.00.00-000.100' },
    { id: 101, voornaam: 'Merel', achternaam: 'Dhondt', straatnaam: 'Kerkstraat', huisnummer: '46', postcode: '9830', gemeente: 'Sint-Martens-Latem', gebruikersType: 'Leiding', email: 'merel.dhondt@example.com', telefoonnummer: '0470 00 00 54', geboortedatum: new Date('2004-05-25'), startdatumLeiding: new Date('2024-09-01'), rijksregisternummer: '00.00.00-000.101' },
    { id: 102, voornaam: 'Sander', achternaam: 'Ghijs', straatnaam: 'Heirweg', huisnummer: '95', postcode: '9840', gemeente: 'De Pinte', gebruikersType: 'Leiding', email: 'sander.ghijs@example.com', telefoonnummer: '0470 00 00 55', geboortedatum: new Date('2004-09-26'), startdatumLeiding: new Date('2025-09-01'), rijksregisternummer: '00.00.00-000.102' }, 
  ]);
  console.log('Gebruikers seeded successfully\n');
}

async function seedLidmaatschappen() {
  console.log('Seeding lidmaatschappen...');
  await db.insert(schema.lidmaatschappen).values([
    
    { gebruikerId: 1, werkjaar: 2026, takId: 1, betaald: true },  // Noor Janssens
    { gebruikerId: 2, werkjaar: 2026, takId: 1, betaald: false },  // Lucas Maes
    { gebruikerId: 3, werkjaar: 2026, takId: 2, betaald: true },  // Emma Peeters
    { gebruikerId: 4, werkjaar: 2026, takId: 2, betaald: true },  // Finn De Smet
    { gebruikerId: 5, werkjaar: 2026, takId: 3, betaald: false },  // Lotte Claes
    { gebruikerId: 6, werkjaar: 2026, takId: 4, betaald: true },  // Arthur Goossens
    { gebruikerId: 7, werkjaar: 2026, takId: 5, betaald: true },  // Mila Wouters
    { gebruikerId: 14, werkjaar: 2026, takId: 3, betaald: true },  // Nina Janssens
    { gebruikerId: 15, werkjaar: 2026, takId: 4, betaald: true },  // Siebe Janssens
    { gebruikerId: 17, werkjaar: 2026, takId: 4, betaald: false },  // Ella Peeters
    { gebruikerId: 19, werkjaar: 2026, takId: 1, betaald: true },  // Lander De Smet
    { gebruikerId: 26, werkjaar: 2026, takId: 4, betaald: true },  // Kobe Michiels
    { gebruikerId: 27, werkjaar: 2026, takId: 3, betaald: true },  // Rune Michiels
    { gebruikerId: 28, werkjaar: 2026, takId: 2, betaald: false },  // Marie Michiels
    { gebruikerId: 31, werkjaar: 2026, takId: 6, betaald: true },  // Fien Lambrecht
    { gebruikerId: 32, werkjaar: 2026, takId: 5, betaald: false },  // Nora Lambrecht
    { gebruikerId: 33, werkjaar: 2026, takId: 3, betaald: true },  // Cas Lambrecht
    { gebruikerId: 36, werkjaar: 2026, takId: 6, betaald: true },  // Axelle Vandamme
    { gebruikerId: 37, werkjaar: 2026, takId: 2, betaald: false },  // Juul Vandamme
    { gebruikerId: 39, werkjaar: 2026, takId: 4, betaald: true },  // Thor Willems
    { gebruikerId: 40, werkjaar: 2026, takId: 1, betaald: true },  // Tibo Willems
    { gebruikerId: 42, werkjaar: 2026, takId: 1, betaald: false },  // Vic Hermans
    { gebruikerId: 45, werkjaar: 2026, takId: 2, betaald: true },  // Jasper Martens
    { gebruikerId: 46, werkjaar: 2026, takId: 1, betaald: true },  // Hailey Martens
    { gebruikerId: 49, werkjaar: 2026, takId: 6, betaald: true },  // Wout Pauwels
    { gebruikerId: 50, werkjaar: 2026, takId: 5, betaald: true },  // Eva Pauwels
    { gebruikerId: 53, werkjaar: 2026, takId: 5, betaald: false },  // Lore Van den Broeck
    { gebruikerId: 54, werkjaar: 2026, takId: 3, betaald: false },  // Yara Van den Broeck
    { gebruikerId: 55, werkjaar: 2026, takId: 3, betaald: true },  // Lies Van den Broeck
    { gebruikerId: 58, werkjaar: 2026, takId: 6, betaald: true },  // Febe De Backer
    { gebruikerId: 59, werkjaar: 2026, takId: 2, betaald: false },  // Ilse De Backer
    { gebruikerId: 62, werkjaar: 2026, takId: 4, betaald: true },  // Stan Verhaeghe
    { gebruikerId: 63, werkjaar: 2026, takId: 1, betaald: true },  // Amber Verhaeghe
    { gebruikerId: 66, werkjaar: 2026, takId: 4, betaald: true },  // Pauline De Clercq
    { gebruikerId: 67, werkjaar: 2026, takId: 4, betaald: false },  // Milan De Clercq
    { gebruikerId: 69, werkjaar: 2026, takId: 1, betaald: true },  // Lars Desmet
    { gebruikerId: 72, werkjaar: 2026, takId: 6, betaald: true },  // Anna Dewaele
    { gebruikerId: 75, werkjaar: 2026, takId: 6, betaald: true },  // Ferre Vermeersch
    { gebruikerId: 76, werkjaar: 2026, takId: 6, betaald: true },  // Jana Vermeersch
    { gebruikerId: 77, werkjaar: 2026, takId: 2, betaald: true },  // Liv Vermeersch
    { gebruikerId: 79, werkjaar: 2026, takId: 5, betaald: false },  // Hanne Smet
    { gebruikerId: 80, werkjaar: 2026, takId: 1, betaald: true },  // Toon Smet
    { gebruikerId: 83, werkjaar: 2026, takId: 5, betaald: true },  // Mats Mertens
    { gebruikerId: 84, werkjaar: 2026, takId: 4, betaald: true },  // Bent Mertens
    { gebruikerId: 85, werkjaar: 2026, takId: 4, betaald: true },  // Lisa Mertens
    { gebruikerId: 3, werkjaar: 2025, takId: 1, betaald: true },  // Emma Peeters
    { gebruikerId: 15, werkjaar: 2025, takId: 4, betaald: true },  // Siebe Janssens
    { gebruikerId: 17, werkjaar: 2025, takId: 3, betaald: true },  // Ella Peeters
    { gebruikerId: 19, werkjaar: 2025, takId: 1, betaald: true },  // Lander De Smet
    { gebruikerId: 26, werkjaar: 2025, takId: 3, betaald: true },  // Kobe Michiels
    { gebruikerId: 27, werkjaar: 2025, takId: 3, betaald: true },  // Rune Michiels
    { gebruikerId: 28, werkjaar: 2025, takId: 1, betaald: true },  // Marie Michiels
    { gebruikerId: 31, werkjaar: 2025, takId: 6, betaald: true },  // Fien Lambrecht
    { gebruikerId: 32, werkjaar: 2025, takId: 5, betaald: true },  // Nora Lambrecht
    { gebruikerId: 37, werkjaar: 2025, takId: 1, betaald: true },  // Juul Vandamme
    { gebruikerId: 39, werkjaar: 2025, takId: 4, betaald: true },  // Thor Willems
    { gebruikerId: 45, werkjaar: 2025, takId: 1, betaald: true },  // Jasper Martens
    { gebruikerId: 49, werkjaar: 2025, takId: 5, betaald: true },  // Wout Pauwels
    { gebruikerId: 53, werkjaar: 2025, takId: 4, betaald: true },  // Lore Van den Broeck
    { gebruikerId: 55, werkjaar: 2025, takId: 2, betaald: true },  // Lies Van den Broeck
    { gebruikerId: 59, werkjaar: 2025, takId: 2, betaald: true },  // Ilse De Backer
    { gebruikerId: 62, werkjaar: 2025, takId: 3, betaald: true },  // Stan Verhaeghe
    { gebruikerId: 67, werkjaar: 2025, takId: 3, betaald: true },  // Milan De Clercq
    { gebruikerId: 72, werkjaar: 2025, takId: 5, betaald: true },  // Anna Dewaele
    { gebruikerId: 76, werkjaar: 2025, takId: 5, betaald: true },  // Jana Vermeersch
    { gebruikerId: 77, werkjaar: 2025, takId: 2, betaald: true },  // Liv Vermeersch
    { gebruikerId: 83, werkjaar: 2025, takId: 4, betaald: true },  // Mats Mertens
    { gebruikerId: 84, werkjaar: 2025, takId: 4, betaald: true },  // Bent Mertens
    { gebruikerId: 11, werkjaar: 2026, takId: 2, betaald: true, isTakleiding: true },  // Jonas Vermeulen – takleiding
    { gebruikerId: 12, werkjaar: 2026, takId: 4, betaald: true, isTakleiding: true },  // Sara Dubois – takleiding
    { gebruikerId: 13, werkjaar: 2026, takId: 5, betaald: true, isEenheidsleiding: true },  // Pieter Hendrickx – eenheidsleiding
    { gebruikerId: 88, werkjaar: 2026, takId: 1, betaald: true, isTakleiding: true },  // Ruben De Wilde – takleiding
    { gebruikerId: 89, werkjaar: 2026, takId: 1, betaald: true },  // Laura Van Hecke
    { gebruikerId: 90, werkjaar: 2026, takId: 1, betaald: true },  // Thomas Vercruysse
    { gebruikerId: 91, werkjaar: 2026, takId: 2, betaald: true },  // Charlotte Moerman
    { gebruikerId: 92, werkjaar: 2026, takId: 2, betaald: true },  // Arne Cools
    { gebruikerId: 93, werkjaar: 2026, takId: 3, betaald: true, isTakleiding: true },  // Julie Van Acker – takleiding
    { gebruikerId: 94, werkjaar: 2026, takId: 3, betaald: true },  // Kasper Bogaert
    { gebruikerId: 95, werkjaar: 2026, takId: 3, betaald: true },  // Silke De Vos
    { gebruikerId: 96, werkjaar: 2026, takId: 4, betaald: true },  // Maarten Lievens
    { gebruikerId: 97, werkjaar: 2026, takId: 4, betaald: true },  // Eline Roels
    { gebruikerId: 98, werkjaar: 2026, takId: 5, betaald: true, isTakleiding: true },  // Brent Van Damme – takleiding
    { gebruikerId: 99, werkjaar: 2026, takId: 5, betaald: true },  // Lotte Schepens
    { gebruikerId: 100, werkjaar: 2026, takId: 6, betaald: true, isTakleiding: true },  // Yannick Bracke – takleiding
    { gebruikerId: 101, werkjaar: 2026, takId: 6, betaald: true },  // Merel Dhondt
    { gebruikerId: 102, werkjaar: 2026, takId: 6, betaald: true, isEenheidsleiding: true },  // Sander Ghijs – eenheidsleiding
    { gebruikerId: 88, werkjaar: 2025, takId: 1, betaald: true },  // Ruben De Wilde
    { gebruikerId: 90, werkjaar: 2025, takId: 1, betaald: true },  // Thomas Vercruysse
    { gebruikerId: 91, werkjaar: 2025, takId: 2, betaald: true },  // Charlotte Moerman
    { gebruikerId: 92, werkjaar: 2025, takId: 2, betaald: true },  // Arne Cools
    { gebruikerId: 93, werkjaar: 2025, takId: 3, betaald: true },  // Julie Van Acker
    { gebruikerId: 94, werkjaar: 2025, takId: 3, betaald: true },  // Kasper Bogaert
    { gebruikerId: 96, werkjaar: 2025, takId: 4, betaald: true },  // Maarten Lievens
    { gebruikerId: 98, werkjaar: 2025, takId: 5, betaald: true },  // Brent Van Damme
    { gebruikerId: 99, werkjaar: 2025, takId: 5, betaald: true },  // Lotte Schepens
    { gebruikerId: 100, werkjaar: 2025, takId: 6, betaald: true },  // Yannick Bracke
  ]);
  console.log('Lidmaatschappen seeded successfully\n');
}


async function seedLidOuder() {
  console.log('Seeding lid ouder...');
  await db.insert(schema.lidOuder).values([
    { lidGebruikerId: 1, ouderGebruikerId: 8, relatie: 'Moeder', isNoodcontact: true },  // Noor ← Sofie Janssens
    { lidGebruikerId: 14, ouderGebruikerId: 8, relatie: 'Moeder', isNoodcontact: true },  // Nina ← Sofie Janssens
    { lidGebruikerId: 15, ouderGebruikerId: 8, relatie: 'Moeder', isNoodcontact: true },  // Siebe ← Sofie Janssens
    { lidGebruikerId: 3, ouderGebruikerId: 9, relatie: 'Vader', isNoodcontact: true },  // Emma ← Tom Peeters
    { lidGebruikerId: 17, ouderGebruikerId: 9, relatie: 'Vader', isNoodcontact: true },  // Ella ← Tom Peeters
    { lidGebruikerId: 4, ouderGebruikerId: 10, relatie: 'Moeder', isNoodcontact: true },  // Finn ← An De Smet
    { lidGebruikerId: 19, ouderGebruikerId: 10, relatie: 'Moeder', isNoodcontact: true },  // Lander ← An De Smet
    { lidGebruikerId: 1, ouderGebruikerId: 16, relatie: 'Vader', isNoodcontact: false },  // Noor ← Bart Janssens
    { lidGebruikerId: 14, ouderGebruikerId: 16, relatie: 'Vader', isNoodcontact: false },  // Nina ← Bart Janssens
    { lidGebruikerId: 15, ouderGebruikerId: 16, relatie: 'Vader', isNoodcontact: false },  // Siebe ← Bart Janssens
    { lidGebruikerId: 3, ouderGebruikerId: 18, relatie: 'Moeder', isNoodcontact: true },  // Emma ← Els Peeters
    { lidGebruikerId: 17, ouderGebruikerId: 18, relatie: 'Moeder', isNoodcontact: true },  // Ella ← Els Peeters
    { lidGebruikerId: 2, ouderGebruikerId: 20, relatie: 'Moeder', isNoodcontact: true },  // Lucas ← Veerle Maes
    { lidGebruikerId: 5, ouderGebruikerId: 21, relatie: 'Moeder', isNoodcontact: true },  // Lotte ← Lieve Claes
    { lidGebruikerId: 6, ouderGebruikerId: 22, relatie: 'Moeder', isNoodcontact: true },  // Arthur ← Ellen Goossens
    { lidGebruikerId: 6, ouderGebruikerId: 23, relatie: 'Vader', isNoodcontact: false },  // Arthur ← Kristof Goossens
    { lidGebruikerId: 7, ouderGebruikerId: 24, relatie: 'Moeder', isNoodcontact: true },  // Mila ← Ellen Wouters
    { lidGebruikerId: 7, ouderGebruikerId: 25, relatie: 'Vader', isNoodcontact: false },  // Mila ← Joris Wouters
    { lidGebruikerId: 26, ouderGebruikerId: 29, relatie: 'Moeder', isNoodcontact: true },  // Kobe ← Els Michiels
    { lidGebruikerId: 27, ouderGebruikerId: 29, relatie: 'Moeder', isNoodcontact: true },  // Rune ← Els Michiels
    { lidGebruikerId: 28, ouderGebruikerId: 29, relatie: 'Moeder', isNoodcontact: true },  // Marie ← Els Michiels
    { lidGebruikerId: 26, ouderGebruikerId: 30, relatie: 'Vader', isNoodcontact: false },  // Kobe ← Tim Michiels
    { lidGebruikerId: 27, ouderGebruikerId: 30, relatie: 'Vader', isNoodcontact: false },  // Rune ← Tim Michiels
    { lidGebruikerId: 28, ouderGebruikerId: 30, relatie: 'Vader', isNoodcontact: true },  // Marie ← Tim Michiels
    { lidGebruikerId: 31, ouderGebruikerId: 34, relatie: 'Moeder', isNoodcontact: true },  // Fien ← Els Lambrecht
    { lidGebruikerId: 32, ouderGebruikerId: 34, relatie: 'Moeder', isNoodcontact: true },  // Nora ← Els Lambrecht
    { lidGebruikerId: 33, ouderGebruikerId: 34, relatie: 'Moeder', isNoodcontact: true },  // Cas ← Els Lambrecht
    { lidGebruikerId: 31, ouderGebruikerId: 35, relatie: 'Vader', isNoodcontact: true },  // Fien ← Dries Lambrecht
    { lidGebruikerId: 32, ouderGebruikerId: 35, relatie: 'Vader', isNoodcontact: false },  // Nora ← Dries Lambrecht
    { lidGebruikerId: 33, ouderGebruikerId: 35, relatie: 'Vader', isNoodcontact: false },  // Cas ← Dries Lambrecht
    { lidGebruikerId: 36, ouderGebruikerId: 38, relatie: 'Moeder', isNoodcontact: true },  // Axelle ← An Vandamme
    { lidGebruikerId: 37, ouderGebruikerId: 38, relatie: 'Moeder', isNoodcontact: true },  // Juul ← An Vandamme
    { lidGebruikerId: 39, ouderGebruikerId: 41, relatie: 'Voogd', isNoodcontact: true },  // Thor ← Griet Verstraete
    { lidGebruikerId: 40, ouderGebruikerId: 41, relatie: 'Voogd', isNoodcontact: true },  // Tibo ← Griet Verstraete
    { lidGebruikerId: 42, ouderGebruikerId: 43, relatie: 'Moeder', isNoodcontact: true },  // Vic ← Annelies Hermans
    { lidGebruikerId: 42, ouderGebruikerId: 44, relatie: 'Vader', isNoodcontact: true },  // Vic ← Kristof Hermans
    { lidGebruikerId: 45, ouderGebruikerId: 47, relatie: 'Moeder', isNoodcontact: true },  // Jasper ← An Martens
    { lidGebruikerId: 46, ouderGebruikerId: 47, relatie: 'Moeder', isNoodcontact: true },  // Hailey ← An Martens
    { lidGebruikerId: 45, ouderGebruikerId: 48, relatie: 'Vader', isNoodcontact: false },  // Jasper ← Koen Martens
    { lidGebruikerId: 46, ouderGebruikerId: 48, relatie: 'Vader', isNoodcontact: false },  // Hailey ← Koen Martens
    { lidGebruikerId: 49, ouderGebruikerId: 51, relatie: 'Moeder', isNoodcontact: true },  // Wout ← Inge Pauwels
    { lidGebruikerId: 50, ouderGebruikerId: 51, relatie: 'Moeder', isNoodcontact: true },  // Eva ← Inge Pauwels
    { lidGebruikerId: 49, ouderGebruikerId: 52, relatie: 'Vader', isNoodcontact: false },  // Wout ← Bart Pauwels
    { lidGebruikerId: 50, ouderGebruikerId: 52, relatie: 'Vader', isNoodcontact: false },  // Eva ← Bart Pauwels
    { lidGebruikerId: 53, ouderGebruikerId: 56, relatie: 'Moeder', isNoodcontact: true },  // Lore ← Katrien Van den Broeck
    { lidGebruikerId: 54, ouderGebruikerId: 56, relatie: 'Moeder', isNoodcontact: true },  // Yara ← Katrien Van den Broeck
    { lidGebruikerId: 55, ouderGebruikerId: 56, relatie: 'Moeder', isNoodcontact: true },  // Lies ← Katrien Van den Broeck
    { lidGebruikerId: 53, ouderGebruikerId: 57, relatie: 'Vader', isNoodcontact: false },  // Lore ← Koen Van den Broeck
    { lidGebruikerId: 54, ouderGebruikerId: 57, relatie: 'Vader', isNoodcontact: true },  // Yara ← Koen Van den Broeck
    { lidGebruikerId: 55, ouderGebruikerId: 57, relatie: 'Vader', isNoodcontact: false },  // Lies ← Koen Van den Broeck
    { lidGebruikerId: 58, ouderGebruikerId: 60, relatie: 'Moeder', isNoodcontact: true },  // Febe ← Katrien De Backer
    { lidGebruikerId: 59, ouderGebruikerId: 60, relatie: 'Moeder', isNoodcontact: true },  // Ilse ← Katrien De Backer
    { lidGebruikerId: 58, ouderGebruikerId: 61, relatie: 'Vader', isNoodcontact: false },  // Febe ← Jan De Backer
    { lidGebruikerId: 59, ouderGebruikerId: 61, relatie: 'Vader', isNoodcontact: false },  // Ilse ← Jan De Backer
    { lidGebruikerId: 62, ouderGebruikerId: 64, relatie: 'Moeder', isNoodcontact: true },  // Stan ← Inge Verhaeghe
    { lidGebruikerId: 63, ouderGebruikerId: 64, relatie: 'Moeder', isNoodcontact: true },  // Amber ← Inge Verhaeghe
    { lidGebruikerId: 62, ouderGebruikerId: 65, relatie: 'Vader', isNoodcontact: false },  // Stan ← Steven Verhaeghe
    { lidGebruikerId: 63, ouderGebruikerId: 65, relatie: 'Vader', isNoodcontact: true },  // Amber ← Steven Verhaeghe
    { lidGebruikerId: 66, ouderGebruikerId: 68, relatie: 'Moeder', isNoodcontact: true },  // Pauline ← Inge De Clercq
    { lidGebruikerId: 67, ouderGebruikerId: 68, relatie: 'Moeder', isNoodcontact: true },  // Milan ← Inge De Clercq
    { lidGebruikerId: 69, ouderGebruikerId: 70, relatie: 'Moeder', isNoodcontact: true },  // Lars ← Annelies Desmet
    { lidGebruikerId: 69, ouderGebruikerId: 71, relatie: 'Vader', isNoodcontact: false },  // Lars ← Joris Desmet
    { lidGebruikerId: 72, ouderGebruikerId: 73, relatie: 'Moeder', isNoodcontact: true },  // Anna ← Sarah Dewaele
    { lidGebruikerId: 72, ouderGebruikerId: 74, relatie: 'Vader', isNoodcontact: true },  // Anna ← Joris Dewaele
    { lidGebruikerId: 75, ouderGebruikerId: 78, relatie: 'Moeder', isNoodcontact: true },  // Ferre ← An Vermeersch
    { lidGebruikerId: 76, ouderGebruikerId: 78, relatie: 'Moeder', isNoodcontact: true },  // Jana ← An Vermeersch
    { lidGebruikerId: 77, ouderGebruikerId: 78, relatie: 'Moeder', isNoodcontact: true },  // Liv ← An Vermeersch
    { lidGebruikerId: 79, ouderGebruikerId: 81, relatie: 'Moeder', isNoodcontact: true },  // Hanne ← Griet Smet
    { lidGebruikerId: 80, ouderGebruikerId: 81, relatie: 'Moeder', isNoodcontact: true },  // Toon ← Griet Smet
    { lidGebruikerId: 79, ouderGebruikerId: 82, relatie: 'Vader', isNoodcontact: false },  // Hanne ← Tim Smet
    { lidGebruikerId: 80, ouderGebruikerId: 82, relatie: 'Vader', isNoodcontact: true },  // Toon ← Tim Smet
    { lidGebruikerId: 83, ouderGebruikerId: 86, relatie: 'Moeder', isNoodcontact: true },  // Mats ← Ellen Mertens
    { lidGebruikerId: 84, ouderGebruikerId: 86, relatie: 'Moeder', isNoodcontact: true },  // Bent ← Ellen Mertens
    { lidGebruikerId: 85, ouderGebruikerId: 86, relatie: 'Moeder', isNoodcontact: true },  // Lisa ← Ellen Mertens
    { lidGebruikerId: 83, ouderGebruikerId: 87, relatie: 'Vader', isNoodcontact: true },  // Mats ← Joris Mertens
    { lidGebruikerId: 84, ouderGebruikerId: 87, relatie: 'Vader', isNoodcontact: false },  // Bent ← Joris Mertens
    { lidGebruikerId: 85, ouderGebruikerId: 87, relatie: 'Vader', isNoodcontact: false },  // Lisa ← Joris Mertens
  ]);
  console.log('Lid ouder seeded successfully\n');
}

async function seedTotems() {
  console.log('Seeding totems...');
  await db.insert(schema.totems).values([
    { gebruikerId: 11, totem: 'Bever', voortotem: 'Speelse', plaats: 'Kamp Lommel', jaar: 2022 },  // Jonas Vermeulen
    { gebruikerId: 13, totem: 'Vos', voortotem: 'Slimme', plaats: 'Kamp Bertrix', jaar: 2021 },  // Pieter Hendrickx
    { gebruikerId: 88, totem: 'Kraai', voortotem: 'Behulpzame', plaats: 'Kamp Mol', jaar: 2022 },  // Ruben De Wilde
    { gebruikerId: 89, totem: 'Marter', voortotem: 'Trouwe', plaats: 'Kamp Durbuy', jaar: 2025 },  // Laura Van Hecke
    { gebruikerId: 91, totem: 'Gems', voortotem: 'Vrolijke', plaats: 'Kamp Mol', jaar: 2026 },  // Charlotte Moerman
    { gebruikerId: 95, totem: 'Hert', voortotem: 'Fiere', plaats: 'Kamp Bertrix', jaar: 2023 },  // Silke De Vos
    { gebruikerId: 96, totem: 'Uil', voortotem: 'Spontane', plaats: 'Kamp Bertrix', jaar: 2022 },  // Maarten Lievens
    { gebruikerId: 97, totem: 'Wolf', voortotem: 'Zorgzame', plaats: 'Kamp Vielsalm', jaar: 2025 },  // Eline Roels
    { gebruikerId: 98, totem: 'Reiger', voortotem: 'Dromerige', plaats: 'Kamp Hamont', jaar: 2023 },  // Brent Van Damme
    { gebruikerId: 99, totem: 'Valk', voortotem: 'Zorgzame', plaats: 'Kamp Bertrix', jaar: 2018 },  // Lotte Schepens
    { gebruikerId: 100, totem: 'Das', voortotem: 'Nieuwsgierige', plaats: 'Kamp Vielsalm', jaar: 2024 },  // Yannick Bracke
    { gebruikerId: 102, totem: 'Ree', voortotem: 'Rustige', plaats: 'Kamp Houffalize', jaar: 2020 },  // Sander Ghijs
    { gebruikerId: 31, totem: 'Ijsvogel', voortotem: 'Rustige', plaats: 'Kamp Durbuy', jaar: 2026 },  // Fien Lambrecht
    { gebruikerId: 36, totem: 'Lepelaar', voortotem: 'Guitige', plaats: 'Kamp Durbuy', jaar: 2026 },  // Axelle Vandamme
    { gebruikerId: 49, totem: 'Egel', voortotem: 'Wijze', plaats: 'Kamp Durbuy', jaar: 2026 },  // Wout Pauwels
    { gebruikerId: 58, totem: 'Lynx', voortotem: 'Wijze', plaats: 'Kamp Durbuy', jaar: 2026 },  // Febe De Backer
    { gebruikerId: 72, totem: 'Buizerd', voortotem: 'Dappere', plaats: 'Kamp Durbuy', jaar: 2026 },  // Anna Dewaele
    { gebruikerId: 75, totem: 'Otter', voortotem: 'Rustige', plaats: 'Kamp Durbuy', jaar: 2026 },  // Ferre Vermeersch
    { gebruikerId: 76, totem: 'Eekhoorn', voortotem: 'Zorgzame', plaats: 'Kamp Durbuy', jaar: 2026 },  // Jana Vermeersch
  ]);
  console.log('Totems seeded successfully\n');
}

async function seedMedischeFiches() {
  console.log('Seeding medische fiches...');
  await db.insert(schema.medischeFiches).values([
    { id: 1, gebruikerId: 3, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', inentingTetanusDatum: new Date('2019-06-15'), bloedgroep: 'A+', allergieen: 'Hooikoorts', dieet: 'Geen Restricties' },
    { id: 2, gebruikerId: 4, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'O+', allergieen: 'Noten', dieet: 'Vegetarisch', aandachtpuntenSlapen: 'Slaapt graag met licht aan' },
    { id: 3, gebruikerId: 6, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', actueleZiektes: 'Astma', dieet: 'Geen Restricties', opmerkingenActiviteiten: 'Geen intensieve loopspelen zonder pauze' },
    { id: 4, gebruikerId: 1, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'A-', dieet: 'Halal', inentingTetanusDatum: new Date('2018-07-19') },
    { id: 5, gebruikerId: 2, naamHuisarts: 'Dr. Van Laere', telefoonnummerHuisarts: '09 345 67 89', bloedgroep: 'O+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2021-08-11'), allergieen: 'Gluten', actueleZiektes: 'Epilepsie' },
    { id: 6, gebruikerId: 5, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'O+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2018-06-08') },
    { id: 7, gebruikerId: 7, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'O-', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2021-03-16') },
    { id: 8, gebruikerId: 14, naamHuisarts: 'Dr. Baetens', telefoonnummerHuisarts: '09 567 89 01', bloedgroep: 'AB+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2020-05-04'), actueleZiektes: 'Astma' },
    { id: 9, gebruikerId: 15, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'A+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2019-12-25'), allergieen: 'Lactose' },
    { id: 10, gebruikerId: 17, naamHuisarts: 'Dr. Baetens', telefoonnummerHuisarts: '09 567 89 01', bloedgroep: 'O+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2019-09-21'), allergieen: 'Gluten' },
    { id: 11, gebruikerId: 19, naamHuisarts: 'Dr. Van Laere', telefoonnummerHuisarts: '09 345 67 89', bloedgroep: 'AB+', dieet: 'Vegan', inentingTetanusDatum: new Date('2020-07-06'), allergieen: 'Wespensteken', actueleZiektes: 'Astma' },
    { id: 12, gebruikerId: 27, naamHuisarts: 'Dr. Baetens', telefoonnummerHuisarts: '09 567 89 01', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2021-02-09'), allergieen: 'Huisstofmijt' },
    { id: 13, gebruikerId: 31, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2025-04-12'), allergieen: 'Lactose', actueleZiektes: 'Diabetes type 1' },
    { id: 14, gebruikerId: 36, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'A+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2024-08-18'), allergieen: 'Pollen', actueleZiektes: 'ADHD' },
    { id: 15, gebruikerId: 37, naamHuisarts: 'Dr. Van Laere', telefoonnummerHuisarts: '09 345 67 89', bloedgroep: 'A-', dieet: 'Vegetarisch', inentingTetanusDatum: new Date('2021-05-22'), allergieen: 'Gluten', actueleZiektes: 'ADHD' },
    { id: 16, gebruikerId: 40, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2022-04-04'), allergieen: 'Pollen', actueleZiektes: 'Diabetes type 1', aandachtpuntenSlapen: 'Heimwee de eerste nacht' },
    { id: 17, gebruikerId: 45, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'B+', dieet: 'Halal', inentingTetanusDatum: new Date('2022-02-27'), allergieen: 'Pollen', actueleZiektes: 'Astma' },
    { id: 18, gebruikerId: 49, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'A+', dieet: 'Halal', inentingTetanusDatum: new Date('2022-12-05'), allergieen: 'Huisstofmijt' },
    { id: 19, gebruikerId: 50, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2018-05-28'), allergieen: 'Huisstofmijt' },
    { id: 20, gebruikerId: 55, naamHuisarts: 'Dr. Baetens', telefoonnummerHuisarts: '09 567 89 01', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2021-02-18'), allergieen: 'Noten' },
    { id: 21, gebruikerId: 58, naamHuisarts: 'Dr. Baetens', telefoonnummerHuisarts: '09 567 89 01', bloedgroep: 'O+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2018-10-24') },
    { id: 22, gebruikerId: 59, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'O-', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2020-01-14'), allergieen: 'Huisstofmijt', actueleZiektes: 'ADHD' },
    { id: 23, gebruikerId: 62, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'A+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2022-11-19'), allergieen: 'Pollen', actueleZiektes: 'Epilepsie', aandachtpuntenSlapen: 'Bedplasser, discreet wekken' },
    { id: 24, gebruikerId: 67, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2025-02-15'), allergieen: 'Lactose', actueleZiektes: 'Epilepsie' },
    { id: 25, gebruikerId: 69, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'O-', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2024-12-11'), allergieen: 'Lactose', aandachtpuntenSlapen: 'Heimwee de eerste nacht' },
    { id: 26, gebruikerId: 79, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'A-', dieet: 'Vegan', inentingTetanusDatum: new Date('2025-05-06'), allergieen: 'Noten', actueleZiektes: 'ADHD' },
    { id: 27, gebruikerId: 80, naamHuisarts: 'Dr. Willems', telefoonnummerHuisarts: '09 123 45 67', bloedgroep: 'A-', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2024-12-16'), allergieen: 'Lactose', actueleZiektes: 'Epilepsie' },
    { id: 28, gebruikerId: 83, naamHuisarts: 'Dr. Van Laere', telefoonnummerHuisarts: '09 345 67 89', bloedgroep: 'B+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2019-07-28'), allergieen: 'Wespensteken' },
    { id: 29, gebruikerId: 84, naamHuisarts: 'Dr. Martens', telefoonnummerHuisarts: '09 234 56 78', bloedgroep: 'O-', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2025-11-15') },
    { id: 30, gebruikerId: 85, naamHuisarts: 'Dr. Coene', telefoonnummerHuisarts: '09 456 78 90', bloedgroep: 'A+', dieet: 'Geen Restricties', inentingTetanusDatum: new Date('2021-12-06'), allergieen: 'Lactose' },
  ]);
  console.log('Medische fiches seeded successfully\n');
}

async function seedMedicaties() {
  console.log('Seeding medicaties...');
  await db.insert(schema.medicaties).values([
    { id: 1, medischeFicheId: 3, naamMedicatie: 'Ventolin', dosering: '1 puffje', tijdstip: 'Bij benauwdheid', opmerking: 'Steeds meenemen op kamp' },
    { id: 2, medischeFicheId: 2, naamMedicatie: 'Epipen', dosering: '0,3 mg', tijdstip: 'Bij ernstige allergische reactie', opmerking: 'Bewaren bij de leiding' },
    { id: 3, medischeFicheId: 5, naamMedicatie: 'Depakine', dosering: '300 mg', tijdstip: '\'s ochtends en \'s avonds', opmerking: 'Bij aanval: 112 bellen' },
    { id: 4, medischeFicheId: 8, naamMedicatie: 'Ventolin', dosering: '2 puffjes', tijdstip: 'Bij benauwdheid', opmerking: null },
    { id: 5, medischeFicheId: 8, naamMedicatie: 'Flixotide', dosering: '1 puffje', tijdstip: '\'s ochtends en \'s avonds', opmerking: null },
    { id: 6, medischeFicheId: 11, naamMedicatie: 'Ventolin', dosering: '2 puffjes', tijdstip: 'Bij benauwdheid', opmerking: null },
    { id: 7, medischeFicheId: 11, naamMedicatie: 'Flixotide', dosering: '1 puffje', tijdstip: '\'s ochtends en \'s avonds', opmerking: null },
    { id: 8, medischeFicheId: 13, naamMedicatie: 'Insuline (NovoRapid)', dosering: 'Volgens schema', tijdstip: 'Voor elke maaltijd', opmerking: 'Ouders geven schema mee' },
    { id: 9, medischeFicheId: 14, naamMedicatie: 'Rilatine', dosering: '10 mg', tijdstip: '\'s ochtends bij het ontbijt', opmerking: null },
    { id: 10, medischeFicheId: 14, naamMedicatie: 'Cetirizine', dosering: '5 mg', tijdstip: '\'s avonds', opmerking: null },
    { id: 11, medischeFicheId: 15, naamMedicatie: 'Rilatine', dosering: '10 mg', tijdstip: '\'s ochtends bij het ontbijt', opmerking: null },
    { id: 12, medischeFicheId: 16, naamMedicatie: 'Insuline (NovoRapid)', dosering: 'Volgens schema', tijdstip: 'Voor elke maaltijd', opmerking: 'Ouders geven schema mee' },
    { id: 13, medischeFicheId: 16, naamMedicatie: 'Cetirizine', dosering: '5 mg', tijdstip: '\'s avonds', opmerking: null },
    { id: 14, medischeFicheId: 17, naamMedicatie: 'Ventolin', dosering: '2 puffjes', tijdstip: 'Bij benauwdheid', opmerking: null },
    { id: 15, medischeFicheId: 17, naamMedicatie: 'Flixotide', dosering: '1 puffje', tijdstip: '\'s ochtends en \'s avonds', opmerking: null },
    { id: 16, medischeFicheId: 17, naamMedicatie: 'Cetirizine', dosering: '5 mg', tijdstip: '\'s avonds', opmerking: null },
    { id: 17, medischeFicheId: 20, naamMedicatie: 'Epipen', dosering: '0,3 mg', tijdstip: 'Bij ernstige allergische reactie', opmerking: 'Bewaren bij de leiding' },
    { id: 18, medischeFicheId: 22, naamMedicatie: 'Rilatine', dosering: '10 mg', tijdstip: '\'s ochtends bij het ontbijt', opmerking: null },
    { id: 19, medischeFicheId: 23, naamMedicatie: 'Depakine', dosering: '300 mg', tijdstip: '\'s ochtends en \'s avonds', opmerking: 'Bij aanval: 112 bellen' },
    { id: 20, medischeFicheId: 23, naamMedicatie: 'Cetirizine', dosering: '5 mg', tijdstip: '\'s avonds', opmerking: null },
    { id: 21, medischeFicheId: 24, naamMedicatie: 'Depakine', dosering: '300 mg', tijdstip: '\'s ochtends en \'s avonds', opmerking: 'Bij aanval: 112 bellen' },
    { id: 22, medischeFicheId: 26, naamMedicatie: 'Rilatine', dosering: '10 mg', tijdstip: '\'s ochtends bij het ontbijt', opmerking: null },
    { id: 23, medischeFicheId: 26, naamMedicatie: 'Epipen', dosering: '0,3 mg', tijdstip: 'Bij ernstige allergische reactie', opmerking: 'Bewaren bij de leiding' },
    { id: 24, medischeFicheId: 27, naamMedicatie: 'Depakine', dosering: '300 mg', tijdstip: '\'s ochtends en \'s avonds', opmerking: 'Bij aanval: 112 bellen' },
  ]);
    console.log('Medicaties seeded successfully\n');
}

async function seedEvents() {
  console.log('Seeding events...');
  await db.insert(schema.events).values([
    {
      id: 1,
      title: 'BBQ-festijn',
      description: 'Inschrijven kan tot zondag 27 september.',
      eventDate: '2026-10-03',
      imageUrl: '/images/events/BBQ-festijn oktober 2026.png',
      externalUrl: 'https://eetfestijn.tortels.be',
    },
    {
      id: 2,
      title: 'Testevenement',
      description: 'Dit evenement heeft geen externe link.',
      eventDate: '2026-12-20',
      imageUrl: '/images/events/BBQ-festijn oktober 2026.png',
      externalUrl: null,
    },
  ]);
}


async function main() {
  console.log('Starting seeding database...');

  await db.execute(sql`SELECT 1`);
  console.log('✅ Database connection OK\n');

  await resetDatabase();
  await seedTakken();
  await seedGebruikers();
  await seedLidmaatschappen();
  await seedLidOuder();
  await seedTotems();
  await seedMedischeFiches();
  await seedMedicaties();
  await seedEvents();

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
