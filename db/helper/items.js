

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
  SELECT title,date_listed,price,description,thumbnail_photo_url
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
  RETURNING *;`
  return db.query(queryString, queryParams);
};

module.exports = {
  deleteItem,
  soldItem,
  createdListing,
  fetchCardItems,
};
