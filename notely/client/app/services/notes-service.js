angular.module('notely')
.service('NotesService', NotesService);

//NotesService
//handle crud operations against the server.
NotesService.$inject = ['$http'];
function NotesService($http){
  var self = this;
  self.notes = [];

//get all notets from server
self.fetch = function(callback){
  $http.get('http://localhost:3000/notes')
  // on success
  .success(function(notesData){
    console.log(notesData);
    self.notes = notesData;
    if (callback){
      callback();
    }
  });
};
self.get = function(){
  return self.notes;
  };
}
