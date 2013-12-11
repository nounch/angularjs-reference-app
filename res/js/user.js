angular.module('user', ['ngRoute', 'infos'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/settings', {
        controller: 'SettingsCtrl',
        templateUrl: 'settings.html'
      })
      .when('/info/:infoId', {
        controller: 'InfoCtrl',
        templateUrl: 'info.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('UserCtrl', ['diverseInfo', function(diverseInfo) {
    var self = this;
    this.userName = '';
    this.messageType = 'success';
    this.message = ''
    this.userNameSubmit = function() {
      this.authenticated = true;
      angular.forEach(diverseInfo.blockedUserNames, function(userName) {
        if (self.userName.match(new RegExp(userName, 'g'))) {  // XXX
          self.authenticated = false;
        }
      });
      if (this.authenticated) {
        self.message = this.userName +
          ', you have successfully set your user name.';
        self.messageType = 'success';
      } else {
        self.message = self.userName +
          ' is not a valid user name.';
        self.messageType = 'alert';
      }
      this.successMessage = self.message;
      this.userHasSubmitted = true;
    };
  }])
  .controller('SettingsCtrl', function($scope) {

  })
  .controller('InfoCtrl', ['$scope', '$routeParams', function(
    $scope, $routeParams) {
    $scope.infoId = $routeParams.infoId;
  }])
  .controller('colorCtrl', ['$scope', '$http', function($scope, $http) {
    var self = this;
    this.colors = [];
    this.retrieveColors = function() {
      var jsonData;
      $http.get('res/json/colors.json').success(function(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          self.colors[i] = data[keys[i]];
        }
      });
    };
  }])
;
