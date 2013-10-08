/*
Angular-ui select2 editable directive.
https://github.com/angular-ui/ui-select2

It seems ui-select2 will be fully rewritten
See: https://github.com/angular-ui/ui-select2/issues/82
*/
angular.module('xeditable').directive('editableSelect2', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableSelect2',
      inputTpl: '<select ui-select2></select>',
      render: function() {
        this.parent.render.call(this);
        // ui-select2 can't work with ng-options => we use `e-ng-repeat`, `e-option-value` and `e-option-text`
        var repeat = this.attrs.eNgRepeat;
        var value = this.attrs.eOptionValue;
        var text = this.attrs.eOptionText;
        if(!repeat || !value || !text) {
          throw 'For editable-select2 you should provide `e-ng-repeat`, `e-option-value` and `e-option-text`!';
        }

        // clean <select> from option attributes
        this.inputEl.removeAttr('ng-repeat');
        this.inputEl.removeAttr('option-value');
        this.inputEl.removeAttr('option-text');

        // add <option> with ng-repeat
        this.inputEl.append('<option ng-repeat="'+repeat+'" value="{{'+value+'}}">{{'+text+'}}</option>');
      }
    });
}]);