drop schema if exists tourism;

-- create a new database
create schema tourism;

-- select database
use tourism;

-- create table
-- create table
CREATE TABLE "users" (
  "email" varchar(256) NOT NULL,
  "password" varchar(256) NOT NULL,
  "media_type" varchar(256) DEFAULT NULL,
  "pic" mediumblob,
  PRIMARY KEY ("email")
);

-- create table
create table usersfavattraction(
	id int not null auto_increment,
    email varchar(256) not null,
    uuid varchar(256) not null,
    name varchar(256) not null,

    primary key (id),

    constraint fk_email_id
        foreign key(email)
        references users(email)
        on delete cascade
        on update cascade
);