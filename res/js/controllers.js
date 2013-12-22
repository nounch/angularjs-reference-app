// angular.injector = (['routesService']);
angular.module('user', [
  'ngRoute',
  'ngAnimate',
  'infos',
  'diverseService',
  'confidenceFilters',
  'selfDocumenting',
])
  .provider('internalRoutes', function() {
    var self = this;
    this.routes = [
      {
        description: 'API',
        path: '/api',
        controller: 'apiUsageCtrl',
        templateUrl: 'partials/apiUsage.html',
      },
      {
        description: 'User',
        path: '/user',
        controller: 'UserCtrl',
        templateUrl: 'partials/user.html',
      },
    ];

    this.$get = function() {
      return function() {
        return self.routes;
      };
    };
  })
  .config(function($routeProvider, internalRoutesProvider) {
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

    angular.forEach(internalRoutesProvider.routes, function(route) {
      $routeProvider
        .when(route.path, {
          controller: route.controller,
          templateUrl: route.templateUrl,
        })
    });
  })
  .controller('RoutesCtrl', ['$scope', 'internalRoutes', '$location', function(
    $scope, internalRoutes, $location) {
    var self = this;

    this.routes = internalRoutes();

    this.subPage = '';
    this.setSubPage = function(templateUrl) {
      self.subPage = templateUrl;
    };

    $scope.$on('$routeChangeSuccess', function() {
      angular.forEach(internalRoutes(), function(route) {
        if (route.path == $location.path()) {
          self.subPage = route.templateUrl;
        }
      });
    });
  }])
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
      $http.get('res/json/colors.json').
        success(function(data, status, headers, config) {
          var keys = Object.keys(data);
          for (var i = 0; i < keys.length; i++) {
            self.colors[i] = data[keys[i]];
          }
        })
        .error(function(data, status, headers, config) {
          self.colors['error'] = "No colors found.";
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

    this.showFlashMessage = false;
    this.submitCustomerData = function() {
      self.showFlashMessage = true;
    };
  }])
  .controller('dataCtrl', ['$scope', function($scope) {
    this.datapoints = [
      {
        'description': 'This is a datapoint.',
        'value': 2828,
      },
      {
        'description': 'This is just a datapoint',
        'value': 289292,
      },
      {
        'description': 'This is a random datapoint',
        'value': 983,
      },
      {
        'description': 'A random datapoint.',
        'value': 983,
      },
      {
        'description': 'A datapoint.',
        'value': 992,
      },
      {
        'description': 'Yet another datapoint.',
        'value': 9399,
      }
    ]
  }])
  .controller('showsCtrl', ['$scope', function($scope) {
    var self = this;
    this.doShowForm = false;
    this.shows = [
      {
        'name': 'Example Show',
        'rating': 10
      },
      {
        'name': 'Super Show',
        'rating': 4
      },
      {
        'name': 'Best Show Ever',
        'rating': 8
      },
      {
        'name': 'Daily Show',
        'rating': 2
      }
    ];
    this.newShow = { 'name': '', 'rating': 10 };
    this.addNewShow = function() {
      self.shows.unshift(self.newShow);
      self.newShow = {};
      self.doShowForm = false;
    };
    this.removeShow = function(index) {
      self.shows.splice(index, 1);
    };
  }])
  .controller('evalCtrl', ['$scope', function($scope) {
    var self = this;
    this.arbitraryJS
    this.evaluatedJS;
    this.evalJS = function() {
      self.evaluatedJS = eval(self.arbitraryJS);
    }
  }])
  .controller('scopeHighlighterCtrl', ['$scope', function($scope) {
    // TODO: Most of the DOM-manipulating code in here should go to its own
    // service or controller!

    var self = this;
    this.doHighlightScopes = false;
    // List of arrays of this form:
    //   [scopeElement<element>, oldStying<string>]
    this.previousHighlightingStyle = [];

    this.highlightScopes = function() {
      var scopeElements = $('.ng-scope');
      angular.forEach(scopeElements, function(element) {
        // Save old styling
        self.previousHighlightingStyle.push(
          [$(element), {
            'outline-color': $(element).css('outline-color'),
            'outline-style': $(element).css('outline-style'),
            'outline-width': $(element).css('outline-width'),
            'outline-offset': $(element).css('outline-offset')
          }])
        // Apply styling
        $(element).css({ 'outline': '1px solid #FF0000'});
      })
    };

    this.unHighlightScopes = function() {
      angular.forEach(self.previousHighlightingStyle, function(
        elementAndValue) {
        $(elementAndValue[0]).css(
          { 'outline-color':elementAndValue[1]['outline-color']});
        $(elementAndValue[0]).css(
          { 'outline-style':elementAndValue[1]['outline-style']});
        $(elementAndValue[0]).css(
          { 'outline-width':elementAndValue[1]['outline-width']});
        $(elementAndValue[0]).css(
          { 'outline-offset':elementAndValue[1]['outline-offset']});
      });
    };

    this.toggleScopeHighlighting = function() {
      if (!self.doHighlightScopes) {
        self.highlightScopes();
      } else {
        self.unHighlightScopes();
      }
    };
  }])
  .controller('apiUsageCtrl', ['$scope', '$http', function($scope, $http) {
    // $http.defaults.headers.get = { 'Origin': 'origin' };

    var self = this;

    // this.getURL = '';
    this.getURL = 'http://headers.jsontest.com/';  // DEBUG
    this.retrievedData = '';
    this.dataRetrieved = false;
    this.responseStatus;
    this.exampleURLs = [
      'res/json/colors.json',
      'res/json/animals.json',
      'res/json/diverse.json',
      'INVALID (404)',
      'http://headers.jsontest.com/',
      'http://date.jsontest.com/',
      'http://time.jsontest.com/',
      'http://md5.jsontest.com/?text=This is a test.',
      'http://code.jsontest.com/',
      'https://api.github.com/meta',
      'https://api.github.com/search/issues?q=windows+label:bug+language:python+state:open&sort=created&order=asc',
      'https://api.github.com/search/users/?q=tom',
      'https://api.angel.co/1/users/2/roles',
    ];
    this.retrieveData = function(url) {
      var url = url || this.getURL;
      $http.get(url)
        .success(function(data, status, headers, config) {
          self.retrievedData = data;
          self.responseStatus = status;
          self.dataRetrieved = true;
        })
        .error(function(data, status, headers, config) {
          self.retrievedData = "Error: No data available.";
          self.responseStatus = status;
          self.dataRetrieved = true;
        });
    };

    this.retrievedHeaders = [];
    this.headersRetrieved = false;
    this.config = {
      headers: {
        // 'X-Testing': 'testing'
        // 'Accept': 'application/json, text/plain',
      }
    };
    this.getData = function() {
      $http.get('http://headers.jsontest.com', self.config)
        .success(function(data, status, headers, config) {
          var keys = Object.keys(data);
          var key;
          for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            self.retrievedHeaders[i] = { 'field': key, 'value':
                                         data[key] };
          }
          self.headersRetrieved = true;
        })
        .error(function(data, status, headers, config) {
          self.retrievedHeaders[0] = { 'field': 'ERROR', 'value':
                                       'No data retrieved.' };
          self.headersRetrieved = true;
        });
    };

    this.jsonPosted = false;
    this.postResponseRetrieved = false;
    this.postData = JSON.stringify({
      'type': 'person',
      'person': {
        'first name': 'John',
        'last name': 'Doe',
        'age': 35,
        'location': 'Washington'
      }
    });
    this.postResponseData = [];
    this.postResponse = [];
    this.url = 'http://validate.jsontest.com/?json=' + self.postData;
    this.postData = function() {
      $http.post(self.url, null)
        .success(function(
          data, status, headers, config) {
          var keys = Object.keys(data);
          var key;
          for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            self.postResponseData[i] = { 'field': key, 'value':
                                         data[key] };
          }
          self.postResponseRetrieved = true;
        })
        .error(function(data, status, headers, config) {
          self.postResponseData[0] = { 'field': 'ERROR', 'value':
                                       'No data retrieved.' };
          self.postResponseRetrieved = true;
        });
    };
  }]);
