-- migrate:up
ALTER TABLE likes ADD UNIQUE CONSTRAINT (user_id, post_id)
-- migrate:down
