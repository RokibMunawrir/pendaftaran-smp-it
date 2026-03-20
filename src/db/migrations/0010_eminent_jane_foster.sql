RENAME TABLE `verification` TO `verification_tokens`;--> statement-breakpoint
ALTER TABLE `verification_tokens` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verification_tokens` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `payments` ADD `sender_name` varchar(255);--> statement-breakpoint
ALTER TABLE `payments` ADD `bank_tujuan` varchar(100);