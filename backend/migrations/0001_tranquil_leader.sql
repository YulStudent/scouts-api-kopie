CREATE TABLE `patrouilles` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`patrouille_naam` varchar(255) NOT NULL,
	`tak_id` int unsigned NOT NULL,
	`kreet` varchar(255) NOT NULL,
	CONSTRAINT `patrouilles_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_patrouille_naam_unique` UNIQUE(`patrouille_naam`),
	CONSTRAINT `idx_kreet_unique` UNIQUE(`kreet`)
);
--> statement-breakpoint
ALTER TABLE `patrouilles` ADD CONSTRAINT `patrouilles_tak_id_takken_id_fk` FOREIGN KEY (`tak_id`) REFERENCES `takken`(`id`) ON DELETE no action ON UPDATE no action;