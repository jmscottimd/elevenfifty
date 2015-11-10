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
  return $http.get('http://localhost:3000/notes')
  .then(
  // success callback
  function(response) {
    self.notes = response.data;
  },
  // failure callback
  function (response){
    // TODO: handle failure
    }
  );
};
self.get = function(){
  return self.notes;
  };
}
