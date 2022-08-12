-- migrate:up
ALTER TABLE users MODIFY COLUMN name VARCHAR(100) NULL;

-- migrate:down

