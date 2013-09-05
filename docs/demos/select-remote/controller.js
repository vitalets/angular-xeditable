app.controller('SelectRemoteCtrl', function($scope, $filter, $http) {
  $scope.user = {
    group: 4,
    groupName: 'admin' // original value
  }; 

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
});