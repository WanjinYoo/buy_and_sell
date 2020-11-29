/** Global Declarations */

let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

const getAllConversationsByUser = (db, userId) => {
  initQueryVars(queryString, queryParams);
  queryParams = [userId];
  queryString = `
  SELECT items.title AS item ,users.name AS from, message , message_date AS date
  FROM conversations 
  JOIN users on users.id=from_id
  JOIN items on item_id=items.id
  WHERE buyer_id = $1
  ORDER BY date;`;

  return db.query(queryString, queryParams);
};


module.exports = {
  getAllConversationsByUser,
};
