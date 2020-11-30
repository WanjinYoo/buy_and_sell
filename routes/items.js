const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.query.sort);
    db.query(`SELECT name
    FROM users
    Where id = ${req.session[`uesrid`]};`)

      .then(data => {
        const usersname = data.rows[0];
        req.session["username"] = usersname.name;
        db.query(`SELECT * FROM items;`)

          .then(data => {

            let items = [];
            if (req.query.sort === 'price') {
              items = data.rows.sort(function (a, b) {
                return a.price - b.price;
              });
            } else {
              items = data.rows
            }
            templateVars = {
              items,
              username: req.session['username']
            }
            // console.log(req);
            res.render('items', templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(`SELECT name
    FROM users
    Where id = ${req.session[`uesrid`]};`)

      .then(data => {
        const usersname = data.rows[0];
        req.session["username"] = usersname.name;
        db.query(`SELECT * FROM items
        WHERE id = ${req.params.id}
        ;`)
          .then(data => {
            const items = data.rows
            // res.json(items);
            templateVars = {
              items,
              username: req.session['username']
            }
            res.render('specific_item', templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });

      })
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
