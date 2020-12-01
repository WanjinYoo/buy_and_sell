

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
};
