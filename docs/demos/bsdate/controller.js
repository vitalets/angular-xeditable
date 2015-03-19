app.controller('BsdateCtrl', function($scope) {
	$scope.user = {
		dob: new Date(1984, 4, 15)
	};

	$scope.opened = {};

	$scope.open = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
	};
});