angular.module('routesService', [''])
  .factory('Routes', ['', function() {
    var routes = [
      {
        description: 'API',
        path: 'api',
        controller: 'apiUsageCtrl',
        templateUrl: 'partials/apiUsage.html',
      },
      {
        description: 'User',
        path: 'user',
        controller: 'userCtrl',
        templateUrl: 'partials/user.html',
      },
    ];
    return routes;
  }]);
