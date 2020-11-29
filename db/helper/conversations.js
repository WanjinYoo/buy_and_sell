/** Global Declarations */

let  queryString = '';
let queryParams = [];

const initQueryVars = (queryString, queryParams) => {
  queryString = '';
  queryParams = [];
};

const getAllConversationsByUser = (db) => {
  initQueryVars(queryString, queryParams);
  queryParams = [2];
  queryString = `
  SELECT items.title as item ,users.name as from, message from 
  conversations c join users on users.id=from_id
  join items on item_id=items.id
  where buyer_id = $1
  order by message_date;`;

  return db.query(queryString, queryParams);
};


module.exports = {
  getAllConversationsByUser,
};
