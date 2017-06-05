
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

/**
Database configs
*/
var configDB = require('./config/database.js');

require('./config/passport')(passport); // passing passport object to be configured

/**
env variables
*/
var env = process.env.NODE_ENV || 'development';    //Pull this into my environment variables 


mongoose.connect(configDB.db);

if (env !== 'test') app.use(morgan('log'));

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/**
Passport related
*/
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: configDB.db,
    store: new mongoStore({
      url: configDB.db,
      collection : 'sessions'
    })
  })); 

//Registering middlewares
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

/**
routes
*/
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Listening here ' + port);
