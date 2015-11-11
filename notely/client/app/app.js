(function() {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes'
  ]);

  function config($urlRouterProvider) {
  	// notes-form is the default
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
})();
