app.controller('DevSelectCtrl', function($scope, $filter) {
  $scope.user = {
    status: [2, 4],
    status2: null
  };

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

  $scope.showStatus = function() {
    var selected = [];
    angular.forEach($scope.statuses, function(s) {
      if ($scope.user.status.indexOf(s.value) >= 0) {
        selected.push(s.text);
      }
    });
    return selected.length ? selected.join(', ') : 'Not set';
  };
  
  $scope.showStatus2 = function() {
    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status2});
    return ($scope.user.status2 && selected.length) ? selected[0].text : 'Not set';
  };
});