-- migrate:up
ALTER TABLE users ADD UNIQUE KEY (email)

-- migrate:down

