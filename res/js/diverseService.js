angular.module('diverseService', ['ngResource'])
  .factory('Diverse', ['$resource', function($resource) {
    return $resource('res/json/diverse.json', {}, {
      query: { method: 'GET', params: {}, isArray: true }});
  }]);
