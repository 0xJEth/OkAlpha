# Schema Information

## interests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
interests   | string    |
user_id     | integer   | not null, foreign key (references users), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
liked_id    | integer   | not null, foreign key (references users), indexed

## AI_matches
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
match_id    | integer   | not null, foreign key (references users), indexed

## users
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
username         | string    | not null, indexed, unique
gender           | string    | not null
preferred_gender | string    | not null
email            | string    | not null
password_digest  | string    | not null
image_url        | string    |
bio              | text      |
session_token    | string    | not null, indexed, unique

## messages
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
user_id        | integer   | not null, foreign key (references users), indexed
sender_id      | integer   | not null, foreign key (references users), indexed
read           | boolean   | not null, default false
