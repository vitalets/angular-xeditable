app.controller('ValidateRemoteCtrl', function($scope, $http, $q) {
  $scope.user = {
    name: 'awesome user'
  };

  $scope.checkName = function(data) {
    var d = $q.defer();
    $http.post('/checkName', {value: data}).success(function(res) {
      res = res || {};
      if(res.status === 'ok') { // {status: "ok"}
        d.resolve()
      } else { // {status: "error", msg: "Username should be `awesome`!"}
        d.resolve(res.msg)
      }
    });
    return d.promise;
  };
});