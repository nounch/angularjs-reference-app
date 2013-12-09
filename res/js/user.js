angular.module('user', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/settings', {
        controller: 'SettingsCtrl',
        templateUrl: 'settings.html'
      })
      .when('/info', {
        controller: 'InfoCtrl',
        templateUrl: 'info.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('UserCtrl', function($scope) {
    $scope.userNameSubmit = function() {
      this.successMessage = $scope.userName +
        ', you have successfully set your user name.';
      $scope.userHasSubmitted = true;
    };
  })
  .controller('SettingsCtrl', function($scope) {

  })
  .controller('InfoCtrl', function($scope) {

  });
