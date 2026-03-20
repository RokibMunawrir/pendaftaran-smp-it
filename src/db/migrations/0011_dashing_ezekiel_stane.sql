RENAME TABLE `users` TO `user`;--> statement-breakpoint
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `announcements` DROP FOREIGN KEY `announcements_authorId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `registrations` DROP FOREIGN KEY `registrations_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_authorId_user_id_fk` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;