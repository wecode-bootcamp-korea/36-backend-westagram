-- migrate:up
ALTER TABLE likes ADD CONSTRAINT constraint_likes_unique UNIQUE (user_id, post_id);

-- migrate:down

