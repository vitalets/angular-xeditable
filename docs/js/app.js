var app = angular.module("app", ["xeditable", "ngMockE2E"]);

//add delay to $httpBackend
app.config(function($provide) {
  var l = window.location.href;
  var delay = /\?test/.test(l) ? 400 : 800;
  $provide.decorator('$httpBackend', function($delegate) {
      var proxy = function(method, url, data, callback, headers) {
          var interceptor = function() {
              var _this = this,
                  _arguments = arguments;
              setTimeout(function() {
                  callback.apply(_this, _arguments);
              }, delay);
          };
          return $delegate.call(this, method, url, data, interceptor, headers);
      };
      for(var key in $delegate) {
          proxy[key] = $delegate[key];
      }
      return proxy;
  });
});

/*
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});
*/

app.run(function($httpBackend, editableOptions, editableThemes) {

  //detecting query params. Angular $location.search() works in html5mode only!
  /*
  var l = $window.location.href;
  var theme;
  if(/theme=default/.test(l)) {
    theme = 'default';
  } else if(/theme=bs2/.test(l)) {
    theme = 'bs2';
  } else {
    theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
  }

  editableOptions.theme = theme;
  $rootScope.theme = theme;

  if(theme === 'bs3' || theme === 'bs3sm') {
    $rootScope.css = ['bootstrap300/css/bootstrap.css'];  
  } else if(theme === 'bs2') {
    $rootScope.css = ['bootstrap232/css/bootstrap.css', 'bootstrap232/css/bootstrap-responsive.css'];  
  } else {
    $rootScope.css = [];
  }
*/

  editableOptions.theme = 'bs3';

  // -- mocks --

  //groups
  $httpBackend.whenGET('/groups').respond([
    {id: 1, text: 'user'},
    {id: 2, text: 'customer'},
    {id: 3, text: 'vip'},
    {id: 4, text: 'admin'}
  ]);

  //groups err
  $httpBackend.whenGET('/groups-err').respond(function(method, url, data) {
    return [500, 'server error', {}];
  });

  //check name
  $httpBackend.whenPOST(/\/checkName/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.value !== 'awesome') {
      return [200, {status: 'error', msg: 'Username should be `awesome`'}]; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  //update user
  $httpBackend.whenPOST(/\/updateUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.name === 'error') {
      return [500, 'Error message']; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  //save user
  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    /*
    if(data.name !== 'awesome') {
      return [500, 'Username should be `awesome`']; 
    } else {
      return [200, {status: 'ok'}]; 
    }
    */
    return [200, {status: 'ok'}];
  });

  //save column
  $httpBackend.whenPOST(/\/saveColumn/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.column === 'name' && data.value !== 'awesome') {
      return [500, 'Username should be `awesome`']; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  $httpBackend.whenGET(/\.(html|css|js)$/).passThrough();

});