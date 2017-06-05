
/**
* Module dependencies
*/

var List = require('../app/controllers/list.js');

module.exports = function(app, passport) {
    /**
    *loads home page
    */
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    /**
    *loads log in page
    */
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    /**
    *login form processing
    */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    /**
    *loads sign up form
    */
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    /**
    *signup form processing
    */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /**
    *user profile section
    */
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user //passing user data into the template
        });
    });

    /**
    *logout
    */
    app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

    /**
    *check logged in status
    */
    function isLoggedIn(req, res, next) {  //Pull this out into a function!!
        if (req.isAuthenticated()) return next();

        res.redirect('/');
    }

    app.get('/list', List.todoList);
};