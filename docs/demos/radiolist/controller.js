app.controller('RadiolistCtrl', function($scope, $filter) {
  $scope.user = {
    status: 2
  }; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'}
  ]; 

  $scope.showStatus = function() {
    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
    return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  };
});