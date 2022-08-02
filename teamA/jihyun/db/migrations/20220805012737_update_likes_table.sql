-- migrate:up
ALTER TABLE likes MODIFY COLUMN post_id INT NOT NULL;
ALTER TABLE likes MODIFY COLUMN user_id INT NOT NULL;

-- migrate:down

