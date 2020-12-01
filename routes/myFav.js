const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

    db.query(`select * from items join user_favourites on items.id = user_favourites.item_id where user_favourites.user_id =
    ${req.session[`userId`]};`)
      .then(data => {
        console.log(req.session[`userId`]);
        const items = data.rows;
        const templateVars = {
          items,
          userName: req.session['userName']
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
