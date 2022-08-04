-- migrate:up

CREATE TABLE likes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIME_STAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
-- migrate:down
DROP TABLE likes;
