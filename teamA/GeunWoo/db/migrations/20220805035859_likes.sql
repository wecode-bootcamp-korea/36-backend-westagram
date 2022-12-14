-- migrate:up
CREATE TABLE likes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	post_id INT NOT NULL,
	CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE cascade,
	CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE cascade,
	CONSTRAINT user_id_unique UNIQUE (user_id, post_id),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE likes
