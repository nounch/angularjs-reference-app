angular.module('selfDocumenting', [])
  .directive('selfdocumenting', function($interpolate) {
    return {
      elementId: 0,
      restrict: 'E',
      transclude: true,
      scope: {},
      // controller: function($scope, $element, $attrs, $transclude) {
      // $scope.elementsCount = '<not available yet>';
      // $scope.elementsCount = $element.parent().text();
      // $scope.elementsCount = $interpolate($element.html())($scope);
      // $scope.elementsCount = $interpolate('<div ng-transclude>{{3 + 3}}</div>')($scope);
      // $scope.elementsCount = $transclude().text();
      // $scope.elementsCount = $('.self-documenting-element');
      // },
      link: function($scope, $element, $attrs, controller, transcludeFn) {
        //   // $scope.elementsCount = $element.find('li');
        //   $scope.elementsCount = '<not available yet>';
        // $scope.elementsCount = $('.self-documenting-element').find('ul').length;
        this.elementId += self.elementId;  // XXX
        $scope.elementsCount = $('.documented-element-' + self.elementId).html();
      },
      template: function($element, $attrs) {
        console.log('ID: ' + this.elementId);  // DEBUG
        return '<div class="self-documenting"><div class="documentation"><p>Number of elements in this self-documenting element: <pre>{{elementsCount}}</pre></p></div><div class="documented-element-' + this.elelentId + '" ng-transclude></div></div>'
      },
      replace: true
    }
  });
