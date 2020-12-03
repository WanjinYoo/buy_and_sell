let queryString = '';
let queryParams = [];

const fetchItems = (db) =>{
  queryString = `SELECT * FROM items ORDER BY id;`;
  return db.query(queryString);
};
const minMaxFilter = (db, min, max) =>{
  queryParams = [
    min,
    max
  ];
  queryString = `SELECT * FROM items
 WHERE price <= $2 AND price >= $1;`;

  return db.query(queryString, queryParams);
};

const deleteItem = (db, itemId) => {
  return db.query(`
  UPDATE items
  SET deleted = TRUE
  WHERE id = ${itemId};
  `);
};
const soldItem = (db, itemId) => {
  return db.query(`
  UPDATE items
  SET sold = TRUE
  WHERE id = ${itemId};
  `);
};
const fetchCardItems = (db) => {
  return db.query(`
  SELECT id, title,date_listed,price,description,thumbnail_photo_url
  FROM items
  WHERE sold = 'N' AND deleted = 'N'
  Order by date_listed
  LIMIT 3;;
  `);
};

const createdListing = (db, itemDetails) => {
  queryParams = [
    itemDetails[0],
    itemDetails[3],
    itemDetails[2],
    itemDetails[1],
  ];
  queryString = `INSERT INTO items (title, description, thumbnail_photo_url, price)
VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  return db.query(queryString, queryParams);
};

const updateNumOfLikes = (db, itemId, incrementVal) => {
  queryParams = [
    itemId,
    incrementVal
  ];
  queryString =
  `UPDATE items
  SET number_of_likes = number_of_likes + $2
  WHERE id = $1;`;

  console.log(queryString);
  return db.query(queryString, queryParams);
};

const getUserFavouriteItems = (db,userId) => {
  queryParams = [userId];
  queryString = `
  SELECT items.* 
  FROM items 
  JOIN user_favourites ON items.id = user_favourites.item_id 
  WHERE user_favourites.user_id = $1 
  AND items.sold = 'N'
  AND items.deleted = 'N'
  ORDER BY items.id;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  deleteItem,
  soldItem,
  createdListing,
  fetchCardItems,
  updateNumOfLikes,
  fetchItems,
  minMaxFilter,
  getUserFavouriteItems,
};
