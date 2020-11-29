
const getAllConversationsByUser = (db) => {
  return db.query(`SELECT * FROM conversations;`);
};

module.exports = {
  getAllConversationsByUser,
};
