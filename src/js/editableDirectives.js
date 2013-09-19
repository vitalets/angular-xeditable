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
      inputTpl: '<select></select>'
    });
}]);


//textarea
angular.module('xeditable').directive('editableTextarea', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableTextarea',
      inputTpl: '<textarea ng-keydown="$editable.keydown($event)"></textarea>',
      keydown: function(e) {
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






