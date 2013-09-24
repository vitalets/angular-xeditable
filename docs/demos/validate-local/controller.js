app.controller('ValidateLocalCtrl', function($scope) {
  $scope.user = {
    name: 'awesome user'
  };

  $scope.checkName = function(data) {
    if (data !== 'awesome') {
      return "Username should be `awesome`";
    }
  };
});