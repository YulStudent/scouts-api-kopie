ALTER TABLE `events` MODIFY COLUMN `description` text;--> statement-breakpoint
ALTER TABLE `events` ADD `image_url` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `external_url` varchar(500);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `image`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `image_alt`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `href`;