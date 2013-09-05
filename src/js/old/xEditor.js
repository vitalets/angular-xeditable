/*
This editor can be created in parent scope via `xeditor` attribute.
Allow to manage one or several editable elements (e.g. complex form, editable row in table).
In fact it is collection of XSingleEditor instances.
*/
angular.module('XEditable').factory('XEditor', ['$q', function($q) {
  function XEditor(overrides) {
    //to call without `new`
    if(!(this instanceof XEditor)) {
      return new XEditor(overrides);
    }

    this.visible = false;
    this.loading = false;
    this.$$watchers = {};
    this.items = [];
    this.hasErrors = false;

    angular.extend(this, overrides);
  } 

  angular.extend(XEditor.prototype, {
    show: function() {
      if(!this.items.length) {
        throw 'XEditable: no items in editor!';
      }
      this.visible = true;
      var promises = [];
      //onShow may return promise
      var result = this.onShow();
      if(result) {
        promises.push($q.when(result));
      }
      //show each editable
      for (var i = 0; i < this.items.length; i++) {
        result = this.items[i].show();
        if(result) {
          promises.push($q.when(result));
        } 
      }
      if(promises.length) {
        this.setLoading(true);
        $q.all(promises).then(
          angular.bind(this, function(){
            this.setLoading(false);
            this.items[0].activate();
          }),
          angular.bind(this, function(error){
            this.setLoading(false);
            /*
            if(this.items.length === 1 && angular.isString(error)) {
              this.setError(this.items[0].modelName, error);
            }
            */
          })
        );
      } else { //if no promises - just activate first
        this.items[0].activate();
      }
    },
    hide: function() {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].hide();
      }
      this.visible = false;
      this.onHide();
    },
    save: function(validate) {
      validate = validate === undefined ? true : validate;
      var error, firstErrorIndex;
      this.hasErrors = false;
      if(validate) {
        for (var i = 0; i < this.items.length; i++) {
          if(this.items[i].validate()) {
            if(!this.hasErrors) {
              firstErrorIndex = i;
            }
            this.hasErrors = true;
          }
        }
      }
      this.onValidate();
      if(this.hasErrors) {
        this.items[firstErrorIndex].activate();
      } else {
        //save all without validation
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].save(false);
        }
        var promise = this.onSave();
        console.log(promise);
        if(promise) {
          this.setLoading(true);
          $q.when(promise).then(
            angular.bind(this, function(){            
              this.setLoading(false);
              //this.hide();
            }),
            angular.bind(this, function(error){
              this.setLoading(false);
            })
          );
        } else {
          //this.hide();
        }
      }
    },
    /*
    Set self `loading `flag to true and all children
    */
    setLoading: function(value) {
      this.loading = value;
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].setLoading(value);
      }
    },
    /*
    Suitable only when items == 1
    */
    setError: function(text) {
      if(this.items.length === 1) {
        this.items[0].setError(text);
      }
    },
    /*
    Refresh `visible` property:
    if at least one child visible --> consider this.visible = true
    */
    refreshVisible: function() {
      this.visible = false;
      for (var i = 0; i < this.items.length; i++) {
        if(this.items[i].visible) {
          this.visible = true;
          break;
        }
      }      
    },
    /*
    Returns single editor by xmodel
    */
    getSingleEditor: function(xmodel) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].modelName === xmodel) {
          return this.items[i];
        }
      }
    },
    /*
    Emulation of angular $watch to watch changes of values in editor
    */
    $watch: function(modelName, callback) {
      this.$$watchers[modelName] = callback;
    },
    onShow: angular.noop,
    onValidate: angular.noop,
    onSave: angular.noop,
    onHide: angular.noop
  });

  //return constructor
  return XEditor;
}]);