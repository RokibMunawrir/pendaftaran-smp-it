CREATE TABLE `academic_years` (
	`id` varchar(191) NOT NULL,
	`year` varchar(20) NOT NULL,
	`is_active` boolean DEFAULT false,
	`start_date` datetime,
	`end_date` datetime,
	CONSTRAINT `academic_years_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`provider` varchar(100) NOT NULL,
	`provider_account_id` varchar(191) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`expires_at` int,
	`token_type` varchar(50),
	`scope` varchar(191),
	`id_token` text,
	`created_at` datetime,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`profile_id` varchar(191) NOT NULL,
	`academic_year_id` varchar(191) NOT NULL,
	`registration_path_id` varchar(191) NOT NULL,
	`registration_number` varchar(100),
	`status` varchar(50) DEFAULT 'DRAFT',
	`registered_at` datetime,
	`verified_at` datetime,
	`verified_by` varchar(191),
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registration_paths` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`quota` int,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `registration_paths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(191) NOT NULL,
	`session_token` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `verification_tokens_identifier` PRIMARY KEY(`identifier`)
);
--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `authorId` TO `author_id`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `isPublished` TO `is_published`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `createdAt` TO `created_at`;--> statement-breakpoint
ALTER TABLE `announcements` RENAME COLUMN `updatedAt` TO `updated_at`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `userId` TO `registration_id`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `document_type` TO `type`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `fileUrl` TO `file_url`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `document_status` TO `status`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `uploadDate` TO `upload_date`;--> statement-breakpoint
ALTER TABLE `documents` RENAME COLUMN `verifiedAt` TO `verified_at`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `userId` TO `registration_id`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `proofUrl` TO `proof_url`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `payment_status` TO `status`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `paymentDate` TO `payment_date`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `verifiedAt` TO `verified_at`;--> statement-breakpoint
ALTER TABLE `payments` RENAME COLUMN `verifiedBy` TO `verified_by`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `userId` TO `user_id`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `placeOfBirth` TO `place_of_birth`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `dateOfBirth` TO `date_of_birth`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `previousSchool` TO `previous_school`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `fatherName` TO `father_name`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `fatherJob` TO `father_job`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `motherName` TO `mother_name`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `motherJob` TO `mother_job`;--> statement-breakpoint
ALTER TABLE `profiles` RENAME COLUMN `parentPhone` TO `parent_phone`;--> statement-breakpoint
ALTER TABLE `timelines` RENAME COLUMN `startDate` TO `start_date`;--> statement-breakpoint
ALTER TABLE `timelines` RENAME COLUMN `endDate` TO `end_date`;--> statement-breakpoint
ALTER TABLE `timelines` RENAME COLUMN `isActive` TO `is_active`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `createdAt` TO `created_at`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `updatedAt` TO `updated_at`;--> statement-breakpoint
ALTER TABLE `documents` DROP INDEX `documents_userId_type_key`;--> statement-breakpoint
ALTER TABLE `profiles` DROP INDEX `profiles_userId_key`;--> statement-breakpoint
ALTER TABLE `profiles` DROP INDEX `profiles_nik_key`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_email_key`;--> statement-breakpoint
ALTER TABLE `announcements` DROP FOREIGN KEY `announcements_authorId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `documents` DROP FOREIGN KEY `documents_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `payments` DROP FOREIGN KEY `payments_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_users_id_fk`;
--> statement-breakpoint
DROP INDEX `payments_userId_fkey` ON `payments`;--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `title` varchar(191);--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `content` text;--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `author_id` varchar(191);--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `is_published` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `is_published` boolean;--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `type` varchar(100);--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `file_url` varchar(255);--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `status` varchar(50) DEFAULT 'PENDING';--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `upload_date` datetime;--> statement-breakpoint
ALTER TABLE `documents` MODIFY COLUMN `verified_at` datetime;--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `amount` decimal(10,2);--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `proof_url` varchar(255);--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `status` varchar(50) DEFAULT 'PENDING';--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `payment_date` datetime;--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `verified_at` datetime;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `nik` varchar(50);--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `nisn` varchar(50);--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `date_of_birth` datetime;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `gender` varchar(20);--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `parent_phone` varchar(20);--> statement-breakpoint
ALTER TABLE `timelines` MODIFY COLUMN `title` varchar(191);--> statement-breakpoint
ALTER TABLE `timelines` MODIFY COLUMN `start_date` datetime;--> statement-breakpoint
ALTER TABLE `timelines` MODIFY COLUMN `end_date` datetime;--> statement-breakpoint
ALTER TABLE `timelines` MODIFY COLUMN `is_active` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(50) DEFAULT 'SANTRI';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `status` varchar(50) DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` datetime;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updated_at` datetime;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `image` varchar(255);--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_profile_id_profiles_id_fk` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_academic_year_id_academic_years_id_fk` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_registration_path_id_registration_paths_id_fk` FOREIGN KEY (`registration_path_id`) REFERENCES `registration_paths`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `accounts_user_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `registrations_user_idx` ON `registrations` (`user_id`);--> statement-breakpoint
CREATE INDEX `registrations_profile_idx` ON `registrations` (`profile_id`);--> statement-breakpoint
CREATE INDEX `registrations_academic_year_idx` ON `registrations` (`academic_year_id`);--> statement-breakpoint
CREATE INDEX `registrations_registration_path_idx` ON `registrations` (`registration_path_id`);--> statement-breakpoint
CREATE INDEX `sessions_user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_registration_id_registrations_id_fk` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_registration_id_registrations_id_fk` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `documents_registration_idx` ON `documents` (`registration_id`);--> statement-breakpoint
CREATE INDEX `payments_registration_idx` ON `payments` (`registration_id`);--> statement-breakpoint
CREATE INDEX `profiles_user_idx` ON `profiles` (`user_id`);--> statement-breakpoint
CREATE INDEX `profiles_nik_idx` ON `profiles` (`nik`);--> statement-breakpoint
CREATE INDEX `profiles_nisn_idx` ON `profiles` (`nisn`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `payments` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `payments` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `timelines` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `timelines` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `lastLogin`;