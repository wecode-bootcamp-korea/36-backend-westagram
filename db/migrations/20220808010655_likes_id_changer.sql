-- migrate:up
ALTER TABLE likes RENAME COLUMN like_id TO id

-- migrate:down

