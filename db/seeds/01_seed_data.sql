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
VALUES ('iPhone 6','This phone is in excellent condition. Zero scratches (was all ways kept inside a life proof case), speakers work, microphones work. I upgraded to a new phone., works fine','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',150),
('iPhone 8','The Phone comes with charger n box. Phone is in perfect condition n has no problem. I upgraded to iPhone 12 that’s the reason I’m selling it., no scratches','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',140),
('Google Pixel 2','Pixel 2 Phone (2017) by Google, G011A 64GB 5" inch Smartphone (Just Black) Unlocked
Google phones are fully unlocked, and near Mint Condition. Phone and USB charger.','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',250),
('Asus MB','Powered by 2nd generation AMD Ryzen AM4 processors to maximize connectivity and speed with dual NVMe M.2, USB 3.1 Gen2, gigabit LAN and up to 64GB of DDR4 (3200 MHz)','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',450),
('Intel i9-9800','Designed for content creators and freelancers, Intel Core X-series processors put the power & convenience of a full studio in your PC. Quickly and simultaneously record, edit, and render with up to 4.8GHz thanks to the updated Intel','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',715),
('AMD processor','AMD RYZEN 7 3800X 8-Core 3.9 GHz (4.5 GHz Max Boost) Socket AM4 105W 100-100000025BOX Desktop Processor','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',110),
('Logitech 400','Maintain ultra-durable strength while achieve a feather-light weight
Braided cable is ultra-flexible and super lightweight
G-Skates - 100% pure Virgin PTFE with rounded edge','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',75),
('MB 750','HERO 16K Sensor: Our most advanced gaming sensor with 1:1 tracking, 400+ IPS, and 100 - 16,000 max dpi sensitivity - plus zero smoothing, filtering, or acceleration','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',50),
('NEW ITEM','HERO 16K Sensor: Our most advanced gaming sensor with 1:1 tracking, 400+ IPS, and 100 - 16,000 max dpi sensitivity - plus zero smoothing, filtering, or acceleration','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','2018-09-26',50);

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
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 1, 'can you bring down the price?',Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 2, 1, 'The item is reasonably priced. What are you offerring?', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 1, '145', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 2, 1, 'Sold!', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 1, 'Thank you', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (3, 3, 3, 'Is this available?', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 3, 3, 'Yes. What are you offerring?', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (3, 3, 3, '145', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 3, 3, 'Sold!', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (3, 3, 3, 'Thank you', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 5, 'is this available', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 2, 5, 'yes. What are you offerring?', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (3, 3, 5, 'is this available', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 3, 5, 'yes. someone else is also looking?', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 5, '145', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (1, 2, 5, 'Sold!', Now());
INSERT INTO conversations (from_id, buyer_id, item_id, message, message_date)
VALUES (2, 2, 5, 'Thank you', Now());
