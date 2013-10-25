app.controller('DevSelectCtrl', function($scope, $filter) {
  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.user = {
    //status: [2, 4]
    status: [$scope.statuses[0], $scope.statuses[2]]
  }; 

  $scope.showStatus = function() {
    return $scope.user.status.join(', ') : 'Not set';
  };
});