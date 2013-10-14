/*
editableFactory:
- attaches editableController to element
- used to generate editable directives

Depends on: editableController, editableFormFactory
*/
angular.module('xeditable').factory('editableDirectiveFactory',
['$parse', '$compile', 'editableThemes', '$rootScope', '$document', 'editableController', 'editableFormController',
function($parse, $compile, editableThemes, $rootScope, $document, editableController, editableFormController) {

  //directive object
  return function(overwrites) {
    return {
      restrict: 'A',
      scope: true,
      require: [overwrites.directiveName, '?^form'],
      controller: editableController,
      link: function(scope, elem, attrs, ctrl) {
        //editable controller
        var eCtrl = ctrl[0];

        //form controller
        var eFormCtrl;
        var hasForm = false;

        //if not inside form, but we have `e-form`:
        //check if form exists somewhere in scope. If exists - bind, otherwise create.
        if(ctrl[1]) {
          eFormCtrl = ctrl[1];
          hasForm = true;
        } else if(attrs.eForm) {
          var getter = $parse(attrs.eForm)(scope);
          if(getter) { //getter defined, form above
            eFormCtrl = getter;
            hasForm = true;
          } else { //form below or not exist: check document.forms
            for(var i=0; i<$document[0].forms.length;i++){
              if($document[0].forms[i].name === attrs.eForm) {
                //form is below and not processed yet
                eFormCtrl = null;
                hasForm = true;
                break;
              }
            }
          }
        }

        /*
        if(hasForm && !attrs.eName) {
          throw 'You should provide `e-name` for editable element inside form!';
        }
        */

        //check for `editable-form` attr in form
        /*
        if(eFormCtrl && ) {
          throw 'You should provide `e-name` for editable element inside form!';
        }
        */

        //store original props to `parent` before merge
        angular.forEach(overwrites, function(v, k) {
          if(eCtrl[k] !== undefined) {
            eCtrl.parent[k] = eCtrl[k];
          }
        });

        //merge overwrites to base editable controller
        angular.extend(eCtrl, overwrites);

        //init editable ctrl
        eCtrl.init(!hasForm);

        //publich editable controller as `$editable` to be referenced in html
        scope.$editable = eCtrl;

        // add `editable` class to element
        elem.addClass('editable');

        // hasForm
        if(hasForm) {
          if(eFormCtrl) {
            scope.$form = eFormCtrl;
            if(!scope.$form.$addEditable) {
              throw 'Form with editable elements should have `editable-form` attribute.';
            }
            scope.$form.$addEditable(eCtrl);
          } else {
            // future form (below): add editable controller to buffer and add to form later
            $rootScope.$$editableBuffer = $rootScope.$$editableBuffer || {};
            $rootScope.$$editableBuffer[attrs.eForm] = $rootScope.$$editableBuffer[attrs.eForm] || [];
            $rootScope.$$editableBuffer[attrs.eForm].push(eCtrl);
            scope.$form = null; //will be re-assigned later
          }
        // !hasForm
        } else {

          //create editableform controller
          scope.$form = editableFormController();
          //add self to editable controller
          scope.$form.$addEditable(eCtrl);

          //elem.after(self.editorEl);
        //console.log('w:', scope.$$watchers.length);
          //$compile(eCtrl.editorEl)(scope);
          //scope.$form.$addEditable(eCtrl);
        //console.log('w:', scope.$$watchers.length);
          //eCtrl.editorEl.remove();

          //if `e-form` provided, publish local $form in scope
          if(attrs.eForm) {
            scope.$parent[attrs.eForm] = scope.$form;
          }

          //bind click - if no external form defined
          if(!attrs.eForm) {
            elem.addClass('editable-click');
            elem.bind('click', function(e) {
              e.preventDefault();
              e.editable = eCtrl;
              scope.$apply(function(){
                scope.$form.$show();
              });
            });
          }
        }

      }
    };
  };
}]);
