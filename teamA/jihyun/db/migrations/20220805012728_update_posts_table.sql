-- migrate:up
ALTER TABLE posts MODIFY COLUMN user_id INT NOT NULL;
ALTER TABLE posts MODIFY COLUMN content VARCHAR(2000) NOT NULL;

-- migrate:down

