/*
EditableForm directive:
- wrap form into editable form: add `onshow` attribute, etc
- read buffered editables
*/
angular.module('xeditable').directive('editableForm', function($rootScope, $parse, editableFormController) {
  return { 
    restrict: 'A',
    require: ['form'],
    //require: ['form', 'editableForm'],
    //controller: EditableFormController,
    compile: function() {
      return {
        pre: function(scope, elem, attrs, ctrl) {
          //console.log('pre form', attrs.name);
          var form = ctrl[0];
          var eForm;

          //if `editableForm` has value - publish smartly under this value
          //this is required only for single editor form that is created and removed
          if(attrs.editableForm) {
            if(scope[attrs.editableForm] && scope[attrs.editableForm].$show) {
              eForm = scope[attrs.editableForm];
              angular.extend(form, eForm);
            } else {
              eForm = editableFormController();
              scope[attrs.editableForm] = eForm;
              angular.extend(eForm, form);
            }
          } else { //just merge to form and publish if form has name
            eForm = editableFormController();
            angular.extend(form, eForm);
          }

          //read editables from buffer (that appeared before FORM tag)
          var buf = $rootScope.$$editableBuffer;
          var name = form.$name;
          if(name && buf && buf[name]) {
            angular.forEach(buf[name], function(editable) {
              eForm.$addEditable(editable);
            });
            delete buf[name];
          }          
        },
        post: function(scope, elem, attrs, ctrl) {
          //console.log('post form', attrs.name);
          var eForm;

          if(attrs.editableForm && scope[attrs.editableForm] && scope[attrs.editableForm].$show) {
            eForm = scope[attrs.editableForm];
          } else {
            eForm = ctrl[0];
          }

          //onshow
          if(attrs.onshow) {
            eForm.$onshow = angular.bind(eForm, $parse(attrs.onshow), scope);
          }

          //onbeforesave, onaftersave
          if(!attrs.ngSubmit && !attrs.submit) {
            if(attrs.onbeforesave) { 
              eForm.$onbeforesave = function() {
                return $parse(attrs.onbeforesave)(scope, {$data: eForm.$data});
              };
            }
            if(attrs.onaftersave) { 
              eForm.$onaftersave = function() {
                return $parse(attrs.onaftersave)(scope, {$data: eForm.$data});
              };
            }
            //elem.on('submit', function(event) {
            elem.bind('submit', function(event) {
              event.preventDefault();
              scope.$apply(function() {
                eForm.$submit();
              });
            });
          }
        }
      };
    }
  };
});