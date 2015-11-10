// db connection
var db = require('mongoose');
db.connect('mongodb://jmscottmongo:mosdef@ds041623.mongolab.com:41623/notelydb');

module.exports = db;
