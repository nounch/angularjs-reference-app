angular.module('selfDocumenting', [])
  .directive('selfdocumenting', function() {
    return  {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        // $scope.elementsCount = $element;
      },
      link: function($scope, $element, attrs) {
        // $scope.elementsCount = $element.find('li');
        $scope.elementsCount = '<not available yet>';
      },
      template: '<div class="self-documenting"><div class="documentation"><p>Number of elements in this self-documenting element: {{elementsCount}}</p></div><div class="documented-element" ng-transclude></div></div>',
      replace: true
    }
  });
