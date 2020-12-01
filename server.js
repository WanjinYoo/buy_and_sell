// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const path       = require('path');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const moment = require("moment");

app.use((req, res, next)=>{
  res.locals.moment = moment;
  next();
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set("view engine", "ejs");

app.use(cookieSession({
  name: 'session',
  keys: [`1`]
}));

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const conversationsRoutes = require("./routes/conversations");
const createMessage = require("./routes/createMessage");
const widgetsRoutes = require("./routes/widgets");
const myFavRoutes = require("./routes/myFav");
const cardsRoutes = require("./routes/cards");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/conversations", conversationsRoutes(db));
app.use("/api/createMessage", createMessage(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/myFav", myFavRoutes(db));
app.use("/api/cards", cardsRoutes(db));

// Note: mount other resources here, using the same pattern above




// /api/page is the json that we show on the "/" homepage

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.redirect("/api/cards");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
