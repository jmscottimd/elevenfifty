// reusable objects things that will always load
angular.module('notely')
    .service('NotesService', NotesService);

//NotesService
//handle crud operations against the server.
NotesService.$inject = ['$http'];

function NotesService($http) {
    var self = this;
    self.notes = [];

    //get all notets from server
    self.fetch = function(callback) {
        return $http.get('http://localhost:3000/notes')
            .then(
                // success callback
                function(response) {
                    self.notes = response.data;
                },
                // failure callback
                function(response) {
                    // TODO: handle failure
                }
            );
    };
    // return all notes
    self.get = function() {
        return self.notes;
    };
    // return a note by note id
    self.findById = function(noteId) {
        // look through 'self.notes' for a note with a matching  _id.
        for (var i = 0; i < self.notes.length; i++) {
            if (self.notes[i]._id === noteId) {
                // return copy for editing purposes
                return angular.copy(self.notes[i]);
            }
        }
        return {};
    };

    //save a note
    self.create = function(note) {
        var noteCreatePromise = $http.post('http://localhost:3000/notes', {
            note: note
        });
        noteCreatePromise.then(function(response) {
            self.notes.unshift(response.data.note);
        });

        return noteCreatePromise;

    };
    self.update = function(note) {
        var noteUpdatePromise = $http.put('http://localhost:3000/notes/' + note._id, {
            note: {
                title: note.title,
                body_html: note.body_html
            }
        });
        noteUpdatePromise.then(function(response) {
            self.replaceNote(response.data.note);
        });
        return noteUpdatePromise;
    };

    self.replaceNote = function(note) {
        // return a note by note id
        // look through 'self.notes' for a note with a matching  _id.
        for (var i = 0; i < self.notes.length; i++) {
            if (self.notes[i]._id === note._id) {
                self.notes[i] = note;
            }
        }

    };
}
