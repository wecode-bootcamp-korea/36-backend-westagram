-- migrate:up
CREATE TABLE `likes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `likes_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `likes_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
    UNIQUE KEY `unique_key` (`user_id`,`post_id`)
);

-- migrate:down
DROP TABLE `likes`;