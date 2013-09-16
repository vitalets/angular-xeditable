/*
EditableController: attached to editable element
TODO: this file should be refactored to works without closures!
*/
angular.module('xeditable').factory('editableController', function($q) { 
 
  //EditableController function
  EditableController.$invect = ['$scope', '$attrs', '$element', '$parse', 'editableThemes', 'editableOptions', '$rootScope', '$compile', '$q'];
  function EditableController($scope, $attrs, $element, $parse, editableThemes, editableOptions, $rootScope, $compile, $q) {
    var valueGetter;

    //if control is disabled - it does not participate in waiting process
    var inWaiting;

    var self = this;

    self.scope = $scope;
    self.elem = $element;
    self.attrs = $attrs;
    self.inputEl = null;
    self.editorEl = null;
    self.hasForm = false;
    self.error = '';
    self.theme =  editableThemes[editableOptions.theme] || editableThemes['default'];
    self.parent = {};
 
    //to be overwritten
    self.inputTpl = '';
    self.directiveName = '';

    //init
    self.init = function(hasForm) {
      self.hasForm = hasForm;

      self.name = $attrs.eName || $attrs[self.directiveName];
      /*
      if(!$attrs[directiveName] && !$attrs.eNgModel && ($attrs.eValue === undefined)) {
        throw 'You should provide value for `'+directiveName+'` or `e-value` in editable element!';
      }
      */
      if($attrs[self.directiveName]) {
        valueGetter = $parse($attrs[self.directiveName]);
      } else {
        throw 'You should provide value for `'+self.directiveName+'` in editable element!';
      }

      //build input
      /*
      if(hasForm) {
        self.valueString = '$form.$data["' + ($attrs.eName || $attrs[self.directiveName]) + '"]';
      } else {
        self.valueString = '$form.$data' + ($attrs.eName ? '.'+$attrs.eName : '');
      }
      */
      //self.valueString = '$form.$data' + ($attrs.eName ? '.'+$attrs.eName : '');

      // self.inputEl = angular.element(self.inputTpl);
 
      self.render();

      //if name defined --> watch changes and update $data in form
      if($attrs.eName) {
        self.scope.$watch('$data', function(newVal){
          self.scope.$form.$data[$attrs.eName] = newVal;
        });
      }

      //onshow
      if($attrs.onshow) {
        self.onshow = function() {
          return self.catchError($parse($attrs.onshow)($scope));
        };
      }

      //onbeforesave
      if ($attrs.onbeforesave) {
        self.onbeforesave = function() {
          return self.catchError($parse($attrs.onbeforesave)($scope));
        };
      }

      //onaftersave
      if ($attrs.onaftersave) {
        self.onaftersave = function() {
          return self.catchError($parse($attrs.onaftersave)($scope));
        };
      }
    };

    self.render = function() {
      var theme = self.theme;

      //build input
      self.inputEl = angular.element(self.inputTpl);

      //build controls
      self.controlsEl = angular.element(theme.controlsTpl);
      self.controlsEl.append(self.inputEl);

      //build buttons
      if(!self.hasForm) {
        self.buttonsEl = angular.element(theme.buttonsTpl);
        self.submitEl = angular.element(theme.submitTpl);
        self.cancelEl = angular.element(theme.cancelTpl);
        self.buttonsEl.append(self.submitEl).append(self.cancelEl);
        self.controlsEl.append(self.buttonsEl);
      }

      //build error
      self.errorEl = angular.element(theme.errorTpl);
      self.controlsEl.append(self.errorEl);

      //build editor
      self.editorEl = angular.element(self.hasForm ? theme.noformTpl : theme.formTpl);
      self.editorEl.append(self.controlsEl);

      //attach attributes:

      //transfer `e-*` attributes
      for(var k in $attrs.$attr) {
        if(k === 'eForm' || k === 'eNgSubmit') {
          continue;
        }
        if (k.substring(0, 1) === 'e' && k.substring(1, 2) === k.substring(1, 2).toUpperCase()) {
          //cut "e-"
          var v = $attrs.$attr[k].substring(2);
          //workaround for attributes without value (e.g. `multiple = "multiple"`)
          var attrValue = ($attrs[k] === '') ? v : $attrs[k];
          self.inputEl.attr(v, attrValue);
        }
      } 

      self.inputEl.attr('ng-model', '$data');

      if(!self.hasForm) {
        self.editorEl.attr('editable-form', '$form');
      }

      //apply `postrender` method of theme
      if(angular.isFunction(theme.postrender)) {
        theme.postrender.call(self);
      }
    };

    //show
    self.show = function() {
      //set value
      self.scope.$data = angular.copy(valueGetter($scope.$parent));

      //insert editor into DOM
      $element.after(self.editorEl);

      //compile needed to attach events (submit, keydown)
      $compile(self.editorEl)($scope);

      //hide element
      $element.addClass('editable-hide');

      //onshow
      return self.onshow();
    };

    //hide
    self.hide = function() {
      //console.log('editable hide', self.name);
      self.editorEl.remove();
      $element.removeClass('editable-hide');
    };

    //setWaiting
    self.setWaiting = function(value) {
      if (value) {
        //participate in waiting only if not disabled
        inWaiting = !self.inputEl.attr('disabled');
        if (inWaiting) {
          self.inputEl.attr('disabled', 'disabled');
          if(self.buttonsEl) {
            self.buttonsEl.find('button').attr('disabled', 'disabled');
          }
        }
      } else {
        if (inWaiting) {
          self.inputEl.removeAttr('disabled');
          if (self.buttonsEl) {
            self.buttonsEl.find('button').removeAttr('disabled');
          }
        }
      }
    };

    self.activate = function() {
      setTimeout(function() {
        self.inputEl[0].focus();
      }, 0);
    };

    self.setError = function(msg) {
      if(!angular.isObject(msg)) {
        $scope.$error = msg;
        self.error = msg;
      }
    };

    /*
    Checks that result is string or promise returned string and shows it as error message
    Applied to onshow, onbeforesave, onaftersave
    */
    self.catchError = function(result, noPromise) {
      if (angular.isObject(result) && noPromise !== true) {
        $q.when(result).then(
          //success anf fail handlers are equal
          angular.bind(this, function(r) {
            this.catchError(r, true);
          }),
          angular.bind(this, function(r) {
            this.catchError(r, true);
          })
        );
      //check $http error
      } else if (noPromise && angular.isObject(result) && result.status &&
        (result.status !== 200) && result.data && angular.isString(result.data)) {
        this.setError(result.data);
        //set result to string: to let form know that there was error
        result = result.data;
      } else if (angular.isString(result)) {
        this.setError(result);
      }
      return result;
    };

    self.save = function() {
      valueGetter.assign($scope.$parent, angular.copy(self.scope.$data));
    };

    self.onshow = angular.noop;
    self.onbeforesave = angular.noop;
    self.onaftersave = angular.noop;
  }

  return EditableController;
});
