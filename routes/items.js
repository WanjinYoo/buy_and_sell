const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then(data => {
        const items = data.rows
        res.json({items});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
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
