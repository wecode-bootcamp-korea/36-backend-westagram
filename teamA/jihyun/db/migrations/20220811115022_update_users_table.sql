-- migrate:up
ALTER TABLE users MODIFY COLUMN email VARCHAR(200) NOT NULL;

-- migrate:down

