require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require('hbs');
const cors = require("cors");
const app = express();
const db = require("./app/models");
const secret  = process.env.SECRET
db.sequelize.sync().then(() => {
   console.log('Resync Db');
  });
const session = require('express-session');
const  fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: secret,
	resave: true,
	saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

var corsOptions = {
  origin: ["http://localhost:3000","http://localhost:4200","http://localhost"]
};
app.use(cors(corsOptions));
const path = require('path');
app.use('/', express.static(path.join(__dirname, '/public')));
app.set('/views', path.join(__dirname))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('eq', (a, b) => a == b);
require('./app/routes/web.routes')(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}.`);
});
