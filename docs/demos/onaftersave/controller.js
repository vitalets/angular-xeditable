app.controller('OnaftersaveCtrl', function($scope, $http) {
  $scope.user = {
    id: 1,
    name: 'awesome user'
  };

  $scope.updateUser = function() {
    return $http.post('/updateUser', $scope.user);
  };
});