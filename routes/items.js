const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT name
    FROM users
    Where id = ${req.session[`uesrid`]};`)

      .then(data => {
        const usersname = data.rows[0];
        req.session["username"] = usersname.name;
        db.query(`SELECT * FROM items;`)
          .then(data => {
            const items = data.rows
            templateVars = {
              items,
              username: req.session['username']
            }
            res.render('items', templateVars)
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });




  router.get("/:id", (req, res) => {

    // WHERE id = ${WHATEVER WAS CLICKED}

    db.query(`SELECT * FROM items
    WHERE id = 1
    ;`)
      .then(data => {
        const item = data.rows;
        res.json(item);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/create", (req, res) => {

    // WHERE id = ${WHATEVER WAS CLICKED}

    db.query(`SELECT * FROM items
    WHERE id = 1
    ;`)
      .then(data => {
        const item = data.rows;
        res.json(item);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
