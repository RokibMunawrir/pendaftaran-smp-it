ALTER TABLE `academic_years` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `deletedAt` datetime(3);--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `registrations` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `registration_logs` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `registration_paths` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `registration_statuses` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `timelines` MODIFY COLUMN `deleted_at` datetime(3);