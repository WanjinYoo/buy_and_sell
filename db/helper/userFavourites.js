const addToFavourites = (db, userId, itemId) => {
  queryParams = [
    userId,
    itemId,
  ]
  queryString = `
  INSERT INTO user_favourites (user_id, item_id)
  VALUES
  ($1, $2)
  RETURNING *;
  `;
  return db.query(queryString, queryParams);
};

const fetchFavs = (db) => {
  queryString = `SELECT * FROM user_favourites`
  return db.query(queryString);
}

const fetchUserFavourites = (db, userId) => {
  queryParams = [
    userId,
  ]

  queryString = `SELECT item_id FROM user_favourites
  WHERE user_id = $1;`;

  return db.query(queryString, queryParams);
}
const fetchTotalFavourites = (db, itemId) => {
  queryParams = [
    itemId
  ]
  queryString = `SELECT item_id, COUNT(user_id)
  FROM user_favourites
  WHERE item_id = $1
  GROUP BY item_id;`

  return db.query(queryString, queryParams);
};

const deleteFavourites = (db, userId, itemId) => {
  queryParams = [
    userId,
    itemId,
  ]
  queryString = `
  DELETE FROM user_favourites
  WHERE user_id = $1 AND item_id = $2;`;
  return db.query(queryString, queryParams);
};

// Check to see if someone has already liked and item and IF they have then unlike else Like and add to favs
const hasLiked = (db, userId, itemId) => {

  queryParams = [
    userId,
    itemId,
  ]
  queryString = `SELECT * FROM user_favourites WHERE user_id = $1 AND item_id = $2;`;
  return db.query(queryString, queryParams);
};


module.exports = {
  hasLiked,
  addToFavourites,
  deleteFavourites,
  fetchFavs,
  fetchUserFavourites,
  fetchTotalFavourites,
}
