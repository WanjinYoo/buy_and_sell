const express = require('express');
const router = express.Router();
const msgHelpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');
const itemHelpers = require('../db/helper/items.js');
const userFavHelpers = require('../db/helper/userFavourites.js');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const userId = req.session['userId'];

    userHelpers.getUserById(db, userId)
      .then(data => {
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        itemHelpers.fetchItems(db)
          .then(data => {
            let items = []
            if (req.query.sort === 'price-asc') {
              items = data.rows.sort(function (a, b) {
                return a.price - b.price;
              });
            } else if (req.query.sort === 'price-desc') {
              items = data.rows.sort(function (a, b) {
                return b.price - a.price;
              });
            } else {
              items = data.rows;
            }

              userFavHelpers.fetchUserFavourites(db, userId)
                .then(data => {
                  let itemsArray = data.rows.map(function(obj) { return obj.item_id; });
                  templateVars = {
                    items,
                    userName,
                    isAdmin,
                    itemsArray,
                  };
                  res.render('items', templateVars);

                })
              })
            })
                .catch(err => {
                  res
                  .status(500)
                  .json({ error: err.message });
                });
  });

  router.post("/priceFilter", (req, res) => {

    const userId = req.session['userId'];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const userName = data.rows[0].name;
        const isAdmin = data.rows[0].is_admin;
        itemHelpers.fetchItems(db)
          .then(data => {
            itemHelpers.minMaxFilter(db, req.body.min, req.body.max)
              .then(data => {
                const items = data.rows.sort(function (a, b) {
                  return a.price - b.price;
                });
                templateVars = {
                  items,
                  userName,
                  isAdmin
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
  });


  router.post("/favs/:id", (req, res) => {
    const userId = req.session['userId'];
    const itemId = req.params.id;
    const add = 1
    const remove = -1
    // MAKE A FUNCTION CHECKING TO SEE IF LIKE FIRST THEN RUN THE HAS LIKED?
    userFavHelpers.hasLiked(db, userId, itemId)
      .then(data => {
        if (data.rows.length === 0) {
          userFavHelpers.addToFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, +1)
                .then(data => {
                  console.log('Likes Updated');
                })
            });
        } else {
          userFavHelpers.deleteFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, -1)
                .then(data => {
                  console.log('REMOVED LIKE');
                })
            })
        }
        res.redirect("/api/items");
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
