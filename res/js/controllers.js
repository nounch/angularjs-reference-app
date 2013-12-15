angular.module('user', ['ngRoute', 'ngAnimate', 'infos', 'diverseService',
                        'confidenceFilters',])
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
      $http.get('res/json/colors.json').success(function(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          self.colors[i] = data[keys[i]];
        }
      });
    };

    this.selectedColor = '#FFFFFF';
    this.selectColor = function(color) {
      this.selectedColor = color;
    };

    // Attach to scope since the `animalSearchFilter' needs to be able to
    // read this.
    this.includeConfidenceInAnimalSearch = true;
    this.animals = [];
    this.retrieveAnimals = function() {
      $http.get('res/json/animals.json').success(function(data) {
        var keys = Object.keys(data);
        var animalName;
        for (var i = 0; i < keys.length; i++) {
          animalName = keys[i];
          self.animals[i] = {};
          self.animals[i]['name'] = animalName
          self.animals[i]['confidence'] = data[animalName];
        }
      })
    };
  }])
  .controller('diverseCtrl', ['$scope', 'Diverse', function($scope,
                                                            Diverse) {
    var self = this;
    this.diverse = Diverse.get({}, function(data) {
      self.diverse = data.diverse;
    });

    // Inline Editor
    // this.inlineEditorEnabled = false;
    this.enabledEditors = {};
    this.editableTexts = {};
    this.editableTexts = {};
    // Debugging
    self.currentModel = null;
    this.enableInlineEditor = function(text, id) {
      self.enabledEditors[id] = true;
      self.editableTexts[id] = text;
      // Debugging
      angular.forEach(self.diverse, function(item) {
        if (item.id == id) {
          self.currentModel = item;
        }
      });
    };
    this.disableInlineEditor = function(id) {
      self.enabledEditors[id] = false;
    };
    this.save = function(id) {
      angular.forEach(self.diverse, function(item) {
        // XXX: Inefficient. Use a different data structure.
        if (item.id == id) {
          item.name = self.editableTexts[id];
        }
      });
      self.disableInlineEditor(id);
    };
  }])
  .controller('customerCtrl', ['$scope', function($scope) {
    var self = this;
    this.priceCathegories = ['beginner', 'advanced', 'intermediate',
                             'expert'];
    this.employeeNumbers = ['< 10', '< 50', '< 100', '< 200', '> 200'];
    this.customer = {
      'firstName': '',
      'lasttName': '',
      'company': '',
      'country': '',
      'phone': '',
      'priceCathegory': '',
      'employeeNumber': '',
      'getWeeklyUpdates': false,
      'sendAnalyticsData': false,
      'comment': ''
    };

    this.submitCustomerData = function() {

    };
  }]);
