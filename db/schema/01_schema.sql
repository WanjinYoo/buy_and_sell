-- -----------------------------------------------------
-- Schema midterm
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS midterm;
-- -----------------------------------------------------
-- Schema midterm
-- -----------------------------------------------------
-- CREATE DATABASE IF NOT EXISTS midterm DEFAULT CHARACTER SET utf8;
-- 

-- 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS user_favourites CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
-- 
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 'N'
);
-- 
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  date_listed DATE NOT NULL,
  price INTEGER NOT NULL,
  number_of_likes INTEGER DEFAULT 0,
  sold BOOLEAN DEFAULT 'N',
  sold_to INTEGER REFERENCES users(id),
  sold_date DATE,
  deleted BOOLEAN DEFAULT 'N',
  deleted_reason VARCHAR(255) DEFAULT NULL
);
-- 
 
CREATE TABLE user_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);
-- 
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  from_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  to_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 
