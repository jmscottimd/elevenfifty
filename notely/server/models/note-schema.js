// pull in db connection
var db = require('../config/db');

//define schema
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  updated_at: { type: Date, default: Date.now }
});

//run this before saving to update timestamp
NoteSchema.pre('save', function  (next) {
	this.updated_at = Date.now();
	next();
});

module.exports = NoteSchema;
