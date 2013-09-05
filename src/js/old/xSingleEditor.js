/*
Internal editor related to each single editable directive.
Atributes:
- xmodel
- xeditor
- xbuttons
- xtrigger
- xlabel
- xdefault
*/
angular.module('XEditable').factory('XSingleEditor', ['$compile', '$parse', '$q', 'editableOptions', 'editableThemes',
function($compile, $parse, $q, editableOptions, editableThemes) {

  //theme
  var theme = editableThemes[editableOptions.theme] || editableThemes['default'];

  function XSingleEditor(scope, elem, attrs) {
    if (!attrs.xmodel) {
      throw "`model` attribute must be defined for editable elements";
    }
    this.modelName = attrs.xmodel; //change to xmodel
    this.model = $parse(this.modelName);
    this.visible = false;
    this.loading = false; 
    this.disabled = false;
    this.value = null;
    this.scope = scope;
    this.elem = elem; 
    this.attrs = attrs; 
    this.error = '';
    this.isMulti = false; //if this particular editor is part of complex form or not

    this.xlabel = this.attrs.xlabel ? $parse(this.attrs.xlabel) : null;
    this.xshow = this.attrs.xshow ? $parse(this.attrs.xshow) : null;
    if(this.attrs.xvalidate) {
      /*
      This workaround is to allow syntax: xvalidate="myValidate()": call validate without passing param
      It looks more clear instead of xvalidate="myValidate($editor.value)" as $editor not in parent scope.
      */
      var injected = this.attrs.xvalidate.replace(/\(\);?$/, '($editor.value)'); 
      this.xvalidate = $parse(injected);
    } else {
      this.xvalidate = null;
    }

    //detect directiveName, starting with `editable-...` (to get custom options)
    //maybe delete it later
    /*
    var keyword = 'editable';
    for(var k in attrs.$attr) {
      if (k.length > keyword.length && k.substring(0, keyword.length) === keyword) {
        this.directiveName = k;
        break;
      }
    }
    //merge options with defaults
    this.options = angular.extend({}, editableDefaults, this.directiveName && attrs[this.directiveName] ? $parse(attrs[this.directiveName])(scope.$parent) : {});
    */

    //merge options with defaults
    //this.options = editableDefaults;
  }     

  angular.extend(XSingleEditor.prototype, theme, {
    constructor: XSingleEditor,
    show: function(activate) {
      if (this.visible) {
        return;
      }
      this.value = angular.copy(this.model(this.scope.$parent));
      //todo: default value
      $compile(this.editorEl)(this.scope);
      this.elem.after(this.editorEl);
      this.elem.addClass('editable-hide');
      this.visible = true;

      //if `xshow` attribute defined, call it - may return promise
      if(this.xshow) {
        var promise = this.xshow(this.scope.$parent); 
        if(promise) {
          if(!this.isMulti) {
            this.setLoading(true);
            $q.when(promise).then(
              angular.bind(this, function() {
                this.setLoading(false);
                this.activate();
              }),
              angular.bind(this, function(error) {
                this.setLoading(false);
                if(error.status && (error.status !== 200) && error.data && angular.isString(error.data)) {
                  this.setError(error.data);
                }
              })
            );
          }
          return promise;
        }
      }

      //activate if not in form
      if(!this.isMulti) {
        this.activate();
      }
    },
    hide: function() {
      if (!this.visible) {
        return;
      }
      this.editorEl.remove();
      this.elem.removeClass('editable-hide');
      this.visible = false;
      this.error = null;
    },
    save: function(validate) {
      validate = validate === undefined ? true : validate;
      var error = validate ? this.validate() : null;
      if(error) {
        this.setError(error);
        this.activate();
        return error;
      } else {
        this.setError(null);
        this.model.assign(this.scope.$parent, this.value);
        this.hide();
      }
    },
    activate: function() {
      setTimeout(angular.bind(this, function() {
        this.inputEl[0].focus();
      }), 0);
    },
    validate: function() {
      if(this.xvalidate) {
        var error = this.xvalidate(this.scope);
        if(error) {
          this.setError(error);
          return error;
        }
      }
    },
    setLoading: function(value) {
      //console.log('set loading: ', value);
      this.loading = value;
      if(value) {
        this.setError(null);
      }
    },
    setError: function(value) {
      //console.log('set error: ', value);
      this.error = value;

      //bootstrap3
      if(this.error) {
        this.controlsEl.addClass('has-error');
      } else {
        this.controlsEl.removeClass('has-error');
      }
    },
    /*
    Renders this.inputEl
    */
    renderInput: function() {
      //input element
      this.inputEl = angular.element(this.inputTpl);

      //bind ng-model
      this.inputEl.attr('ng-model', '$editor.value');

      //bind ng-disabled
      this.inputEl.attr('ng-disabled', '$editor.disabled || $editor.loading');

      //copy attributes starting with "e-" to input element
      for(var k in this.attrs.$attr) {
        if (k.substring(0, 1) === 'e' && k.substring(1, 2) === k.substring(1, 2).toUpperCase()) {
          //cut "e-"
          var v = this.attrs.$attr[k].substring(2);
          //workaround for attributes without value set value = attribute (e.g. `multiple`)
          var attrValue = (this.attrs[k] === '') ? v : this.attrs[k];
          this.inputEl.attr(v, attrValue);
        }
      }

      //bootstrap3
      if(this.inputEl[0].tagName === 'INPUT') {
        if(this.inputEl.attr('type') !== 'checkbox') {
          this.inputEl.addClass('form-control input-sm');
        }
      } else {  
        if(this.inputEl.attr('multiple') === 'multiple') {
          this.inputEl.addClass('form-control');
        } else {
          this.inputEl.addClass('form-control input-sm');
        }
      }

    },
    /*
    Wraps pure input into some additional html
    */
    renderWrapInput: function() {
      this.wrapInputEl = this.inputEl;
      //bootstrap3
      //this.wrapInputEl = angular.element('<span>&nbsp;</span>');
      //this.wrapInputEl.prepend(this.inputEl);
    },
    /*
    Renders this.editorEl
    When several editable are under one XEditor - it is `multi mode`: they don't have form and buttons
    */
    renderEditor: function(isMulti) {
      this.editorEl = angular.element(isMulti ? this.noformTpl : this.formTpl);
      this.controlsEl = angular.element(this.controlsTpl);
      this.controlsEl.append(this.wrapInputEl);
      if(!isMulti) { //add buttons only for single element
        this.controlsEl.append(this.buttonsTpl);
      } 
      this.controlsEl.append(this.errorTpl);
      this.editorEl.append(this.controlsEl);

      this.isMulti = !!isMulti;
      //todo: move somewhere
      if(this.isMulti) {
        this.elem.removeClass('editable-click');
      } else {
        this.elem.addClass('editable-click');
      }
    },
    /*
    Bind event that triggers editor to show.
    By default it is `click`, but can be supressed by `xtrigger` attribute or for multi elements.
    If editorExt exists, we call it's show() instead of own show().
    */
    bindTrigger: function(editorExt) {
      if(this.attrs.xtrigger === 'manual') {
        return;
      }
      var f = editorExt ? function() { editorExt.show(); } : function() { this.show(true); };
      this.elem.bind('click', angular.bind(this, function(e) { 
        if(!this.isMulti) {
          e.preventDefault();
          this.scope.$apply(angular.bind(this, f));
        }
      }));   
    }
  });

  return XSingleEditor;
}]);