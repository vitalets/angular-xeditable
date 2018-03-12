app.controller('DevText', function($scope) {
  $scope.user = {
    name: 'awesome user',
      number: 12
  };

  $scope.val = 10;
  $scope.newValue = $scope.val;
  $scope.calcSomething = function(val) {
      $scope.newValue = val;
  }
});