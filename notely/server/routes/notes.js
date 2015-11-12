var router = require('express').Router();
var Note = require('../models/note');
// Allow CORS and additional headers
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();

});

// List all notes
router.get('/', function(req, res) {
    Note.find().sort({
        updated_at: -1
    }).then(function(notes) {
        res.json(notes);
    });
});

// Create a new note
router.post('/', function(req, res) {
    var note = new Note({
        title: req.body.note.title,
        body_html: req.body.note.body_html
    });

    note.save().then(function(noteData) {
        res.json({
            message: 'Saved!',
            note: noteData
        });
    });
});

// update an existing note
router.put('/:id', function(req, res) {
    Note.findOne({
        _id: req.params.id
    }).then(function(note) {
        note.title = req.body.note.title;
        note.body_html = req.body.note.body_html;
        note.save().then(function() {
            res.json({
                message: 'you can haz change',
                note: note
            });
        });
    });
});
//delete an existing note
router.delete('/:id', function(req, res) {
    Note.findOne({
        _id: req.params.id
    }).then(function(note) {
        note.remove().then(function() {
            res.json({
                message: 'you can haz delete',
                note: note
            });
        });
    });
});

module.exports = router;