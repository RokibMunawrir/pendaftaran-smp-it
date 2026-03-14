CREATE TABLE `announcements` (
	`id` varchar(191) NOT NULL,
	`title` varchar(191) NOT NULL,
	`content` text NOT NULL,
	`authorId` varchar(191) NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`document_type` enum('KK','AKTA_KELAHIRAN','IJAZAH','FOTO') NOT NULL,
	`fileUrl` varchar(191) NOT NULL,
	`document_status` enum('PENDING','VERIFIED','REJECTED') NOT NULL DEFAULT 'PENDING',
	`uploadDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`verifiedAt` datetime(3),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`),
	CONSTRAINT `documents_userId_type_key` UNIQUE(`userId`,`document_type`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`proofUrl` varchar(191) NOT NULL,
	`payment_status` enum('PENDING','VERIFIED','REJECTED','REVISION') NOT NULL DEFAULT 'PENDING',
	`paymentDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`verifiedAt` datetime(3),
	`verifiedBy` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`nik` varchar(191),
	`nisn` varchar(191),
	`placeOfBirth` varchar(191),
	`dateOfBirth` datetime(3),
	`gender` varchar(191),
	`phone` varchar(191),
	`address` text,
	`previousSchool` varchar(191),
	`fatherName` varchar(191),
	`fatherJob` varchar(191),
	`motherName` varchar(191),
	`motherJob` varchar(191),
	`parentPhone` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_userId_key` UNIQUE(`userId`),
	CONSTRAINT `profiles_nik_key` UNIQUE(`nik`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` varchar(191) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`siteName` varchar(191),
	`logo` text,
	`heroTitle` varchar(191),
	`heroSubtitle` text,
	`heroImage` text,
	`heroCtaText` varchar(191),
	`heroCtaLink` varchar(191),
	`aboutTitle` varchar(191),
	`aboutDescription` text,
	`aboutImage` text,
	`agenda` json,
	`biaya` json,
	`faq` json,
	`features` json,
	`announcementBanner` text,
	`contactAddress` text,
	`contactEmail` varchar(191),
	`contactPhone` varchar(191),
	`contactMapEmbed` text,
	`socialFacebook` varchar(191),
	`socialInstagram` varchar(191),
	`socialWhatsapp` varchar(191),
	`socialYoutube` varchar(191),
	`footer` varchar(191),
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `timelines` (
	`id` varchar(191) NOT NULL,
	`title` varchar(191) NOT NULL,
	`description` text,
	`startDate` datetime(3) NOT NULL,
	`endDate` datetime(3) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `timelines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`role` enum('ADMIN','OPERATOR','SANTRI') NOT NULL DEFAULT 'SANTRI',
	`status` enum('AKTIF','NONAKTIF') NOT NULL DEFAULT 'AKTIF',
	`lastLogin` datetime(3),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `payments_userId_fkey` ON `payments` (`userId`);