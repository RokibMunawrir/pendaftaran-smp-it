RENAME TABLE `verification_tokens` TO `verification`;--> statement-breakpoint
ALTER TABLE `verification` RENAME COLUMN `expires` TO `expires_at`;--> statement-breakpoint
ALTER TABLE `verification` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `deleted_at` datetime(3);--> statement-breakpoint
ALTER TABLE `verification` MODIFY COLUMN `identifier` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `profiles` ADD `religion` varchar(50);--> statement-breakpoint
ALTER TABLE `profiles` ADD `hobby` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `ambition` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `province` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `city` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `district` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `origin_school_npsn` varchar(50);--> statement-breakpoint
ALTER TABLE `profiles` ADD `father_income` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `mother_income` varchar(191);--> statement-breakpoint
ALTER TABLE `profiles` ADD `program` varchar(191);--> statement-breakpoint
ALTER TABLE `verification` ADD `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` ADD `value` text NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` ADD `created_at` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` ADD `updated_at` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
ALTER TABLE `verification` DROP COLUMN `token`;