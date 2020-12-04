/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userHelpers = require('../db/helper/users.js');
const itemHelpers = require('../db/helper/items.js');
const moment = require("moment");

module.exports = (db) => {

  router.get("/login/:id", (req, res) => {
    req.session[`userId`] = req.params.id;
    res.redirect('/users/main');
  });

  router.get("/logout", (req, res) => {
    req.session[`userId`] = null;
    res.redirect('/users/main');
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/users/main');
  });
  
  router.get("/main", (req, res) => {
    const userId = req.session[`userId`];
    userHelpers.getUserById(db,userId)
      .then(data => {
        let userName = '';
        let isAdmin = false;
        if (data.rows.length === 0) {
          userName = '';
          isAdmin = false;
        } else {
          userName = data.rows[0].name;
          isAdmin = data.rows[0].is_admin;
        }
        itemHelpers.fetchCardItems(db)
          .then(data => {
            const cardItems = data.rows;
            const time = [];
            for (const index in cardItems) {
              time.push(moment(cardItems[index][`date_listed`]).startOf('hour').fromNow());
            }
            const templateVars = {
              cardItems,
              userId,
              userName,
              isAdmin,
              time
            };
            res.render('index', templateVars);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
