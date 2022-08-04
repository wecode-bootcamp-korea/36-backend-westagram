-- migrate:up
+------------+---------------+------+-----+-------------------+-----------------------------+
| Field      | Type          | Null | Key | Default           | Extra                       |
+------------+---------------+------+-----+-------------------+-----------------------------+
| id         | int           | NO   | PRI | NULL              | auto_increment              |
| content    | varchar(3000) | NO   |     | NULL              |                             |
| user_id    | int           | NO   | MUL | NULL              |                             |
| post_id    | int           | NO   | MUL | NULL              |                             |
| created_at | timestamp     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED           |
| updated_at | timestamp     | YES  |     | NULL              | on update CURRENT_TIMESTAMP |
+------------+---------------+------+-----+-------------------+-----------------------------+
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
