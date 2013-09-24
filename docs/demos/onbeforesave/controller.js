app.controller('OnbeforesaveCtrl', function($scope, $http) {
  $scope.user = {
    id: 1,
    name: 'awesome user'
  };

  $scope.updateUser = function(data) {
    return $http.post('/updateUser', {id: $scope.user.id, name: data});
  };
});