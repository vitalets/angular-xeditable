/*
EditableController: attached to editable element
TODO: this file should be refactored to work more clear without closures!
*/
angular.module('xeditable').factory('editableController', ['$q', function($q) {

  //EditableController function
  EditableController.$inject = ['$scope', '$attrs', '$element', '$parse', 'editableThemes', 'editableOptions', '$rootScope', '$compile', '$q'];
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
    self.single = true;
    self.error = '';
    self.theme =  editableThemes[editableOptions.theme] || editableThemes['default'];
    self.parent = {};

    //to be overwritten
    self.inputTpl = '';
    self.directiveName = '';

    //init
    self.init = function(single) {
      self.single = single;

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

      // hide buttons for non-single
      if (!self.single) {
        self.attrs.buttons = 'no';
      }

      //moved to show()
      //self.render();

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
      if(self.attrs.buttons !== 'no') {
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
      self.editorEl = angular.element(self.single ? theme.formTpl : theme.noformTpl);
      self.editorEl.append(self.controlsEl);

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

      self.inputEl.addClass('editable-input');

      self.inputEl.attr('ng-model', '$data');

      if(self.single) {
        self.editorEl.attr('editable-form', '$form');
      }

      //apply `postrender` method of theme
      if(angular.isFunction(theme.postrender)) {
        theme.postrender.call(self);
      }

    };

    //show
    self.show = function() {
      // set value
      self.scope.$data = angular.copy(valueGetter($scope.$parent));

      /*
      Originally render() was inside init() method, but some directives polluting editorEl,
      so it is broken on second openning.
      Cloning is not a solution as jqLite can not clone with event handler's.
      */
      self.render();

      // compile and insert into DOM (compile needed to attach ng-* events from markup)
      $element.after($compile(self.editorEl)($scope));

      // attach listeners (`escape`, autosubmit, etc)
      self.addListeners();

      // hide element
      $element.addClass('editable-hide');

      //onshow
      return self.onshow();
    };

    //hide
    self.hide = function() {
      //console.log('editable hide', self.name);
      self.editorEl.remove();
      $element.removeClass('editable-hide');
      // todo: to think is it really needed or not
      /*
      if($element[0].tagName === 'A') {
        $element[0].focus();
      }
      */
    };

    /*
    Called after show to attach listeners
    */
    self.addListeners = function() {
      //bind keyup
      self.inputEl.bind('keyup', function(e) {
          if(!self.single) {
            return;
          }

          switch(e.keyCode) {
            // hide on `escape` press
            case 27:
              self.scope.$form.$hide();
            break;
          }
      });

      //autosubmit when no buttons
      if (self.single && self.attrs.buttons === 'no') {
        self.autosubmit();
      }
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
          //success and fail handlers are equal
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

    /*
    Called when `buttons = "no"` to submit automatically
    */
    self.autosubmit = angular.noop;

    self.onshow = angular.noop;
    self.onbeforesave = angular.noop;
    self.onaftersave = angular.noop;
  }

  return EditableController;
}]);
