/*
All standart directives
*/
angular.module('XEditable')

//editable-text
.directive('editableText', ['editableFactory', function(editableFactory) {
  return editableFactory({
    inputTpl: '<input type="text">'
  });
}])

//editable-select
.directive('editableSelect', ['editableFactory', function(editableFactory) {
  return editableFactory({
    inputTpl: '<select></select>'
  });
}])

//editable-textarea
.directive('editableTextarea', ['editableFactory', function(editableFactory) {
  return editableFactory({
    inputTpl: '<textarea ng-keydown="$editor.keydown($event)"></textarea>', 
    keydown: function(e) { //submit by ctrl enter
      if (e.ctrlKey && (e.keyCode === 13)) {
        this.save();
      }
    }
  });
}])

//editable-checkbox
.directive('editableCheckbox', ['editableFactory', function(editableFactory) {
  return editableFactory({
    inputTpl: '<input type="checkbox">',
    renderWrapInput: function() {
      this.wrapInputEl = angular.element('<label></label>');  
      this.wrapInputEl.append(this.inputEl);  
      if(this.xlabel) {
        var label = this.xlabel(this.scope.$parent);  
        if(label) {
          this.wrapInputEl.append(label);
        }
      }
    }
  });
}]);