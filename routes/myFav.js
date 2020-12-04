const express = require('express');
const router  = express.Router();
const userHelpers = require('../db/helper/users.js');
const itemHelpers = require('../db/helper/items.js');
const userFavHelpers = require('../db/helper/userFavourites.js');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session[`userId`];
    userHelpers.getUserById(db,userId)
      .then(data => {
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        itemHelpers.getUserFavouriteItems(db, userId)
          .then(data => {
            const items = data.rows;
            userFavHelpers.getAllUserFavouritesById(db, userId)
              .then(data =>{
                let itemsArray = data.rows.map(function(obj) {
                  return obj.item_id;
                });
                const templateVars = {
                  items,
                  userName,
                  isAdmin,
                  itemsArray
                };
                res.render('myFavs', templateVars);
              });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/favs", (req, res) => {
    const userId = req.session[`userId`];
    userHelpers.getUserById(db,userId)
      .then(data => {
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        itemHelpers.getUserFavouriteItems(db, userId)
          .then(data => {
            const items = data.rows;
            userFavHelpers.getAllUserFavouritesById(db, userId)
              .then(data =>{
                let itemsArray = data.rows.map(function(obj) {
                  return obj.item_id;
                });
                const templateVars = {
                  items,
                  userName,
                  isAdmin,
                  itemsArray
                };
                res.send(templateVars);
              });
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
