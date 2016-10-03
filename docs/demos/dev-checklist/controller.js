app.controller('DevChecklistCtrl', function($scope, $filter) {
  $scope.user = {
    devstatus: [2, 3]
  }; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'}
  ]; 

  $scope.showStatus = function() {
    var selected = [];
    angular.forEach($scope.statuses, function(s) { 
      if ($scope.user.devstatus.indexOf(s.value) >= 0) {
        selected.push(s.text);
      }
    });
    return selected.length ? selected.join(', ') : 'Not set';
  };

});