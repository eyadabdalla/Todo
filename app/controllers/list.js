
/**
 * Module dependencies.
 */

var User = require('../models/user');

exports.todoList = function (req, res, next) {
    User.find({ $and: [ { todos: { isFulfilled: false } }, { todos: { isFulfilled: true } }, { email: req.user.email } ] }, function (err, todo) {
        if (err) return next(err);

        if (todo) res.send(todo);
    });
}

