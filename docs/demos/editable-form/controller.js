app.controller('EditableFormCtrl', function($scope, $filter, $http) {
  $scope.user = {
    id: 1,
    name: 'awesome user',
    status: 2,
    group: 4,
    groupName: 'admin'
  }; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function() {
    if($scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return $scope.user.groupName;
    }
  };

  $scope.checkName = function(data) {
    if (data !== 'awesome') {
      return "Username should be `awesome`!";
    }
  };

  $scope.saveUser = function() {
    //$scope.user already updated!
    return $http.post('/saveUser', $scope.user);
  };
});