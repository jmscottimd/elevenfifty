var express = require('express');
var app = express();

// db connection
var db = require('mongoose');
db.connect('mongodb://jmscottmongo:mosdef@ds041623.mongolab.com:41623/notelydb');

//define schema
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  updated_at: { type: Date, default: Date.now }
})

//create a model
var Note = db.model('Note', NoteSchema);

// allow CORS
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// list all notes
app.get('/notes', function(req, res){
// retrieve notes in collection from mongodb
  Note.find().then(function(notes){
    res.json(notes);
  });
});

app.listen(3000, function(){
  console.log('Listening on http://localhost:3000');
});
