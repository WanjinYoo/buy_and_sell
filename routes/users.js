/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
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
  
  router.get("/main", (req, res) => {
    const userId = req.session[`userId`];
    let userName = '';
    let is_admin = false;
    if (userId) {
      userHelpers.getUserById(db,userId)
        .then(data => {
          userName = data.rows[0].name;
          is_admin = data.rows[0].is_admin;
          return itemHelpers.fetchCardItems(db);
        })
        .then(data => {
          const cardItems = data.rows;
          const time = [];
          for (const index in cardItems) {
            time.push(moment(cardItems[index][`date_listed`]).startOf('hour').fromNow());
          }
          const templateVars = {
            cardItems,
            userName: userName,
            isAdmin: is_admin,
            time
          };
          res.render('index', templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      itemHelpers.fetchCardItems(db)
        .then(data => {
          const cardItems = data.rows;
          const time = [];
          for (const index in cardItems) {
            time.push(moment(cardItems[index][`date_listed`]).startOf('hour').fromNow());
          }
          const templateVars = {
            cardItems,
            userName: userName,
            isAdmin: is_admin,
            time
          };
          res.render('index', templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }
  });


  return router;
};
