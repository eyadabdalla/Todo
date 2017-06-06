
/**
* Module dependencies
*/

var List = require('../app/controllers/list.js');

module.exports = function(app, passport) {
    //loads landing page
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    //loads log in page
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    //login form processing 
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));

    //loads sign up form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    //processes sign up form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // creates a todo
    app.post('/create', List.create);

    //loads home on login
    app.get('/home', isLoggedIn, List.todoList)
 
    //logs user out
    app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

    //protects pages with login
    function isLoggedIn(req, res, next) {  //Pull this out into a function!!
        if (req.isAuthenticated()) return next();

        res.redirect('/');
    }

};