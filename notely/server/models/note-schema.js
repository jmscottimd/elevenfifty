var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');

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
	this.body_html = sanitizeHtml(this.body_html);
	this.body_text = htmlToText.fromString(this.body_html);
	this.updated_at = Date.now();
	next();
});

module.exports = NoteSchema;
