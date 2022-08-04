-- migrate:up
CREATE TABLE posts (
	post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	content VARCHAR(1000) NULL,
	user_id INT NOT NULL,
	like_count INT NULL,
	CONSTRAINT posts_user_id_find FOREIGN KEY (user_id) REFERENCES users (id),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE posts;
