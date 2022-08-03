-- migrate:up
    CREATE TABLE posts (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

-- migrate:down

