-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    post_id INT NULL,
    CONSTRAINT like_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT like_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- migrate:down
