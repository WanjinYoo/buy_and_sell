/*
 * All routes for creating conversations are defined here
 * Since this file is loaded in server.js into /createMessage,
 *   these routes are mounted onto /createMessage
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const client  = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const router  = express.Router();
const helpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');

module.exports = function(db) {
  router.post('/:itemId/:userId/:buyerId', (req, res) => {
    const messageObject = {
      userId: req.params.userId,
      itemId: req.params.itemId,
      buyerId: req.params.buyerId,
      message: req.body.text
    };
    if (req.body.text.length !== 0) {
      helpers.addToConversations(db, messageObject)
        .then((data) => {
          Promise.resolve((data.rows[0]));
          const userId = req.session[`userId`];
          userHelpers.getUserById(db, userId)
            .then(data => {
              const isAdmin = data.rows[0].is_admin;
              const sellerName = data.rows[0].name;
              if (isAdmin) {
                userHelpers.getUserById(db, req.params.buyerId)
                  .then(data => {
                    const buyerPhoneNumber = data.rows[0].phone;
                    client.messages
                      .create({
                        to: buyerPhoneNumber,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        body: `Message from ${sellerName} - ${req.body.text}. Please login to respond.`
                      })
                      .then((message) => console.log(message.sid));
                  });
              }
              res.redirect('/conversations');
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