(function() {
  'use strict';
  angular
    .module('norsegods', ['ngRoute'])
    .config(config);

    function config($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/main'
      });
    }

})();
