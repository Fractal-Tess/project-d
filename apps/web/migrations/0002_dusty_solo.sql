ALTER TABLE `web_account` ADD `password` text(255);--> statement-breakpoint
ALTER TABLE `web_user` DROP COLUMN `password`;