CREATE TABLE `events` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`event_date` date NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`external_url` varchar(500),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
