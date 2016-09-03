app.controller('NgTagsCtrl', function($scope, $http) {
  $scope.user = {
    tags: [
      { text: 'Tag1' },
      { text: 'Tag2' },
      { text: 'Tag3' }
    ],
  };

  $scope.loadTags = function(query) {
    return $http.get('/tags?query=' + query);
  };
});