app.controller('DevCombodateCtrl', function($scope) {
  $scope.user = {
    dob: new Date(1984, 4, 15),
    dob2: new Date(1984, 4, 15, 10, 11, 0)
  };
  $scope.myDate = {
    date: new Date(1984, 4, 15),
    format: "yyyy",
    template: "YYYY"
  };
  $scope.myDate2 = {
    date: new Date(1984, 4, 15),
    format: "yyyy, MMMM",
    template: "YYYY, MMMM"
  };
  $scope.myDate3 = {
    date: new Date(1984, 4, 15),
    format: "MMMM",
    template: "MMMM"
  }
  $scope.myDate4 = {
    date: new Date(1984, 4, 15),
    format: "dd/MM/yyyy",
    template: "DD/MM/YYYY"
  };
});