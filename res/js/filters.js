angular.module('confidenceFilters', [])
  .filter('confidence', function() {
    return function(input) {
      var checkmark;
      input > 80 ? checkmark = '\u2713' : checkmark = '\u2718';
      return checkmark +  ' (' + input + ')';
    }
  })
  .filter('animalSearch', function() {
    return function(arr, searchString, includeConfidenceInAnimalSearch) {
      if (!searchString) {
        return arr;
      }

      var matches = [];
      searchString = searchString.toLowerCase();

      angular.forEach(arr, function(item) {
        // Wonky
        if (includeConfidenceInAnimalSearch == true &&
            (item.name.toLowerCase().indexOf(searchString) != - 1 ||
             (item.confidence + '').toLowerCase().indexOf(searchString
                                                         ) != - 1)) {
          matches.push(item);
        } else if (item.name.toLowerCase().indexOf(searchString) != - 1) {
          matches.push(item);
        }
      });

      return matches;
    };
  });
