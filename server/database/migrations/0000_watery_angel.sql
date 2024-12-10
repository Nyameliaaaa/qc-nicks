CREATE TABLE `nicknames` (
	`nickname_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`nickname_string` text NOT NULL,
	`created_at` integer NOT NULL
);
