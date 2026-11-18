import { int, mysqlTable, tinyint, varchar, mysqlEnum, boolean, date, datetime,  } from 'drizzle-orm/mysql-core';
import {sql} from 'drizzle-orm'

const id = () => int('id', { unsigned: true }).primaryKey().autoincrement();
const fk = (name: string) => int(name, { unsigned: true });

export const takken = mysqlTable('takken', {
  id: id(),
  takNaam: varchar('tak_naam', {length: 255}).notNull().unique('idx_tak_naam_unique'),
  minimumLeeftijd: tinyint('minimum_leeftijd', { unsigned: true }).notNull(),
  maximumLeeftijd: tinyint('maximum_leeftijd', { unsigned: true }).notNull(),
  maximumAantalLedenGeboortejaar: int('maximum_aantal_leden_geboortejaar', {
    unsigned: true,
  }).notNull(),
});

export const patrouilles = mysqlTable('patrouilles', {
  id: id(),
  patrouilleNaam: varchar('patrouille_naam', {length: 255}).notNull().unique('idx_patrouille_naam_unique'),
  takId: fk('tak_id').notNull().references(() => takken.id, { onDelete: 'no action' }),
  kreet: varchar('kreet', {length: 255}).notNull().unique('idx_kreet_unique')
})

export const lidmaatschappen = mysqlTable('lidmaatschappen', {
  gebruikerId: fk('gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'cascade'}),
  werkjaar: int('werkjaar', {unsigned: true}).notNull(),
  takId: fk('tak_id').notNull().references(() => takken.id, { onDelete: 'no action' }),
  betaald: boolean('betaald').notNull().default(false)
});

export const LeidingWerkjaar = mysqlTable('leiding_werkjaar', {
  gebruikerId: fk('gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'cascade'}),
  werkjaar: int('werkjaar', {unsigned: true}).notNull(),
  takId: fk('tak_id').notNull().references(() => takken.id, { onDelete: 'no action' }),
  isTakleiding: boolean("is_takleiding").notNull().default(false),
  isEenheidsleiding: boolean("is_eenheidsleiding").notNull().default(false)
});

export const lidPatrouille = mysqlTable('lid_patrouille', {
  gebruikerId: fk('gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'cascade'}),
  werkjaar: int('werkjaar', {unsigned: true}).notNull(),
  patrouilleId: fk('patrouilleId').notNull().references(() => patrouilles.id, {onDelete: 'cascade'}),
  isAssistentPatrouilleLeider: boolean("is_assistent_Patrouilleleider").notNull().default(false),
  isPatrouilleLeider: boolean("is_Patrouilleleider").notNull().default(false)
});

export const medischeFiches = mysqlTable('medische_fiches', {
  id: id(),
  gebruikerId: fk('gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'no action'}),
  naamHuisarts: varchar('naam_huisarts', {length:255}).notNull(),
  telefoonnummerHuisarts: varchar('telefoonnummer_huisarts', {length: 255}).notNull(),
  inentingTetanusDatum: date('inenting_tetanus_datum', {mode:'date'}),
  bloedgroep: mysqlEnum('bloedgroep', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  allergieen: varchar('allergieen', {length: 255}),
  actueleZiektes: varchar('actuele_Ziektes', {length: 255}),
  beperkingen: varchar('beperkingen', {length: 255}),
  dieet: mysqlEnum('dieet', ['Vegetarisch', 'Vegan', 'Halal', 'Koosjer', 'Geen Restricties']).notNull(),
  aandachtpuntenSlapen: varchar('aandachtpunten_slapen', {length:255}),
  aandachtpuntenAlgemeen: varchar('aandachtpunten_algemeen', {length:255}),
  opmerkingenActiviteiten: varchar('opmerkingenActiviteiten', {length:255}),
  datumLaatsteWijziging: datetime('datum_accountcreatie').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const gebruikers = mysqlTable('gebruikers', {
  gebruikerId: id(),
  voornaam: varchar('voornaam', {length: 255}).notNull(),
  achternaam: varchar('achternaam', {length: 255}).notNull(),
  straatnaam: varchar('straatnaam', {length: 511}).notNull(),
  huisnummer: varchar('huisnummer', {length: 255}).notNull(),
  postcode: varchar('postcode', {length: 255}).notNull(),
  gemeente: varchar('gemeente', {length: 255}).notNull(),
  gebruikersType: mysqlEnum('gebruiker_type', ['Lid', 'Ouder', 'Leiding']).notNull(),
  email: varchar('emailadres', {length: 255}),
  telefoonnummer: varchar('telefoonnummer', {length:255}),
  rijksregisternummer: varchar('rijksregisternummer', {length:255}).unique('idx_rrn_unique'),
  heeftToestemmingFotos: boolean('heeft_toestemming_fotos'),
  startdatumLeiding: date('startdatum_leiding', { mode: 'date' }),
  geboortedatum: date('geboortedatum', { mode: 'date' }),
  datumAccountcreatie: datetime('datum_accountcreatie').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const medicaties = mysqlTable('medicaties', {
  id: id(),
  medischeFicheId: fk("medische_fiche_id").notNull().references(() => medischeFiches.id, {onDelete: 'cascade'}),
  naamMedicatie: varchar("naam_medicatie", {length: 255}).notNull(),
  dossering: varchar("dossering", {length: 255}).notNull(),
  opmerking: varchar('opmerkingen', {length: 255})
});

export const lidOuder = mysqlTable('lid_ouder', {
  lidGebruikerId: fk('lid_gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'no action'}),
  ouderGebruikerId: fk('ouder_gebruiker_id').notNull().references(() => gebruikers.gebruikerId, {onDelete: 'no action'}),
  relatie: varchar("relatie", {length: 255}).notNull(),
  isNoodcontact: boolean('is_noodcontact').notNull().default(false)
});