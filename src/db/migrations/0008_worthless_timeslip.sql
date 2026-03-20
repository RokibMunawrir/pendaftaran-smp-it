ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;