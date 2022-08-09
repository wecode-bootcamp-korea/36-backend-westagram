-- migrate:up
ALTER TABLE likes 
ADD FOREIGN KEY (user_id) 
REFERENCES users (id)
ON DELETE CASCADE;

ALTER TABLE likes 
ADD FOREIGN KEY (post_id) 
REFERENCES posts (id)
ON DELETE CASCADE;

-- migrate:down

