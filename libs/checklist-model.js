/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 */

angular.module('checklist-model', [])
.directive('checklistModel', function($parse, $compile) {
  // contains
  function contains(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          return true;
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item) {
    arr = angular.isArray(arr) ? arr : [];
    for (var i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        return;
      }
    }    
    arr.push(item);
  }  

  // remove
  function remove(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          arr.splice(i, 1);
          return;
        }
      }
    }
  }  

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elem, attrs) {
      if (elem[0].tagName !== 'INPUT' || !elem.attr('type', 'checkbox')) {
        throw 'checklist-model should be applied to `input[type="checkbox"]`.';
      }

      if (!attrs.checklistValue) {
        throw 'You should provide  `checklist-value`.';
      }

      var modelGet = $parse(attrs.checklistModel);
      var modelSet = modelGet.assign;
      var model = modelGet(scope);
      var value = $parse(attrs.checklistValue)(scope);

      // local var storing individual checkbox model
      scope.checked = contains(model, value);

      // exclude recursion
      elem.removeAttr('checklist-model');
      elem.attr('ng-model', 'checked');
      $compile(elem)(scope);

      // watch UI checked change
      scope.$watch('checked', function(newValue, oldValue) {
        if (newValue === oldValue) { 
          return;
        } if (newValue === true) {
          add(model, value);
          modelSet(scope.$parent, model);
        } else if (newValue === false) {
          remove(model, value);
          modelSet(scope.$parent, model);
        }
      });

      // watch element destroy to remove from model
      elem.bind('$destroy', function() {
        remove(model, value);
        modelSet(scope.$parent, model);
      });      

      // watch model change
      scope.$watch(function ngModelWatch() {
        var curModel = modelGet(scope);
        if (model !== curModel) {
          model = curModel;
          scope.checked = contains(model, value);
        }
      });
    }
  };
});