const express = require('express');
const router = express.Router();
const msgHelpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');
const itemHelpers = require('../db/helper/items.js');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const userId = req.session['userId'];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        db.query(`SELECT * FROM items;`)
          .then(data => {

            let items = []
            if (req.query.sort === 'price') {
              items = data.rows.sort(function (a, b) {
                return a.price - b.price;
              });
            } else {
              items = data.rows;
            }
            templateVars = {
              items,
              userName,
              isAdmin
            };

            res.render('items', templateVars);
          })

          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });

  router.get("/createlisting", (req, res) => {
    const userId = req.session[`userId`];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const isAdmin = data.rows[0].is_admin;
        const userName = data.rows[0].name;
        const templateVars = { isAdmin, userName };
        if (isAdmin) {
          res.render("createlisting", templateVars)
        } else {
          res.redirect("/")
        }
      })
  });

  router.get("/:id", (req, res) => {
    const userId = req.session[`userId`];
    userHelpers.getUserById(db, userId)

      .then(data => {
        const isAdmin = data.rows[0].is_admin;
        const userName = data.rows[0].name;
        db.query(`SELECT * FROM items
      WHERE id = ${req.params.id}

      ;`)
          .then(data => {

            const items = data.rows;
            const templateVars = {
              items,
              userName,
              messageUrl: req.session,
              isAdmin
            };
            res.render('specific_item', templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });

  router.post("/created", (req, res) => {

    itemHelpers.createdListing(db, req.body.text)
      .then(data => {
        const newItem = data.rows[0].id;
        res.redirect(`/api/items/${newItem}`)
      })

  });


  router.post("/:id/delete", (req, res) => {
    itemHelpers.deleteItem(db, req.params.id)
      .then(data => {
        console.log('DELTED THIS ITEM')
        res.redirect('/api/items')
      })
  });

  router.post("/:id/sold", (req, res) => {
    itemHelpers.soldItem(db, req.params.id)
      .then(data => {
        console.log('MARKED AS SOLD');
        res.redirect('/api/items')
      })
  });


  return router;
};
