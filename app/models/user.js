
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email : { type : String, default : '', trim : true }, 
    password : { type : String, default : '', trim : true },
    todos : [{
        body: { type : String, default : '', trim : true,
        isFulfilled : { type : Boolean, default : false},
        created : { type : Date, default : Date.now }
        }
    }]
});

/**
 * Methods
 */

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);