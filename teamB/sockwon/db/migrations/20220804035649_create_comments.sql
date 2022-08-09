-- migrate:up

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(3000) NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL
)
-- migrate:down
DROP TABLE comments
