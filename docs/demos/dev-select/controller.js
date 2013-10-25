app.controller('DevSelectCtrl', function($scope, $filter) {
  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.user = {
    status: [$scope.statuses[1], $scope.statuses[3]]
  }; 

  $scope.showStatus = function() {
    var texts = [];
    angular.forEach($scope.user.status, function(s) { 
      texts.push(s.text);
    });    
    return texts.join(', ') || 'Not set';
  };
});