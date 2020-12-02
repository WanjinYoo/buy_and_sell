let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

const getUserById = (db, userId) => {
  initQueryVars(queryString, queryParams);
  queryParams = [userId];
  queryString = `SELECT name, phone, email, is_admin FROM users where id = $1;`;
  return db.query(queryString, queryParams);
};
const getUserFavouriteItems = (db,userId) => {
  queryParams = [userId];
  queryString = `SELECT * from items join user_favourites on items.id = user_favourites.item_id where user_favourites.user_id = $1;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  getUserById,
  getUserFavouriteItems,
};
