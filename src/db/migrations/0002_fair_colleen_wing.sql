ALTER TABLE `announcements` ADD `is_important` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `announcements` ADD `target` varchar(50) DEFAULT 'all';--> statement-breakpoint
ALTER TABLE `settings` ADD `announcements` json;