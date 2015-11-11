(function() {
    angular.module('notely.notes', [
            'ui.router'
        ])
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];

    function notesConfig($stateProvider) {
        $stateProvider

            .state('notes', {
                url: '/notes',
                // resolve fetch before moving on
                resolve: {
                  notesLoaded: ['NotesService' ,function(NotesService){
                    return NotesService.fetch();
                  }]
                },
                templateUrl: '/notes/notes.html',
                controller: NotesController
            })
            .state('notes.form', {
                url: '/:noteId',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });
    }

    NotesController.$inject = ['$state', '$scope', 'NotesService'];

    function NotesController($state, $scope, NotesService) {

        NotesService.fetch().then(function() {
            $scope.notes = NotesService.get();
        });
    }

    NotesFormController.$inject = ['$scope', '$state', 'NotesService'];

    function NotesFormController($scope, $state, NotesService) {
        $scope.note = NotesService.findById($state.params.noteId);
        
        $scope.save = function() {
            NotesService.save($scope.note);
        };
    }
})();
