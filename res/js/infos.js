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
  });
