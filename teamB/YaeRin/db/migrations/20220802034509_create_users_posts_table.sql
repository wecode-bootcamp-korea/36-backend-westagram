-- migrate:up
CREATE TABLE users_posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT post_users_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT post_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE users_posts;
