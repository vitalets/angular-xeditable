app.controller('DevRadiolistCtrl', function($scope, $filter) {
  $scope.user = {
    booleanstatus: true,
    stringStatus: "s1"
  };

  $scope.bolleanstatuses = [
    {value: true, text: 'status1'},
    {value: false, text: 'status2'}
  ];

  $scope.stringStatuses = [
    {value: 's1', text: 'status1'},
    {value: 's2', text: 'status2'}
  ];

  $scope.showBooleanStatus = function() {
    var selected = $filter('filter')($scope.bolleanstatuses, {value: $scope.user.booleanstatus});
    return ($scope.user.booleanstatus != null && selected.length) ? selected[0].text : 'Not set';
  };

  $scope.showStringStatus = function() {
    var selected = $filter('filter')($scope.stringStatuses, {value: $scope.user.stringStatus});
    return ($scope.user.stringStatus != null && selected.length) ? selected[0].text : 'Not set';
  };

  $scope.doSomething = function($data) {
    window.console.log($data);
  };
});