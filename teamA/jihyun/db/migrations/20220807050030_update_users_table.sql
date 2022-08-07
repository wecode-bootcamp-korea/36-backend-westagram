-- migrate:up
ALTER TABLE `users` ADD `profile_image` VARCHAR(1000) NULL AFTER `email`;

-- migrate:down

