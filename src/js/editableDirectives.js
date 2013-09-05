//text
angular.module('xeditable').directive('editableText', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableText',
    inputTpl: '<input type="text">'
  });
});

//select
angular.module('xeditable').directive('editableSelect', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableSelect',
    inputTpl: '<select></select>'
  });
});


//textarea
angular.module('xeditable').directive('editableTextarea', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableTextarea',
    inputTpl: '<textarea ng-keydown="$editable.keydown($event)"></textarea>',
    keydown: function(e) {
      if (e.ctrlKey && (e.keyCode === 13)) {
        this.scope.$form.$submit();
      }
    }
  });
});


//checkbox
angular.module('xeditable').directive('editableCheckbox', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableCheckbox',
    inputTpl: '<input type="checkbox">',
    render: function() {
      this.parent.render.call(this);
      if(this.attrs.title) {
        this.inputEl.wrap('<label></label>');
        this.inputEl.after(angular.element('<span></span>').text(' '+this.attrs.title));
      }
    }
  });
});






