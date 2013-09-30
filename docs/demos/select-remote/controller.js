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

  $scope.$watch('user.group', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
      $scope.user.groupName = selected.length ? selected[0].text : null;
    }
  });
});