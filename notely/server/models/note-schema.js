// pull in db connection
var db = require('../config/db');

//define schema
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  updated_at: { type: Date, default: Date.now }
})
module.exports = NoteSchema;
