-- migrate:up
create table test_table (
  id integer,
  name varchar(255),
  email varchar(255) not null
);

-- migrate:down

