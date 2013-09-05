/*
Binds controls to form that are outside FORM tag
*/
angular.module('bindform', []).directive('bindform', function($document, $compile) {
  return { 
    restrict: 'A',
    link: function(scope, elem, attrs) {
      if(!attrs.bindform) {
        throw "You should provide form name to bind with";
      }
      if(!attrs.value && !attrs.ngModel) {
        throw "You should provide `value` or `ng-model`";
      }
      var form;
      for(var i=0; i<$document[0].forms.length; i++) {
        var form = $document[0].forms[i];
        if(form.name === attrs.bindform) {
          break;
        }
      }

      if(form) {
        //console.log('ctrl', angular.element(form).controller('form'));

        var inputEl = angular.element('<input type="hidden">');
        if(attrs.name) {
          inputEl.attr('name', attrs.name);
        }
        if(attrs.ngModel) {
          inputEl.attr('value', '{{'+attrs.ngModel+'}}');
        } else {
          //will work only with value defined as angular expression!
          inputEl.attr('value', attrs.value);
        }
        angular.element(form).append($compile(inputEl)(scope));

        elem.on('$destroy', function() {
          //todo: check!
          inputEl.remove();
        });
      }
    }
  };
});