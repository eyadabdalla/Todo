
/**
 * Module dependencies.
 */

var User = require('../models/user');

exports.todoList = function (req, res, next) {
    User.find({ isFulfilled : false }, function (err, todo) {
        if (err) return next(err);

        if (todo) res.send(todo);
    });
}

