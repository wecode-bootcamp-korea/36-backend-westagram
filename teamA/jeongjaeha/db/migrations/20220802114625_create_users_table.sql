-- migrate:up
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(200) NOT NULL,
  user_pw VARCHAR(200) NOT NULL,
  user_name VARCHAR(200) NOT NULL,
  user_age INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) 

-- migrate:down
DROP TABLE users;
