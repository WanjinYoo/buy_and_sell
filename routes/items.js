const express = require('express');
const router = express.Router();
const msgHelpers = require('../db/helper/conversations.js');
const userHelpers = require('../db/helper/users.js');
const itemHelpers = require('../db/helper/items.js');
const userFavHelpers = require('../db/helper/userFavourites.js');
const { restart } = require('nodemon');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['userId'];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const userName = data.rows[0].name
        const isAdmin =  data.rows[0].is_admin
        templateVars = {userName, isAdmin}
    res.render("items", templateVars)
      })
  });

  router.get("/data", (req, res) => {
    const userId = req.session['userId'];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const userName = data.rows[0].name
        const isAdmin =  data.rows[0].is_admin
        itemHelpers.fetchItems(db)
          .then(data => {
            let items = [];
            console.log(req.query, "****************************************");
            if (req.query.sort === 'price-asc') {
              items = data.rows.sort(function(a, b) {
                return a.price - b.price;
              });
            } else if (req.query.sort === 'price-desc') {
              items = data.rows.sort(function(a, b) {
                return b.price - a.price;
              });
            } else if (req.query.sort === 'date-new') {
              items = data.rows.sort(function(a, b) {
                return b.date_listed - a.date_listed;
              });
            } else if (req.query.sort === 'date-old') {
              items = data.rows.sort(function(a, b) {
                return a.date_listed - b.date_listed;
              });
            } else {

              items = data.rows;
            }

            userFavHelpers.getAllUserFavouritesById(db, userId)
              .then(data => {
                let itemsArray = data.rows.map(function(obj) {
                  return obj.item_id;
                });
                console.log(itemsArray,"@()#*(&$@()*#&$)(*@#&$)(*&");
                const templateVars = {
                  items,
                  isAdmin,
                  itemsArray,
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

  // router.post("/ajaxFavs", (req, res) => {
  //   const userId = req.session['userId'];
  //   userFavHelpers.hasLiked(db, userId, req.body.itemId)
  //   .then(data => {
  //     if (data.rows.lenght === 0) {

  //     }
  //     const newData = JSON.stringify(data.rows)
  //     res.send(newData)
  //   })

  // });

  router.post("/ajaxFavs", (req, res) => {
    const userId = req.session['userId'];
    const itemId = req.body.itemId;
    // MAKE A FUNCTION CHECKING TO SEE IF LIKE FIRST THEN RUN THE HAS LIKED?
    userFavHelpers.hasLiked(db, userId, itemId)
      .then(data => {
        if (data.rows.length === 0) {
          userFavHelpers.addToFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, +1)
                .then(data => {
                  // no data this is an update
                });
            });
        } else {
          userFavHelpers.deleteFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, -1)
                .then(data => {
                  console.log('REMOVED LIKE');
                });
            });
        }
        res.send("WHAT TO SEND BACK OR DO I EVEN NEED TOO?")
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
                const items = data.rows.sort(function(a, b) {
                  return a.price - b.price;
                });
                userFavHelpers.getAllUserFavouritesById(db, userId)
                  .then(data => {
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
  });

  router.post("/favs/:id", (req, res) => {
    const userId = req.session['userId'];
    const itemId = req.params.id;
    // MAKE A FUNCTION CHECKING TO SEE IF LIKE FIRST THEN RUN THE HAS LIKED?
    userFavHelpers.hasLiked(db, userId, itemId)
      .then(data => {
        if (data.rows.length === 0) {
          userFavHelpers.addToFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, +1)
                .then(data => {
                  // no data this is an update
                });
            });
        } else {
          userFavHelpers.deleteFavourites(db, userId, itemId)
            .then(data => {
              itemHelpers.updateNumOfLikes(db, itemId, -1)
                .then(data => {
                  console.log('REMOVED LIKE');
                });
            });
        }
        res.redirect("/items");
      });
  });


  router.get("/createlisting", (req, res) => {
    const missing = false;
    const userId = req.session[`userId`];
    userHelpers.getUserById(db, userId)
      .then(data => {
        const isAdmin = data.rows[0].is_admin;
        const userName = data.rows[0].name;
        const templateVars = { isAdmin, userName, missing };
        if (isAdmin) {
          res.render("createlisting", templateVars);
        } else {
          res.redirect("/");
        }
      });
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
    const bod = req.body
    const title = bod.title.length
    const price = bod.price.length
    const url = bod.url.length
    const desc = bod.description.length
    const content = [title,price,url,desc]

    // Checks to see if the length of ANY input is 0 then stops and redirects the page
    for (const len of content) {
      if (len === 0) {
        return res.redirect("/items/createlisting")
      }
    }

    // if all are filled out properly then we create listing and send to specific page to see how it looks
    itemHelpers.createdListing(db, req.body)
      .then(data => {
        const newItem = data.rows[0].id;
        console.log(data.rows[0]);
        res.redirect(`/items/${newItem}`);
      });
  });


  router.post("/:id/delete", (req, res) => {
    console.log();
    itemHelpers.deleteItem(db, req.params.id)
      .then(data => {
        console.log('DELTED THIS ITEM');
        res.redirect('/items');
      });
  });

  router.post("/:id/sold", (req, res) => {
    itemHelpers.soldItem(db, req.params.id)
      .then(data => {
        console.log('MARKED AS SOLD');
        res.redirect('/items');
      });
  });


  return router;
};
