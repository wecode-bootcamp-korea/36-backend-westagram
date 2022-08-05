-- migrate:up transaction:false
ALTER TABLE `posts` MODIFY COLUMN `like_count` INT NULL;

-- migrate:down
