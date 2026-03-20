DROP INDEX `accounts_user_idx` ON `accounts`;--> statement-breakpoint
DROP INDEX `sessions_user_idx` ON `sessions`;--> statement-breakpoint
DROP INDEX `users_email_idx` ON `user`;--> statement-breakpoint
CREATE INDEX `account_user_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `user` (`email`);