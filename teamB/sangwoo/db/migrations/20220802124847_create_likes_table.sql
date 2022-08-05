-- migrate:up
CREATE TABLE likes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT like_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT like_posts_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
)

-- migrate:down

DROP TABLE likes;