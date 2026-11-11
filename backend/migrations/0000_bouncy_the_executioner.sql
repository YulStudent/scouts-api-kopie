CREATE TABLE `takken` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`tak_naam` varchar(255) NOT NULL,
	`minimum_leeftijd` tinyint unsigned NOT NULL,
	`maximum_leeftijd` tinyint unsigned NOT NULL,
	`maximum_aantal_leden_geboortejaar` int unsigned NOT NULL,
	CONSTRAINT `takken_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_tak_naam_unique` UNIQUE(`tak_naam`)
);
