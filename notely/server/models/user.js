var db = require('../config/db');
var UserSchema = require('./user-schema');

//create a model
var User = db.model('User', UserSchema);

module.exports = User;