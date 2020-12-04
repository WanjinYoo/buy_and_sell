/** This file contains all the database queries for the items table */

/** Global Declarations */
let queryString = '';
let queryParams = [];

/** Fetch all the items from the database. Used to populate the items page. */
const fetchItems = (db) =>{
  queryString = `
  SELECT *
  FROM items
  WHERE sold = 'N' AND deleted = 'N'
  ORDER BY id DESC;`;

  return db.query(queryString);
};

/** Fetching all records between the minimum and maximum prices selected for filtering */
const minMaxFilter = (db, min, max) =>{
  queryParams = [
    min,
    max
  ];
  queryString = `
  SELECT *
  FROM items
  WHERE price <= $2 AND price >= $1;`;

  return db.query(queryString, queryParams);
};

/** Mark item as DELETED. Deleted items are always maintained in the database for posterity */
const deleteItem = (db, itemId) => {
  queryParams = [
    itemId
  ];
  queryString = `
  UPDATE items
  SET deleted = TRUE
  WHERE id = $1;`;
  return db.query(queryString, queryParams);
};

/** Mark item as SOLD. Sold items are always maintained in the database for posterity */
const soldItem = (db, itemId) => {
  queryParams = [
    itemId
  ];
  queryString = `
  UPDATE items
  SET sold = TRUE
  WHERE id = $1;`;
  return db.query(queryString, queryParams);
};

/** This query returns 3 newest items from the items table to be displayed on the home page */
const fetchCardItems = (db) => {
  queryString = `
  SELECT id, title,date_listed,price,description,thumbnail_photo_url
  FROM items
  WHERE sold = 'N' AND deleted = 'N'
  Order by date_listed
  LIMIT 3;`;
  return db.query(queryString);
};

/** Create a new item in the items table from the CreateListing page.*/
const createdListing = (db, itemDetails) => {
  queryParams = [
    itemDetails.title,
    itemDetails.description,
    itemDetails.url,
    itemDetails.price,
  ];

  queryString = `
  INSERT INTO items (title, description, thumbnail_photo_url, price)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  return db.query(queryString, queryParams);
};

/** Update the number of likes for specific item when the favourites button is clicked */
const updateNumOfLikes = (db, itemId, incrementVal) => {
  queryParams = [
    itemId,
    incrementVal
  ];
  queryString = `
  UPDATE items
  SET number_of_likes = number_of_likes + $2
  WHERE id = $1;`;

  return db.query(queryString, queryParams);
};

/** Get all favourited items by userId */
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

const getItemsById = (db, userId) => {
  queryParams = [userId];
  queryString = `
  SELECT * 
  FROM items
  WHERE id = $1;`;

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
  getItemsById,
};
