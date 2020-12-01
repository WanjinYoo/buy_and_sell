/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');

module.exports = function(db) {
  router.get("/:id", (req, res) => {
    const userId = req.session[`userId`];
    const itemId = req.params.id;
    userHelpers.getUserById(db, userId)
      .then(data => {
        // const isAdmin = data.rows[0].is_admin;
        const userName = data.rows[0].name;
        const templateVars = {userId, itemId, userName};
        res.render('createMessage', templateVars);
      });
  });

  router.post('/:itemId/:userId/:buyerId', (req, res) => {
    // console.log('back from the form...+++++++++++++++++++');
    // console.log(req.body, req.body.text.length, '++++++++++++++++++++++');
    // console.log(req.params, 'PARAMS.......');
    const messageObject = {
      userId: req.params.userId,
      itemId: req.params.itemId,
      buyerId: req.params.buyerId,
      message: req.body.text
    };
    if (req.body.text.length !== 0) {
      helpers.addMsgFromBuyer(db, messageObject)
        .then((data) => {
          // console.log(data.rows[0]);
          Promise.resolve((data.rows[0]));
          const userId = req.session[`userId`];
          userHelpers.getUserById(db, userId)
            .then(data => {
            // const isAdmin = data.rows[0].is_admin;
              const userName = data.rows[0].name;
              const templateVars = {userName};
              res.redirect('/');
            })
            .catch(e => {
              console.error(e);
              Promise.reject(e);
            });
        });
    }
  });
  return router;
};