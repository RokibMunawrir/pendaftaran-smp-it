RENAME TABLE `accounts` TO `account`;--> statement-breakpoint
RENAME TABLE `sessions` TO `session`;--> statement-breakpoint
RENAME TABLE `verification_tokens` TO `verification`;--> statement-breakpoint
ALTER TABLE `account` RENAME COLUMN `provider` TO `provider_id`;--> statement-breakpoint
ALTER TABLE `account` RENAME COLUMN `expires_at` TO `access_token_expires_at`;--> statement-breakpoint
ALTER TABLE `account` RENAME COLUMN `provider_account_id` TO `updated_at`;--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `password` TO `banned`;--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `deleted_at` TO `ban_reason`;--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN `session_token` TO `expires_at`;--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN `expires` TO `token`;--> statement-breakpoint
ALTER TABLE `account` DROP FOREIGN KEY `accounts_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `sessions_user_id_user_id_fk`;
--> statement-breakpoint
DROP INDEX `account_user_idx` ON `account`;--> statement-breakpoint
DROP INDEX `user_email_idx` ON `user`;--> statement-breakpoint
DROP INDEX `session_user_idx` ON `session`;--> statement-breakpoint
ALTER TABLE `account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `session` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verification` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `provider_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `updated_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `access_token_expires_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `scope` text;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `created_at` timestamp(3) NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email_verified` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `image` text;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `banned` boolean;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `banned` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `last_login_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `role` text;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `status` varchar(50) NOT NULL DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp(3) NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp(3) NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `ban_reason` text;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `token` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `session` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `verification` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `account` ADD `account_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD `refresh_token_expires_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `account` ADD `password` text;--> statement-breakpoint
ALTER TABLE `user` ADD `ban_expires` timestamp(3);--> statement-breakpoint
ALTER TABLE `session` ADD `created_at` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `updated_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `ip_address` text;--> statement-breakpoint
ALTER TABLE `session` ADD `user_agent` text;--> statement-breakpoint
ALTER TABLE `session` ADD `impersonated_by` text;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_token_unique` UNIQUE(`token`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `token_type`;