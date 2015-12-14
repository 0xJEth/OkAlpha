# Schema Information

## profiles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
bio         | text      |
interests   | text      |
user_id     | integer   | not null, foreign key (references users), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
like_id     | string    | not null, foreign key (references users), indexed

## AI_matches
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | string    | not null, foreign key (references users), indexed
match_id    | string    | not null, foreign key (references users), indexed

## users
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
username         | string    | not null, indexed, unique
gender           | string    | not null
preferred_gender | string    | not null
email            | string    | not null
password_digest  | string    | not null
session_token    | string    | not null, indexed, unique
