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
<<<<<<< HEAD
        userName = data.rows[0].name;
        is_admin = data.rows[0].is_admin;
        return userHelpers.getUserFavouriteItems(db,userId);
      })
      .then(data => {
        const items = data.rows;
        console.log(items);
        userFavHelpers.fetchUserFavourites(db, userId)
                .then(data =>{
                  let itemsArray = data.rows.map(function(obj) { return obj.item_id; });

                  const templateVars = {
                    items,
                    userName: userName,
                    isAdmin: is_admin,
                    itemsArray,
                  };
                  res.render('favorites', templateVars);
                })
=======
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        itemHelpers.getUserFavouriteItems(db, userId)
          .then(data => {
            const items = data.rows;
            userFavHelpers.fetchUserFavourites(db, userId)
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
                res.render('items', templateVars);
              });
          });
>>>>>>> db1bde112e45c98df745bce501ba7ec753a3b497
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
