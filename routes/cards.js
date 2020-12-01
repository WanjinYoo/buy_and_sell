const express = require('express');
const router  = express.Router();
const moment = require("moment");
module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT title,date_listed,price,description,thumbnail_photo_url
         FROM items
         WHERE sold = 'N' AND deleted = 'N'
         Order by date_listed
         LIMIT 3;`)
      .then(data => {
        const cardItems = data.rows;
        const time = [];
        for (const index in cardItems) {
          const $time_Diff = new Date() - cardItems[index][`date_listed`];
          const duration = moment.duration($time_Diff, 'milliseconds');
          if ($time_Diff > 31556952000) {
            time.push(`${duration.years()} year(s) ago`);
          } else if ($time_Diff > 86400000) {
            time.push(`${duration.days()} day(s) ago`);
          } else if ($time_Diff > 3600000) {
            time.push(`${duration.hours()} hour(s) ago`);
          } else {
            time.push(`${duration.minutes()} minute(s) ago`);
          }
        }
        console.log(time);
        templateVars = {
          cardItems,
          userName: req.session['userName'],
          time
        };
        res.render('index', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
