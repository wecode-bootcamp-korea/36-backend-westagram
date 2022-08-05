-- migrate:up

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(3000) NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL, 
    created_at TIME_STAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIME_STAMP NULL ON UPDATE CURRENT_TIMESTAMP
)
-- migrate:down
DROP TABLE comments
