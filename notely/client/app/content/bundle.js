'use strict';

(function () {
  var app = angular.module('notely', ['ui.router', 'notely.notes']);

  function config($urlRouterProvider) {
    // notes-form is the default
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);

  app.constant('API_BASE', 'http://localhost:3000/api/v1/');
})();
'use strict';

angular.module('notely').directive('signUp', function () {
	return {
		templateUrl: '/components/sign-up.html'
	};
});
'use strict';

(function () {

    angular.module('notely.notes', ['ui.router', 'textAngular']).config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];

    function notesConfig($stateProvider) {
        $stateProvider.state('notes', {
            url: '/notes',
            resolve: {
                notesLoaded: ['NotesService', function (NotesService) {
                    return NotesService.fetch();
                }]
            },
            templateUrl: '/notes/notes.html',
            controller: NotesController
        }).state('notes.form', {
            url: '/:noteId',
            templateUrl: '/notes/notes-form.html',
            controller: NotesFormController
        });
    }

    NotesController.$inject = ['$state', '$scope', 'NotesService'];

    function NotesController($state, $scope, NotesService) {
        $scope.note = {};
        $scope.notes = NotesService.get();
    }

    NotesFormController.$inject = ['$scope', '$state', 'NotesService'];

    function NotesFormController($scope, $state, NotesService) {
        $scope.note = NotesService.findById($state.params.noteId);

        $scope.save = function () {
            // Decide whether to call create or update...
            if ($scope.note._id) {
                NotesService.update($scope.note).then(function (response) {
                    $scope.note = angular.copy(response.data.note);
                });
            } else {
                NotesService.create($scope.note).then(function (response) {
                    $state.go('notes.form', {
                        noteId: response.data.note._id
                    });
                });
            }
        };

        $scope['delete'] = function () {
            NotesService['delete']($scope.note).then(function () {
                $state.go('notes.form', { noteId: undefined });
            });
        };
    }
})();

//
// reusable objects things that will always load
'use strict';

angular.module('notely').service('NotesService', NotesService);

//NotesService
//handle crud operations against the server.
NotesService.$inject = ['$http', 'API_BASE'];

function NotesService($http, API_BASE) {
    var self = this;
    self.notes = [];

    //get all notets from server
    self.fetch = function (callback) {
        return $http.get(API_BASE + 'notes').then(
        // success callback
        function (response) {
            self.notes = response.data;
        },
        // failure callback
        function (response) {
            // TODO: handle failure
        });
    };
    // return all notes
    self.get = function () {
        return self.notes;
    };
    // return a note by note id
    self.findById = function (noteId) {
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
    self.create = function (note) {
        var noteCreatePromise = $http.post(API_BASE + 'notes', {
            note: note
        });
        noteCreatePromise.then(function (response) {
            self.notes.unshift(response.data.note);
        });

        return noteCreatePromise;
    };
    self.update = function (note) {
        var noteUpdatePromise = $http.put(API_BASE + 'notes/' + note._id, {
            note: {
                title: note.title,
                body_html: note.body_html
            }
        });
        noteUpdatePromise.then(function (response) {
            self.replaceNote(response.data.note);
        });
        return noteUpdatePromise;
    };

    self.replaceNote = function (note) {
        // return a note by note id
        // look through 'self.notes' for a note with a matching  _id.
        for (var i = 0; i < self.notes.length; i++) {
            if (self.notes[i]._id === note._id) {
                self.notes[i] = note;
            }
        }
    };

    self['delete'] = function (note) {
        var noteDeletePromise = $http['delete'](API_BASE + 'notes/' + note._id);
        noteDeletePromise.then(function (response) {
            self.remove(response.data.note);
        });
        return noteDeletePromise;
    };
    self.remove = function (note) {
        for (var i = 0; i < self.notes.length; i++) {
            if (self.notes[i]._id === note._id) {
                self.notes.splice(i, 1);
                break;
            }
        };
    };
}
'use strict';

(function () {
  angular.module('notely').config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>'
    });
  };
})();
//# sourceMappingURL=bundle.js.map
