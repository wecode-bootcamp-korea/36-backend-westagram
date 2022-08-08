-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_user_id_fk FOREIGN KEY (user_id) REFERENCES users(no)
)

-- migrate:down
DROP TABLE likes;