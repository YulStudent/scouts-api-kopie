import { int, mysqlTable, tinyint, varchar } from 'drizzle-orm/mysql-core';

export const takken = mysqlTable('takken', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  takNaam: varchar('tak_naam', { length: 255 })
    .notNull()
    .unique('idx_tak_naam_unique'),
  minimumLeeftijd: tinyint('minimum_leeftijd', { unsigned: true }).notNull(),
  maximumLeeftijd: tinyint('maximum_leeftijd', { unsigned: true }).notNull(),
  maximumAantalLedenGeboortejaar: int('maximum_aantal_leden_geboortejaar', {
    unsigned: true,
  }).notNull(),
});