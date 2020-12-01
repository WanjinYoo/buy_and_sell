const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log(req.session[`userId`]);
    db.query(`select * from items join user_favourites on items.id = user_favourites.item_id where user_favourites.user_id = ${req.session[`userId`]};`)
      .then(data => {
        const items = data.rows;
        templateVars = {
          items,
          username: req.session['username']
        };
        res.render('items', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
