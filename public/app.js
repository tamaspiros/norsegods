(function() {
  'use strict';
  angular
    .module('norsegods', ['ngRoute'])
    .config(config)
    .controller('GodsController', GodsController)
    .controller('GodController', GodController);

    function config($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/main',
        controller: 'GodsController'
      })
      .when('/character/:name', {
        templateUrl: 'views/character',
        controller: 'GodController'
      });
    }

    function GodsController($scope, $http) {
      $http.get('/api').then(function(result) {
        $scope.gods = result.data;
      });
    }

    function GodController($scope, $routeParams, $http) {
      var name = $routeParams.name;
      $http.get('/api/' + name).then(function(result) {
        $http.get('/api/image/' + name).then(function(binary) {
          $scope.image = binary.data;
          $scope.god = result.data
        });
      });
    }

})();
