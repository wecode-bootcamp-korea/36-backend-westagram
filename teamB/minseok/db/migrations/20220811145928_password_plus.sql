-- migrate:up
ALTER TABLE users_table MODIFY password varchar(300)

-- migrate:down

