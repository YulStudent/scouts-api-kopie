import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  date,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  smallint,
  tinyint,
  varchar,
} from 'drizzle-orm/mysql-core';

const id = () => int('id', { unsigned: true }).primaryKey().autoincrement();
const fk = (name: string) => int(name, { unsigned: true });

export const GEBRUIKERS_TYPES = ['Lid', 'Ouder', 'Leiding'] as const;
export type GebruikersType = (typeof GEBRUIKERS_TYPES)[number];

export const takken = mysqlTable('takken', {
  id: id(),
  takNaam: varchar('tak_naam', { length: 255 }).notNull().unique('idx_tak_naam_unique'),
  minimumLeeftijd: tinyint('minimum_leeftijd', { unsigned: true }).notNull(),
  maximumLeeftijd: tinyint('maximum_leeftijd', { unsigned: true }).notNull(),
  maximumAantalLedenGeboortejaar: int('maximum_aantal_leden_geboortejaar', {unsigned: true,}).notNull(),
});

export const gebruikers = mysqlTable('gebruikers', {
  id: id(),
  voornaam: varchar('voornaam', { length: 255 }).notNull(),
  achternaam: varchar('achternaam', { length: 255 }).notNull(),
  straatnaam: varchar('straatnaam', { length: 511 }).notNull(),
  huisnummer: varchar('huisnummer', { length: 255 }).notNull(),
  postcode: varchar('postcode', { length: 255 }).notNull(),
  gemeente: varchar('gemeente', { length: 255 }).notNull(),
  gebruikersType: mysqlEnum('gebruiker_type', GEBRUIKERS_TYPES).notNull(),
  email: varchar('emailadres', { length: 255 }),
  telefoonnummer: varchar('telefoonnummer', { length: 255 }),
  rijksregisternummer: varchar('rijksregisternummer', { length: 255 }).unique('idx_rrn_unique'),
  heeftToestemmingFotos: boolean('heeft_toestemming_fotos'),
  startdatumLeiding: date('startdatum_leiding', { mode: 'date' }),
  geboortedatum: date('geboortedatum', { mode: 'date' }),
  datumAccountcreatie: datetime('datum_accountcreatie').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 👇 nieuw
export const totems = mysqlTable('totems', {
  id: id(),
  gebruikerId: fk('gebruiker_id').notNull().unique('idx_totem_gebruiker_unique').references(() => gebruikers.id, { onDelete: 'cascade' }),
  totem: varchar('totem', { length: 255 }).notNull(),
  voortotem: varchar('voortotem', { length: 255 }),
  plaats: varchar('plaats', { length: 255 }).notNull(),
  jaar: smallint('jaar', { unsigned: true }).notNull(),
});

export const lidOuder = mysqlTable('lid_ouder',{
    lidGebruikerId: fk('lid_gebruiker_id').notNull().references(() => gebruikers.id, { onDelete: 'cascade' }),
    ouderGebruikerId: fk('ouder_gebruiker_id').notNull().references(() => gebruikers.id, { onDelete: 'cascade' }),
    relatie: varchar('relatie', { length: 255 }).notNull(),
    isNoodcontact: boolean('is_noodcontact').notNull().default(false),
  },
  (table) => [primaryKey({ columns: [table.lidGebruikerId, table.ouderGebruikerId] })], // 👈 PK
);

export const medischeFiches = mysqlTable('medische_fiches', {
  id: id(),
  gebruikerId: fk('gebruiker_id').notNull().unique('idx_medische_fiche_gebruiker_unique').references(() => gebruikers.id, { onDelete: 'cascade' }),
  naamHuisarts: varchar('naam_huisarts', { length: 255 }).notNull(),
  telefoonnummerHuisarts: varchar('telefoonnummer_huisarts', { length: 255 }).notNull(),
  adresHuisarts: varchar('adres_huisarts', { length: 511 }),
  inentingTetanusDatum: date('inenting_tetanus_datum', { mode: 'date' }),
  bloedgroep: mysqlEnum('bloedgroep', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  allergieen: varchar('allergieen', { length: 255 }),
  actueleZiektes: varchar('actuele_ziektes', { length: 255 }), // 👈 kolom in kleine letters
  beperkingen: varchar('beperkingen', { length: 255 }),
  dieet: mysqlEnum('dieet', ['Vegetarisch', 'Vegan', 'Halal', 'Koosjer', 'Geen Restricties']).notNull(),
  aandachtpuntenSlapen: varchar('aandachtpunten_slapen', { length: 255 }),
  aandachtpuntenAlgemeen: varchar('aandachtpunten_algemeen', { length: 255 }),
  opmerkingenActiviteiten: varchar('opmerkingen_activiteiten', { length: 255 }),
  datumLaatsteWijziging: datetime('datum_laatste_wijziging').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const medicaties = mysqlTable('medicaties', {
  id: id(),
  medischeFicheId: fk('medische_fiche_id').notNull().references(() => medischeFiches.id, { onDelete: 'cascade' }),
  naamMedicatie: varchar('naam_medicatie', { length: 255 }).notNull(),
  dosering: varchar('dosering', { length: 255 }).notNull(),
  tijdstip: varchar('tijdstip', { length: 255 }),
  opmerking: varchar('opmerking', { length: 255 }),
});

export const lidmaatschappen = mysqlTable('lidmaatschappen',{
    gebruikerId: fk('gebruiker_id')
      .notNull()
      .references(() => gebruikers.id, { onDelete: 'cascade' }),
    werkjaar: smallint('werkjaar', { unsigned: true }).notNull(), 
    takId: fk('tak_id').notNull().references(() => takken.id, { onDelete: 'no action' }), 
    betaald: boolean('betaald').notNull().default(false),
    isTakleiding: boolean('is_takleiding').notNull().default(false),
    isEenheidsleiding: boolean('is_eenheidsleiding').notNull().default(false),
  },
  (table) => [primaryKey({ columns: [table.gebruikerId, table.werkjaar] })], 
);

export const gebruikersRelations = relations(gebruikers, ({ one, many }) => ({
  totem: one(totems), 
  medischeFiche: one(medischeFiches), 
  lidmaatschappen: many(lidmaatschappen),
  alsLid: many(lidOuder, { relationName: 'lid' }),
  alsOuder: many(lidOuder, { relationName: 'ouder' }),
}));

export const lidOuderRelations = relations(lidOuder, ({ one }) => ({
  lid: one(gebruikers, {
    fields: [lidOuder.lidGebruikerId],
    references: [gebruikers.id],
    relationName: 'lid',
  }),
  ouder: one(gebruikers, {
    fields: [lidOuder.ouderGebruikerId],
    references: [gebruikers.id],
    relationName: 'ouder',
  }),
}));

export const totemsRelations = relations(totems, ({ one }) => ({
  gebruiker: one(gebruikers, { fields: [totems.gebruikerId], references: [gebruikers.id] }),
}));

export const medischeFichesRelations = relations(medischeFiches, ({ one, many }) => ({
  gebruiker: one(gebruikers, { fields: [medischeFiches.gebruikerId], references: [gebruikers.id] }),
  medicaties: many(medicaties),
}));

export const medicatiesRelations = relations(medicaties, ({ one }) => ({
  medischeFiche: one(medischeFiches, {
    fields: [medicaties.medischeFicheId],
    references: [medischeFiches.id],
  }),
}));

export const takkenRelations = relations(takken, ({ many }) => ({
  lidmaatschappen: many(lidmaatschappen),
}));

export const lidmaatschappenRelations = relations(lidmaatschappen, ({ one }) => ({
  gebruiker: one(gebruikers, { fields: [lidmaatschappen.gebruikerId], references: [gebruikers.id] }),
  tak: one(takken, { fields: [lidmaatschappen.takId], references: [takken.id] }),
}));