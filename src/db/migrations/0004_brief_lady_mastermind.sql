ALTER TABLE `announcements` RENAME COLUMN `is_published` TO `isPublished`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `is_important` TO `isImportant`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `updated_at` TO `updatedAt`;