insert into users (name, email, phone, is_admin)
VALUES ('Stephan', 'stephan@paul.com', '1234567890', 'Y');

INSERT INTO users (name, email, phone)
VALUES  ('Rahul', 'rahul@shial.com', '1234567890'),
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

INSERT INTO items (title, description, thumbnail_photo_url, date_listed, price) 
VALUES ('iPhone 6','Awesome iPhone 6, works fine','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('iPhone 8','Awesome iPhone 8, no scratches','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('Google Pixel 2','Something google made other than chrome','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('Asus MB','MotherBoard','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('Intel i9-9800','Intel i-9 9th gen cpu','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('AMD processor','AMD 9000 series','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('Logitech 400','logitech keyboard','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('MB 750','Logitech Mouse mb-750','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150);

-- 
INSERT INTO user_favourites (user_id, item_id) VALUES 
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(3,1),
(3,3),
(3,5),
(4,2),
(4,4),
(4,6);

--
INSERT INTO conversations (from_id, to_id, item_id,message, message_date) 
VALUES (2, 1, 1, 'can you bring down the price?','2018-09-26'),
(1, 2, 1, 'The item is reasonably priced. What are you offerring?','2018-09-27'),
(2, 1, 1, '145','2018-09-27'),
(1, 2, 1, 'Sold!','2018-09-28'),
(2, 1, 1, 'Thank you','2018-09-26'),
(3, 3, 3, 'Is this available?','2018-09-26'),
(1, 3, 3, 'Yes. What are you offerring?','2018-09-27'),
(3, 1, 3, '145','2018-09-27'),
(1, 3, 3, 'Sold!','2018-09-28'),
(3, 1, 3, 'Thank you','2018-09-26'),
(2, 1, 5, 'is this available','2018-09-26'),
(1, 2, 5, 'yes. What are you offerring?','2018-09-27'),
(3, 1, 5, 'is this available','2018-09-26'),
(1, 3, 5, 'yes. someone else is also looking?','2018-09-27'),
(2, 1, 5, '145','2018-09-27'),
(1, 2, 5, 'Sold!','2018-09-28'),
(2, 1, 5, 'Thank you','2018-09-26');
