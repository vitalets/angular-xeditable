/**
 * EditableController class. 
 * Attached to element with `editable-xxx` directive.
 *
 * @namespace editable-element
 */
/*
TODO: this file should be refactored to work more clear without closures!
*/
angular.module('xeditable').factory('editableController', 
  ['$q', 'editableUtils',
  function($q, editableUtils) {

  //EditableController function
  EditableController.$inject = ['$scope', '$attrs', '$element', '$parse', 'editableThemes', 'editableIcons', 'editableOptions', '$rootScope', '$compile', '$q'];
  function EditableController($scope, $attrs, $element, $parse, editableThemes, editableIcons, editableOptions, $rootScope, $compile, $q) {
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
    self.theme =  editableThemes[$attrs.editableTheme] || editableThemes[editableOptions.theme] || editableThemes['default'];
    self.parent = {};

    //will be undefined if icon_set is default and theme is default
    var theme_name = $attrs.editableTheme || editableOptions.theme || 'default';
    // The theme_name will not be correct if the theme set in options is unavailable
    // However, in that case an undefined icon_set is not that bad...
    var icon_set_option = $attrs.editableIconSet || editableOptions.icon_set;
    self.icon_set = icon_set_option === 'default' ? editableIcons.default[theme_name] : editableIcons.external[icon_set_option];

    //to be overwritten by directive
    self.inputTpl = '';
    self.directiveName = '';

    // with majority of controls copy is not needed, but..
    // copy MUST NOT be used for `select-multiple` with objects as items
    // copy MUST be used for `checklist`
    self.useCopy = false;

    //runtime (defaults)
    self.single = null;

    /**
     * Attributes defined with `e-*` prefix automatically transferred from original element to
     * control.  
     * For example, if you set `<span editable-text="user.name" e-style="width: 100px"`>
     * then input will appear as `<input style="width: 100px">`.  
     * See [demo](#text-customize).
     * 
     * @var {any|attribute} e-*
     * @memberOf editable-element
     */ 

    /**
     * Whether to show ok/cancel buttons. Values: `right|no`.
     * If set to `no` control automatically submitted when value changed.  
     * If control is part of form buttons will never be shown. 
     * 
     * @var {string|attribute} buttons
     * @memberOf editable-element
     */    
    self.buttons = 'right'; 
    /**
     * Action when control losses focus. Values: `cancel|submit|ignore`.
     * Has sense only for single editable element.
     * Otherwise, if control is part of form - you should set `blur` of form, not of individual element.
     * 
     * @var {string|attribute} blur
     * @memberOf editable-element
     */     
    // no real `blur` property as it is transferred to editable form

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

      // settings for single and non-single
      if (!self.single) {
        // hide buttons for non-single
        self.buttons = 'no';
      } else {
        self.buttons = self.attrs.buttons || editableOptions.buttons;
      }

      //if name defined --> watch changes and update $data in form
      if($attrs.eName) {
        self.scope.$watch('$data', function(newVal){
          self.scope.$form.$data[$attrs.eName] = newVal;
        });
      }

      /**
       * Called when control is shown.  
       * See [demo](#select-remote).
       * 
       * @var {method|attribute} onshow
       * @memberOf editable-element
       */
      if($attrs.onshow) {
        self.onshow = function() {
          return self.catchError($parse($attrs.onshow)($scope));
        };
      }

      /**
       * Called when control is hidden after both save or cancel.  
       * 
       * @var {method|attribute} onhide
       * @memberOf editable-element
       */
      if($attrs.onhide) {
        self.onhide = function() {
          return $parse($attrs.onhide)($scope);
        };
      }

      /**
       * Called when control is cancelled.  
       * 
       * @var {method|attribute} oncancel
       * @memberOf editable-element
       */
      if($attrs.oncancel) {
        self.oncancel = function() {
          return $parse($attrs.oncancel)($scope);
        };
      }          

      /**
       * Called during submit before value is saved to model.  
       * See [demo](#onbeforesave).
       * 
       * @var {method|attribute} onbeforesave
       * @memberOf editable-element
       */
      if ($attrs.onbeforesave) {
        self.onbeforesave = function() {
          return self.catchError($parse($attrs.onbeforesave)($scope));
        };
      }

      /**
       * Called during submit after value is saved to model.  
       * See [demo](#onaftersave).
       * 
       * @var {method|attribute} onaftersave
       * @memberOf editable-element
       */
      if ($attrs.onaftersave) {
        self.onaftersave = function() {
          return self.catchError($parse($attrs.onaftersave)($scope));
        };
      }

      // watch change of model to update editable element
      // now only add/remove `editable-empty` class.
      // Initially this method called with newVal = undefined, oldVal = undefined
      // so no need initially call handleEmpty() explicitly
      $scope.$parent.$watch($attrs[self.directiveName], function(newVal, oldVal) {
        self.setLocalValue();
        self.handleEmpty();
      });
    };

    self.render = function() {
      var theme = self.theme;

      //build input
      self.inputEl = angular.element(self.inputTpl);

      //build controls
      self.controlsEl = angular.element(theme.controlsTpl);
      self.controlsEl.append(self.inputEl);

      //build buttons
      if(self.buttons !== 'no') {
        self.buttonsEl = angular.element(theme.buttonsTpl);
        self.submitEl = angular.element(theme.submitTpl);
        self.resetEl = angular.element(theme.resetTpl);
        self.cancelEl = angular.element(theme.cancelTpl);
        self.submitEl.attr('title', editableOptions.submitButtonTitle);
        self.submitEl.attr('aria-label', editableOptions.submitButtonAriaLabel);
        self.cancelEl.attr('title', editableOptions.cancelButtonTitle);
        self.cancelEl.attr('aria-label', editableOptions.cancelButtonAriaLabel);
        self.resetEl.attr('title', editableOptions.clearButtonTitle);
        self.resetEl.attr('aria-label', editableOptions.clearButtonAriaLabel);

        if (self.icon_set) {
          self.submitEl.find('span').addClass(self.icon_set.ok);
          self.cancelEl.find('span').addClass(self.icon_set.cancel);
          self.resetEl.find('span').addClass(self.icon_set.clear);
        }

        self.buttonsEl.append(self.submitEl).append(self.cancelEl);

        if (editableOptions.displayClearButton) {
          self.buttonsEl.append(self.resetEl);
        }

        self.controlsEl.append(self.buttonsEl);
        
        self.inputEl.addClass('editable-has-buttons');
      }

      //build error
      self.errorEl = angular.element(theme.errorTpl);
      self.controlsEl.append(self.errorEl);

      //build editor
      self.editorEl = angular.element(self.single ? theme.formTpl : theme.noformTpl);
      self.editorEl.append(self.controlsEl);

      // transfer `e-*|data-e-*|x-e-*` attributes
      for (var k in $attrs.$attr) {
        if(k.length <= 1) {
          continue;
        }
        var transferAttr = false;
        var nextLetter = k.substring(1, 2);

        // if starts with `e` + uppercase letter
        if (k.substring(0, 1) === 'e' && nextLetter === nextLetter.toUpperCase()) {
          transferAttr = k.substring(1); // cut `e`
        } else {
          continue;
        }
        
        // exclude `form` and `ng-submit`, 
        if (transferAttr === 'Form' || transferAttr === 'NgSubmit') {
          continue;
        }

        var firstLetter = transferAttr.substring(0, 1);
        var secondLetter = transferAttr.substring(1, 2);

        // convert back to lowercase style
        if (secondLetter === secondLetter.toUpperCase() &&
            firstLetter === firstLetter.toUpperCase()) {
          transferAttr = firstLetter.toLowerCase() + '-' + editableUtils.camelToDash(transferAttr.substring(1));
        } else {
          transferAttr = firstLetter.toLowerCase() + editableUtils.camelToDash(transferAttr.substring(1));
        }

        // workaround for attributes without value (e.g. `multiple = "multiple"`)
        // except for 'e-value'
        var attrValue = (transferAttr !== 'value' && $attrs[k] === '') ? transferAttr : $attrs[k];

        // set attributes to input
        self.inputEl.attr(transferAttr, attrValue);
      }

      self.inputEl.addClass('editable-input');
      self.inputEl.attr('ng-model', '$parent.$data');

      // add directiveName class to editor, e.g. `editable-text`
      self.editorEl.addClass(editableUtils.camelToDash(self.directiveName));

      if (self.single) {
        self.editorEl.attr('editable-form', '$form');
        // transfer `blur` to form
        self.editorEl.attr('blur', self.attrs.blur || (self.buttons === 'no' ? 'cancel' : editableOptions.blurElem));
      }

      //apply `postrender` method of theme
      if (angular.isFunction(theme.postrender)) {
        theme.postrender.call(self);
      }

    };

    // with majority of controls copy is not needed, but..
    // copy MUST NOT be used for `select-multiple` with objects as items
    // copy MUST be used for `checklist`
    self.setLocalValue = function() {
      self.scope.$data = self.useCopy ? 
        angular.copy(valueGetter($scope.$parent)) : 
        valueGetter($scope.$parent);
    };

    // reference of the scope to use for $compile
    var newScope = null;
    //show
    self.show = function() {
      // set value of scope.$data
      self.setLocalValue();

      /*
      Originally render() was inside init() method, but some directives polluting editorEl,
      so it is broken on second openning.
      Cloning is not a solution as jqLite can not clone with event handler's.
      */
      self.render();

      // insert into DOM
      $element.after(self.editorEl);

      // compile (needed to attach ng-* events from markup)
      newScope = $scope.$new();
      $compile(self.editorEl)(newScope);

      // attach listeners (`escape`, autosubmit, etc)
      self.addListeners();

      // hide element
      $element.addClass('editable-hide');

      // onshow
      return self.onshow();
    };

    //hide
    self.hide = function() {

      // destroy the scope to prevent memory leak
      newScope.$destroy();

      self.controlsEl.remove();
      self.editorEl.remove();
      $element.removeClass('editable-hide');

      // onhide
      return self.onhide();
    };

    // cancel
    self.cancel = function() {
      // oncancel
      self.oncancel();
      // don't call hide() here as it called in form's code
    };

    /*
    Called after show to attach listeners
    */
    self.addListeners = function() {
      // bind keyup for `escape`
      self.inputEl.bind('keyup', function(e) {
          if(!self.single) {
            return;
          }

          // todo: move this to editable-form!
          switch(e.keyCode) {
            // hide on `escape` press
            case 27:
              self.scope.$apply(function() {
                self.scope.$form.$cancel();
              });
            break;
          }
      });

      // autosubmit when `no buttons`
      if (self.single && self.buttons === 'no') {
        self.autosubmit();
      }

      // click - mark element as clicked to exclude in document click handler
      self.editorEl.bind('click', function(e) {
        // ignore right/middle button click
        if (e.which && e.which !== 1) {
          return;
        }

        if (self.scope.$form.$visible) {
          self.scope.$form._clicked = true;
        }
      });
    };

    // setWaiting
    self.setWaiting = function(value) {
      if (value) {
        // participate in waiting only if not disabled
        inWaiting = !self.inputEl.attr('disabled') &&
                    !self.inputEl.attr('ng-disabled') &&
                    !self.inputEl.attr('ng-enabled');
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

    self.activate = function(start, end) {
      setTimeout(function() {
        var el = self.inputEl[0];

        if (editableOptions.activate === 'focus' && el.focus) {
          if(start){
            end = end || start;
            el.onfocus = function(){
              var that = this;
              setTimeout(function(){
                that.setSelectionRange(start,end);
              });
            };
          }
          
          if (self.directiveName == 'editableRadiolist' || self.directiveName == 'editableChecklist' ||
              self.directiveName == 'editableBsdate' || self.directiveName == 'editableTagsInput') {
            //Set focus to first pristine element in the list
            el.querySelector('.ng-pristine').focus();
          } else {
            el.focus();
          }
        } else if (editableOptions.activate === 'select') {
          if (el.select){
            el.select();
          } else if (el.focus) {
            el.focus();
          }
        }
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
      valueGetter.assign($scope.$parent,
          self.useCopy ? angular.copy(self.scope.$data) : self.scope.$data);

      // no need to call handleEmpty here as we are watching change of model value
      // self.handleEmpty();
    };

    /*
    attach/detach `editable-empty` class to element
    */
    self.handleEmpty = function() {
      var val = valueGetter($scope.$parent);
      var isEmpty = val === null || val === undefined || val === "" || (angular.isArray(val) && val.length === 0); 
      $element.toggleClass('editable-empty', isEmpty);
    };

    /*
    Called when `buttons = "no"` to submit automatically
    */
    self.autosubmit = angular.noop;

    self.onshow = angular.noop;
    self.onhide = angular.noop;
    self.oncancel = angular.noop;
    self.onbeforesave = angular.noop;
    self.onaftersave = angular.noop;
  }

  return EditableController;
}]);
