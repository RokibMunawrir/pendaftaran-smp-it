CREATE TABLE `registration_logs` (
	`id` varchar(191) NOT NULL,
	`registration_id` varchar(191) NOT NULL,
	`status` varchar(50) NOT NULL,
	`notes` text,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`deleted_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `registration_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registration_statuses` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`deleted_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `registration_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `academic_years` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `academic_years` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `academic_years` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `announcements` ADD `deletedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `documents` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `documents` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `documents` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registrations` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registrations` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registrations` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registration_paths` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registration_paths` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `registration_paths` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `timelines` ADD `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `timelines` ADD `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `timelines` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `deleted_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;