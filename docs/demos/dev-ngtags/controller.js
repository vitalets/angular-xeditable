app.controller('DevNgTagsCtrl', function($scope, $http) {
  $scope.user = {
    tags: [
      { text: 'Tag1' },
      { text: 'Tag2' },
      { text: 'Tag3' }
    ]
  };
});