/** Global Declarations */

let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
  console.log(queryParams, 'query params INIT=-=-=-=-=-==-');
};

const checkAdmin = (db, userId) => {
  initQueryVars(queryString, queryParams);
  queryParams = [userId];
  queryString = `SELECT name, is_admin FROM users where id = $1;`;
  return db.query(queryString, queryParams);
};

const getAllConversationsByUser = (db, userId, isAdmin) => {
  initQueryVars(queryString, queryParams);
  queryParams = [userId];
  queryString = `
  SELECT items.id, items.title AS item ,users.name AS from, message, message_date AS date
  FROM conversations 
  JOIN users on users.id=from_id
  JOIN items on item_id=items.id `;
  if (!isAdmin) {
    queryString += `WHERE sold = 'false'
    AND buyer_id = $1 
    ORDER BY message_date;`;
    return db.query(queryString, queryParams);
  } else {
    queryString += `WHERE sold = 'false'
    ORDER BY message_date;`;
    return db.query(queryString);
  }
};

module.exports = {
  getAllConversationsByUser,
  checkAdmin,
};
