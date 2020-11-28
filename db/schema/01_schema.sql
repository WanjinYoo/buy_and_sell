-- -----------------------------------------------------
-- Schema midterm
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS midterm;
-- -----------------------------------------------------
-- Schema midterm
-- -----------------------------------------------------
-- CREATE DATABASE IF NOT EXISTS midterm DEFAULT CHARACTER SET utf8;
-- 
USE midterm;
-- 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_favourites CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
-- 
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 'N'
);
-- 
insert into users (name, email, phone, is_admin)
VALUES ('Stephan', 'stephan@paul.com', '1234567890', 'Y'),
  ('Rahul', 'rahul@shial.com', '1234567890'),
  ('Wanjin', 'wanjin@yoo.com', '1234567890'),
  ('Random', 'random@mail.com', '1234567890'),
  ('Eva Stanley','sebastianguerra@ymailcom', '1234567890'),
  ('Louisa Meyer','jacksonrose@hotmailcom', '1234567890'),
  ('Dominic Parks','victoriablackwell@outlookcom', '1234567890'),
  ('Sue Luna','jasonvincent@gmxcom', '1234567890'),
  ('Rosalie Garza','jacksondavid@gmxcom', '1234567890'),
  ('Etta West','charlielevy@yahoocom', '1234567890'),
  ('Margaret Wong','makaylaweiss@icloudcom', '1234567890'),
  ('Leroy Hart','jaycereynolds@inboxcom', '1234567890');
-- 
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  date_listed DATE NOT NULL,
  price INTEGER NOT NULL,
  condition VARCHAR(255) DEFAULT 'New',
  number_of_likes INTEGER NOT NULL DEFAULT 0,
  sold BOOLEAN DEFAULT 'N',
  sold_to INTEGER DEFAULT NULL,
  sold_date DATE,
  deleted BOOLEAN DEFAULE 'N',
  deleted_reason VARCHAR(255) DEFAULT NULL,
);

INSERT INTO items (seller_id, title, description, street, city, province, country, postal_code, date_listed, price, country, street, city, province, postal_code) 
VALUES (1,'iPhone 6','iPhone','Awesome iPhone 6, works fine','536 Namsub Highway','Sotboske','Quebec','Canada','28142','2018-09-26',150),
(1,'iPhone 8','iPhone','Awesome iPhone 8, no scratches','1392 Gaza Junction','Upetafpuv','Nova Scotia','Canada','81059','2018-09-26',150),
(1,'Google Pixel 2','Android phone','Something google made other than chrome','834 Buwmi Road','Rotunif','Newfoundland And Labrador','Canada','58224','2018-09-26',150);

-- 
CREATE TABLE user_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
);

INSERT INTO user_favourites (user_id, item_id) VALUES 
(3,1),
(2,1),
(4,2);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  from_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  to_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_date DATE NOT NULL
);

INSERT INTO messages (from_id, to_id, item_id,message, message_date) 
VALUES (3, 2, 1, 'can you bring down the price?','2018-09-26'),
(2, 3, 1, 'The item is reasonably priced. What are you offerring?','2018-09-27'),
(1, 2, 1, '145','2018-09-27'),
(2, 1, 1, 'Sold!','2018-09-28'),
(3, 2, 1, 'Thank you','2018-09-26'),
-- 
