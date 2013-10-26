/*
Returns editableForm controller
*/
angular.module('xeditable').factory('editableFormController', 
  ['$parse', 'editablePromiseCollection',
  function($parse, editablePromiseCollection) {

  var base = {
    $addEditable: function(editable) {
      //console.log('add editable', editable.elem, editable.elem.bind);
      this.$editables.push(editable);

      //'on' is not supported in angular 1.0.8
      editable.elem.bind('$destroy', angular.bind(this, this.$removeEditable, editable));

      //bind editable's local $form to self (if not bound yet, below form) 
      if (!editable.scope.$form) {
        editable.scope.$form = this;
      }

      //if form already shown - call show() of new editable
      if (this.$visible) {
        editable.catchError(editable.show());
      }
    },

    $removeEditable: function(editable) {
      //arrayRemove
      for(var i=0; i < this.$editables.length; i++) {
        if(this.$editables[i] === editable) {
          this.$editables.splice(i, 1);
          return;
        }
      }
    },

    /**
     * Shows form with editable controls.
     * 
     * @method $show()
     * @memberOf editable-form
     */
    $show: function() {
      if (this.$visible) {
        return;
      }

      this.$visible = true;

      var pc = editablePromiseCollection();

      //own show
      pc.when(this.$onshow());

      //clear errors
      this.$setError(null, '');

      //children show
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.show());
      });

      //wait promises and activate
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, this.$activate), 
        onFalse: angular.bind(this, this.$activate), 
        onString: angular.bind(this, this.$activate)
      });
    },

    /**
     * Sets focus on form field specified by `name`.
     * 
     * @method $activate(name)
     * @param {string} name name of field
     * @memberOf editable-form
     */
    $activate: function(name) {
      var i;
      if (this.$editables.length) {
        //activate by name
        if (angular.isString(name)) {
          for(i=0; i<this.$editables.length; i++) {
            if (this.$editables[i].name === name) {
              this.$editables[i].activate();
              return;
            }
          }
        }

        //try activate error field
        for(i=0; i<this.$editables.length; i++) {
          if (this.$editables[i].error) {
            this.$editables[i].activate();
            return;
          }
        }

        //by default activate first field
        this.$editables[0].activate();
      }
    },

    /**
     * Hides form with editable controls without saving.
     * 
     * @method $hide()
     * @memberOf editable-form
     */
    $hide: function() {
      if (!this.$visible) {
        return;
      }      
      this.$visible = false;
      // self hide
      this.$onhide();
      // children's hide
      angular.forEach(this.$editables, function(editable) {
        editable.hide();
      });
    },

    /**
     * Triggers `oncancel` event and calls `$hide()`.
     * 
     * @method $cancel()
     * @memberOf editable-form
     */
    $cancel: function() {
      if (!this.$visible) {
        return;
      }      
      // self cancel
      this.$oncancel();
      // children's cancel      
      angular.forEach(this.$editables, function(editable) {
        editable.cancel();
      });
      // self hide
      this.$hide();
    },    

    $setWaiting: function(value) {
      this.$waiting = !!value;
      // we can't just set $waiting variable and use it via ng-disabled in children
      // because in editable-row form is not accessible
      angular.forEach(this.$editables, function(editable) {
        editable.setWaiting(!!value);
      });
    },

    /**
     * Shows error message for particular field.
     * 
     * @method $setError(name, msg)
     * @param {string} name name of field
     * @param {string} msg error message
     * @memberOf editable-form
     */
    $setError: function(name, msg) {
      angular.forEach(this.$editables, function(editable) {
        if(!name || editable.name === name) {
          editable.setError(msg);
        }
      });
    },

    $submit: function() {
      if (this.$waiting) {
        return;
      } 

      //clear errors
      this.$setError(null, '');

      //children onbeforesave
      var pc = editablePromiseCollection();
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.onbeforesave());
      });

      /*
      onbeforesave result:
      - true/undefined: save data and close form
      - false: close form without saving
      - string: keep form open and show error
      */
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, checkSelf, true), 
        onFalse: angular.bind(this, checkSelf, false), 
        onString: angular.bind(this, this.$activate)
      });

      //save
      function checkSelf(childrenTrue){
        var pc = editablePromiseCollection();
        pc.when(this.$onbeforesave());
        pc.then({
          onWait: angular.bind(this, this.$setWaiting), 
          onTrue: childrenTrue ? angular.bind(this, this.$save) : angular.bind(this, this.$hide), 
          onFalse: angular.bind(this, this.$hide), 
          onString: angular.bind(this, this.$activate)
        });
      }
    },

    $save: function() {
      // write model for each editable
      angular.forEach(this.$editables, function(editable) {
        editable.save();
      });

      //call onaftersave of self and children
      var pc = editablePromiseCollection();
      pc.when(this.$onaftersave());
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.onaftersave());
      });

      /*
      onaftersave result:
      - true/undefined/false: just close form
      - string: keep form open and show error
      */
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, this.$hide), 
        onFalse: angular.bind(this, this.$hide), 
        onString: angular.bind(this, this.$activate)
      });
    },

    $onshow: angular.noop,
    $oncancel: angular.noop,
    $onhide: angular.noop,
    $onbeforesave: angular.noop,
    $onaftersave: angular.noop
  };

  return function() {
    return angular.extend({
      $editables: [],
      /**
       * Form visibility flag.
       * 
       * @var {bool} $visible
       * @memberOf editable-form
       */
      $visible: false,
      /**
       * Form waiting flag. It becomes `true` when form is loading or saving data.
       * 
       * @var {bool} $waiting
       * @memberOf editable-form
       */
      $waiting: false,
      $data: {}
    }, base);
  };
}]);
