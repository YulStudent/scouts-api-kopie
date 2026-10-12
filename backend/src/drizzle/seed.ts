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


  //TODO tabellen aanmaken 
  //await db.delete(schema.XXX);
  console.log('Database reset completed\n');
}

async function seedData() {
  console.log('Seeding NAAMTABLE...');

  // await db.insert(schema.NAAMTABLE).values([ ... ]);

  console.log('Places seeded successfully\n');
}

async function main() {
  console.log('Starting seeding database...');

  //Test
  await db.execute(sql`SELECT 1`);
  console.log('✅ Database connection OK\n');

  await resetDatabase();
  await seedData();

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
