-- migrate:up
CREATE TABLE users (
  no INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) 

-- migrate:down
DROP TABLE users;
