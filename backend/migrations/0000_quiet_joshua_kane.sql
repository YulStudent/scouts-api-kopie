CREATE TABLE `events` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`event_date` date NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`external_url` varchar(500),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gebruikers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`voornaam` varchar(255) NOT NULL,
	`achternaam` varchar(255) NOT NULL,
	`straatnaam` varchar(511) NOT NULL,
	`huisnummer` varchar(255) NOT NULL,
	`postcode` varchar(255) NOT NULL,
	`gemeente` varchar(255) NOT NULL,
	`gebruiker_type` enum('Lid','Ouder','Leiding') NOT NULL,
	`emailadres` varchar(255),
	`telefoonnummer` varchar(255),
	`rijksregisternummer` varchar(255),
	`heeft_toestemming_fotos` boolean,
	`startdatum_leiding` date,
	`geboortedatum` date,
	`datum_accountcreatie` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `gebruikers_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_rrn_unique` UNIQUE(`rijksregisternummer`)
);
--> statement-breakpoint
CREATE TABLE `lid_ouder` (
	`lid_gebruiker_id` int unsigned NOT NULL,
	`ouder_gebruiker_id` int unsigned NOT NULL,
	`relatie` varchar(255) NOT NULL,
	`is_noodcontact` boolean NOT NULL DEFAULT false,
	CONSTRAINT `lid_ouder_lid_gebruiker_id_ouder_gebruiker_id_pk` PRIMARY KEY(`lid_gebruiker_id`,`ouder_gebruiker_id`)
);
--> statement-breakpoint
CREATE TABLE `lidmaatschappen` (
	`gebruiker_id` int unsigned NOT NULL,
	`werkjaar` smallint unsigned NOT NULL,
	`tak_id` int unsigned NOT NULL,
	`betaald` boolean NOT NULL DEFAULT false,
	`is_takleiding` boolean NOT NULL DEFAULT false,
	`is_eenheidsleiding` boolean NOT NULL DEFAULT false,
	CONSTRAINT `lidmaatschappen_gebruiker_id_werkjaar_pk` PRIMARY KEY(`gebruiker_id`,`werkjaar`)
);
--> statement-breakpoint
CREATE TABLE `medicaties` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`medische_fiche_id` int unsigned NOT NULL,
	`naam_medicatie` varchar(255) NOT NULL,
	`dosering` varchar(255) NOT NULL,
	`tijdstip` varchar(255),
	`opmerking` varchar(255),
	CONSTRAINT `medicaties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medische_fiches` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`gebruiker_id` int unsigned NOT NULL,
	`naam_huisarts` varchar(255) NOT NULL,
	`telefoonnummer_huisarts` varchar(255) NOT NULL,
	`adres_huisarts` varchar(511),
	`inenting_tetanus_datum` date,
	`bloedgroep` enum('A+','A-','B+','B-','AB+','AB-','O+','O-'),
	`allergieen` varchar(255),
	`actuele_ziektes` varchar(255),
	`beperkingen` varchar(255),
	`dieet` enum('Vegetarisch','Vegan','Halal','Koosjer','Geen Restricties') NOT NULL,
	`aandachtpunten_slapen` varchar(255),
	`aandachtpunten_algemeen` varchar(255),
	`opmerkingen_activiteiten` varchar(255),
	`datum_laatste_wijziging` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `medische_fiches_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_medische_fiche_gebruiker_unique` UNIQUE(`gebruiker_id`)
);
--> statement-breakpoint
CREATE TABLE `takken` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`tak_naam` varchar(255) NOT NULL,
	`minimum_leeftijd` tinyint unsigned NOT NULL,
	`maximum_leeftijd` tinyint unsigned NOT NULL,
	`maximum_aantal_leden_geboortejaar` int unsigned NOT NULL,
	CONSTRAINT `takken_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_tak_naam_unique` UNIQUE(`tak_naam`)
);
--> statement-breakpoint
CREATE TABLE `totems` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`gebruiker_id` int unsigned NOT NULL,
	`totem` varchar(255) NOT NULL,
	`voortotem` varchar(255),
	`plaats` varchar(255) NOT NULL,
	`jaar` smallint unsigned NOT NULL,
	CONSTRAINT `totems_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_totem_gebruiker_unique` UNIQUE(`gebruiker_id`)
);
--> statement-breakpoint
ALTER TABLE `lid_ouder` ADD CONSTRAINT `lid_ouder_lid_gebruiker_id_gebruikers_id_fk` FOREIGN KEY (`lid_gebruiker_id`) REFERENCES `gebruikers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lid_ouder` ADD CONSTRAINT `lid_ouder_ouder_gebruiker_id_gebruikers_id_fk` FOREIGN KEY (`ouder_gebruiker_id`) REFERENCES `gebruikers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lidmaatschappen` ADD CONSTRAINT `lidmaatschappen_gebruiker_id_gebruikers_id_fk` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lidmaatschappen` ADD CONSTRAINT `lidmaatschappen_tak_id_takken_id_fk` FOREIGN KEY (`tak_id`) REFERENCES `takken`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medicaties` ADD CONSTRAINT `medicaties_medische_fiche_id_medische_fiches_id_fk` FOREIGN KEY (`medische_fiche_id`) REFERENCES `medische_fiches`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medische_fiches` ADD CONSTRAINT `medische_fiches_gebruiker_id_gebruikers_id_fk` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `totems` ADD CONSTRAINT `totems_gebruiker_id_gebruikers_id_fk` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers`(`id`) ON DELETE cascade ON UPDATE no action;