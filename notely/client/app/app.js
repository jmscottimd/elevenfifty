(function() {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes',
    'flash'
  ]);

  function config($urlRouterProvider) {
  	// notes-form is the default
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);

  app.constant('API_BASE' , 'http://localhost:3000/api/v1/');
})();
