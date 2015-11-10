angular.module('notely')
.service('NotesService', NotesService);

//NotesService
//handle crud operations against the server.
NotesService.$inject = ['$http'];
function NotesService($http){
  this.notes = [];

//get all notets from server
this.fetch = function(){
  $http.get('http://localhost:3000/notes')
  // on success
  .success(function(notesData){
    console.log(notesData);
  });
};
}
