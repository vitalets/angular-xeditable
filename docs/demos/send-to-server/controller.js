app.controller('SendToServerCtrl', function($scope, $http) {
  $scope.user = {
    id: 1,
    name: 'awesome user'
  };

  $scope.updateUserBefore = function(data) {
    //$scope.user not updated yet!
    return $http.post('/updateUser', {id: $scope.user.id, name: data});
  };

  $scope.updateUserAfter = function() {
    //$scope.user already updated!
    return $http.post('/updateUser', $scope.user);
  };
});