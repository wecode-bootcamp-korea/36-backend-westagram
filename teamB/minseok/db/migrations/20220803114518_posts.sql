-- migrate:up
CREATE TABLE posts (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL,
        user_id INT NOT NULL,
        userProfileImage VARCHAR(500) NOT NULL,
        postingImageUrl VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users_table (id) 
)
-- migrate:down

