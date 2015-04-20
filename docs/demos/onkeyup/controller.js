app.controller('OnkeyUpCtrl', function($scope, $http) {
  $scope.user = {
    id: 1,
    name: 'awesome user'
  };

  $scope.checkUser = function(data) {
  	if(data.length === 0){
  		return 'The user field is empty';
  	}
  };
});