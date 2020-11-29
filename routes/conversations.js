/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../db/helper/conversations.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    helpers.getAllConversationsByUser(db)
    // db.query(`SELECT * FROM conversations;`)
      .then(data => {
        const conversations = data.rows;
        res.json({ conversations });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};