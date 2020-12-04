
/** Global Declarations */
let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

const getUserById = (db, userId) => {
  initQueryVars(queryString, queryParams);
  queryParams = [userId];
  queryString = `
  SELECT name, phone, email, is_admin 
  FROM users 
  WHERE id = $1;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  getUserById,
};
