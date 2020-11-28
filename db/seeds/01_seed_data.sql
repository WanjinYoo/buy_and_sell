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

INSERT INTO items (seller_id, title, description, thumbnail_photo_url, street, city, province, country, postal_code, date_listed, price, condition) 
VALUES (3,'iPhone 6','Awesome iPhone 6, works fine','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','536 Namsub Highway','Sotboske','Quebec','Canada','28142','2018-09-26',150, 'New'),
(4,'iPhone 8','Awesome iPhone 8, no scratches','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','1392 Gaza Junction','Upetafpuv','Nova Scotia','Canada','81059','2018-09-26',150, 'Used'),
(5,'Google Pixel 2','Something google made other than chrome','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','834 Buwmi Road','Rotunif','Newfoundland And Labrador','Canada','58224','2018-09-26',150, 'Used');

-- 
INSERT INTO user_favourites (user_id, item_id) VALUES 
(3,1),
(2,1),
(4,2);
--
INSERT INTO messages (from_id, to_id, item_id,message, message_date) 
VALUES (3, 2, 1, 'can you bring down the price?','2018-09-26'),
(2, 3, 1, 'The item is reasonably priced. What are you offerring?','2018-09-27'),
(1, 2, 1, '145','2018-09-27'),
(2, 1, 1, 'Sold!','2018-09-28'),
(3, 2, 1, 'Thank you','2018-09-26');
