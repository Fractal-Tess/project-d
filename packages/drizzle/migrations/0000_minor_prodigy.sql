CREATE TABLE `user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`image` text(255),
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`role` text(255) DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `account` (
	`user_id` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`password_hash` text(255),
	`provider_account_Id` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	PRIMARY KEY(`provider`, `provider_account_Id`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);