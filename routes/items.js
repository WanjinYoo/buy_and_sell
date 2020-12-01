const express = require('express');
const router = express.Router();
const helpers = require('../db/helper/conversations.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT name
    FROM users
    Where id = ${req.session[`uesrid`]};`)

      .then(data => {
        const usersname = data.rows[0];
        req.session["username"] = usersname.name;
        db.query(`SELECT * FROM items;`)
        // QUERY FOR THINGS THAT ARE ONLY NOT DELETED OR MARKED AS DELETED
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

    const userId = req.session[`uesrid`];
    helpers.checkAdmin(db, userId)

      .then(data => {
        const isAdmin = data.rows[0].is_admin;
        const userName = data.rows[0].name;
        console.log(userName, isAdmin, '+++++++++++++++++');
        helpers.getAllConversationsByUser(db, userId, isAdmin)

        db.query(`SELECT * FROM items
        WHERE id = ${req.params.id}
        ;`)
        .then(data => {

            const items = data.rows
            templateVars = {
              items,
              username: req.session['username'],
              messageUrl: req.session,
              admin: isAdmin
            }
            res.render('specific_item', templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        });

  });

  router.post("/:id/delete", (req, res) => {
    console.log('DELTED THIS ITEM');
  });

  router.post("/:id/sold", (req, res) => {
    console.log('MARKED AS SOLD');
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
