-- migrate:up

ALTER TABLE posts ADD CONSTRAINT posts_id_fk FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ENABLE
ALTER TABLE users MODIFY id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE posts MODIFY id  INT NOT NULL AUTO_INCREMENT


-- migrate:down
