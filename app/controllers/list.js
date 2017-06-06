
/**
 * Module dependencies.
 */

var User = require('../models/user');

exports.todoList = function (req, res, next) {
    //query 
    User.find({ $and: [ { todos: { isFulfilled: false } }, { todos: { isFulfilled: true } }, { email: req.user.email } ] }, function (err, todoList) {
        if (err) return next(err);
        var testList = [{
            body : "testing body 1"
        },
        {
            body : "testing body 2"
        }]
        // if (todoList) res.send(todoList);

            res.render('list.ejs', {
            todoList : todoList,
            user : req.user 
            });
    });
}

exports.create = function (req, res, next) {
    User.update(
        { email : req.user.email },
        { $push : { body : "testing body"} }, function (err, count) {
            if( err ) return next( err );
            res.redirect( '/home' );
        });
    // console.log('testing create', req.body);
}
