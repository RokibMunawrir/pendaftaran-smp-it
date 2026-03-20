ALTER TABLE `user` RENAME COLUMN `last_login_at` TO `last_login`;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `status` text DEFAULT ('ACTIVE');