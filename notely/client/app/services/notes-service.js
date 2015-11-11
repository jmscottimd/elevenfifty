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
    self.findByID = function(noteID) {
        // look through 'self.notes' for a note with a matching  _id.
        for (var i = 0; i < self.notes.length; i++) {
          if(self.notes[i]._id === noteId){
            return self.notes[i];
          }
        }
        return{};
    };

    //save a note
    self.save = function(note) {
        $http.post('http://localhost:3000/notes', {
            note: note
        }).then(function(response) {
            self.notes.unshift(response.data.note);
        });
    }
}
