const express = require('express');
const router  = express.Router();
const msgHelpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');
const userFavHelpers = require('../db/helper/userFavourites.js');
module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session[`userId`];
    let userName = '';
    let is_admin = false;
    userHelpers.getUserById(db,userId)
      .then(data => {
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
                  res.render('items', templateVars);
                })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
