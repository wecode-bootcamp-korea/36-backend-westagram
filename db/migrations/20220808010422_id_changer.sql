-- migrate:up
ALTER TABLE posts RENAME COLUMN post_id TO id

-- migrate:down

