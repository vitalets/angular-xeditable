app.controller('DevCombodateCtrl', function($scope) {
  $scope.user = {
    dob: new Date(1984, 4, 15),
    dob2: new Date(1984, 4, 15, 10, 11, 0)
  };
});
