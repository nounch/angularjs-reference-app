angular.module('infos', [])
  .factory('diverseInfo', function() {
    var blockedUserNames = [
      'Anonymous',
      'John Doe',
      'Nobody',
      'Somebody',
    ];
    var userNameGuidelines = [
      'Alphabetical and numerical characters',
      'No punctuation or special characters',
    ]

    return {
      blockedUserNames: blockedUserNames,
      userNameGuidelines: userNameGuidelines,
    };
  })
  .factory('routesService', function() {
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
    return { routes: routes };
  });
