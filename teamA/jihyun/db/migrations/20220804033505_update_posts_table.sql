-- migrate:up
ALTER TABLE posts DROP FOREIGN KEY posts_ibfk_1, ADD CONSTRAINT posts_user_id FOREIGN KEY (user_id) REFERENCES users(id);

-- migrate:down

