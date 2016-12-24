app.controller('UidateCtrl', function($scope) {

    $scope.datePickerConfig = {
        changeYear: true,
        changeMonth: true
    };

    $scope.user = {
        dob: new Date(1985, 3, 11)
    };

});
