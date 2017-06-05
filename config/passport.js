/**
*Passport configuration 
*/

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {
    
    /**
    * Serializing and deserializing user instances to and from the session maintained in cookie
    */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
    * Implementing the local strategy
    */

    // passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     User.findOne({ username: username }, function (err, user) {
    //       if (err) { return done(err); }
    //       if (!user) { return done(null, false); }
    //       if (!user.verifyPassword(password)) { return done(null, false); }
    //       return done(null, user);
    //     });
    //   }
    // ));

    /**
    * Local signup strategy 
    */
    passport.use( 'local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function (req, email, password, done) {
        User.findOne({ 'email' :  email }, function (err, user) {
            if (err) return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();

                // set the user's credentials
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser); 
                });
            }
        });  
    }));

    /**
    * Local login strategy 
    */
    passport.use( 'local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function (req, email, password, done) {
        User.findOne({ 'email' :  email }, function (err, user) {
            if (err) return done(err);

            if (!user) 
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password. Son.'));

            return done(null, user);
        });  
    }));
}
