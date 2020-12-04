/** Global Declarations */
/** This file contains all database queries for the conversations table */

let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

/** Get all converstaions ordered by Buyer, Item and Message date. This data is listed out on the conversations page. */
const getAllConversationsByUser = (db, userId, isAdmin) => {
  initQueryVars(queryString, queryParams);
  queryString = `
  SELECT a.from_id, b.name AS from_name, a.buyer_id, c.name AS buyer_name, a.item_id, d.title AS item_name, a.message_date AS message_date, a.message AS message_text
  FROM conversations a
  JOIN users b ON b.id = a.from_id
  JOIN users c ON c.id = a.buyer_id
  JOIN items d ON d.id = a.item_id
  WHERE d.sold = 'false'
  AND d.deleted = 'false'
  `;
  if (!isAdmin) {
    queryParams = [userId];
    queryString += `AND a.buyer_id = $1 `;
  } else {
    queryParams = [];
  }
  queryString += `ORDER BY a.buyer_id, a.item_id, a.message_date;`;
  return db.query(queryString, queryParams);
};

/** This adds to the conversations table for all messages between buyer & seller */
const addToConversations = (db, messageObject) => {
  initQueryVars(queryString, queryParams);
  queryParams = [
    messageObject.userId,
    messageObject.buyerId,
    messageObject.itemId,
    messageObject.message
  ];
  queryString = `
  INSERT INTO conversations (from_id, buyer_id, item_id, message)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  getAllConversationsByUser,
  addToConversations,
};
