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
  await db.delete(schema.patrouilles);
  await db.delete(schema.takken);
  console.log('Database reset completed\n');
}

async function seedTakken() {
  console.log('Seeding takken...');

  await db.insert(schema.takken).values([ 
    {id:1, takNaam: 'Bevers', minimumLeeftijd: 6, maximumLeeftijd: 8, maximumAantalLedenGeboortejaar: 25},
    {id:2, takNaam: 'Welpen', minimumLeeftijd: 8, maximumLeeftijd: 10, maximumAantalLedenGeboortejaar: 25},
    {id:3, takNaam: 'Wolven', minimumLeeftijd: 10, maximumLeeftijd: 12, maximumAantalLedenGeboortejaar: 20},
    {id:4, takNaam: 'Jvg', minimumLeeftijd: 12, maximumLeeftijd: 14, maximumAantalLedenGeboortejaar: 20},
    {id:5, takNaam: 'Vg', minimumLeeftijd: 14, maximumLeeftijd: 16, maximumAantalLedenGeboortejaar: 20},
    {id:6, takNaam: 'Seniors', minimumLeeftijd: 16, maximumLeeftijd: 17, maximumAantalLedenGeboortejaar: 20},
  ]);

  console.log('Places seeded successfully\n');
}

async function seedPatrouilles() {
  console.log('Seeding takken...');

  await db.insert(schema.patrouilles).values([ 
    {patrouilleNaam: 'Wit', takId: 2, kreet:'fit'},
    {patrouilleNaam: 'Rood', takId: 2, kreet:'groot'},
    {patrouilleNaam: 'Groen', takId: 2, kreet:'koen'},
    {patrouilleNaam: 'Blauw', takId: 2, kreet:'trouw'},
    {patrouilleNaam: 'Geel', takId: 2, kreet:'veel'},
    {patrouilleNaam: 'Dingo', takId: 3, kreet:'Snuffelt'},
    {patrouilleNaam: 'Pinguin', takId: 4, kreet:'waggelt'},
    {patrouilleNaam: 'Muizen', takId: 5, kreet:'strontjes'},
  ]);

  console.log('Places seeded successfully\n');
}

async function main() {
  console.log('Starting seeding database...');

  await db.execute(sql`SELECT 1`);
  console.log('✅ Database connection OK\n');

  await resetDatabase();
  await seedTakken();
  await seedPatrouilles();

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
