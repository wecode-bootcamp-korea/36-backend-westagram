-- migrate:up

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(3000) NOT NULL,
    user_id INT NOT NULL,
    created_at TIME_STAMP DEFAULT CURRENT_TIME,
    updated_at TIME_STAMP NULL, ON UPDATE CURRENT_TIME
)

-- migrate:down

DROP TABLE posts;