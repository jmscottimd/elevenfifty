var db = require('../config/db');
var NoteSchema = require('./note-schema');

//create a model
var Note = db.model('Note', NoteSchema);

module.exports = Note;
