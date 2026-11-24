ALTER TABLE `events` RENAME COLUMN `image_url` TO `image`;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `image_alt` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `href` varchar(500);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `external_url`;