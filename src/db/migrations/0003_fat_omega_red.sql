ALTER TABLE `announcements` RENAME COLUMN `author_id` TO `authorId`;--> statement-breakpoint
ALTER TABLE `announcements` DROP FOREIGN KEY `announcements_author_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;