app.controller('DevRadiolistCtrl', function($scope, $filter) {
  $scope.user = {
    booleanstatus: true
  }; 

  $scope.bolleanstatuses = [
    {value: true, text: 'status1'},
    {value: false, text: 'status2'}
  ]; 

  $scope.showBooleanStatus = function() {
    var selected = $filter('filter')($scope.bolleanstatuses, {value: $scope.user.booleanstatus});
    return ($scope.user.booleanstatus != null && selected.length) ? selected[0].text : 'Not set';
  };

  $scope.doSomething = function($data) {
    window.console.log($data);
  };
});