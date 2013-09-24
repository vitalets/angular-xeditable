//text
angular.module('xeditable').directive('editableText', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableText',
      inputTpl: '<input type="text">'
    });
}]);

//select
angular.module('xeditable').directive('editableSelect', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableSelect',
      inputTpl: '<select></select>',
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          //console.log('QQ');
          self.scope.$apply(function() {
            //self.editorEl[0].submit();
            self.scope.$form.$submit();
          });
        });
      }
    });
}]);


//textarea
angular.module('xeditable').directive('editableTextarea', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableTextarea',
      inputTpl: '<textarea ng-keydown="$editable.keydown($event)"></textarea>',
      // todo: check ng-keydown in angular 1.0.8 - seems to be broken (mac)
      keydown: function(e) {
        console.log('keydown', e);
        // todo: check ctrl on mac keyboard!!
        if (e.ctrlKey && (e.keyCode === 13)) {
          this.scope.$form.$submit();
        }
      }
    });
}]);


//checkbox
angular.module('xeditable').directive('editableCheckbox', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableCheckbox',
      inputTpl: '<input type="checkbox">',
      render: function() {
        this.parent.render.call(this);
        if(this.attrs.eTitle) {
          this.inputEl.wrap('<label></label>');
          this.inputEl.after(angular.element('<span></span>').text(' '+this.attrs.eTitle));
        }
      }
    });
}]);






