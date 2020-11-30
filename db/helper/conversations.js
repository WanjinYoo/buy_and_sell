/** Global Declarations */

let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
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
    ORDER BY item_id, message_date;`;
    return db.query(queryString, queryParams);
  } else {
    queryString += `WHERE sold = 'false'
    ORDER BY item_id, message_date;`;
    return db.query(queryString);
  }
};

const addMsgFromBuyer = (db, messageObject) => {
  initQueryVars(queryString, queryParams);
  // console.log(messageObject, 'MESSAGE OBJECT TO WRITE...');
  queryParams = [
    messageObject.userId,
    messageObject.itemId,
    messageObject.message
  ];
  queryString = `INSERT INTO conversations (from_id, buyer_id, item_id, message)
  VALUES ($1, $1, $2, $3) RETURNING *;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  getAllConversationsByUser,
  checkAdmin,
  addMsgFromBuyer,
};
