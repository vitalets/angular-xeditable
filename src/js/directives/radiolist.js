// radiolist
angular.module('xeditable').directive('editableRadiolist', [
  'editableDirectiveFactory',
  'editableNgOptionsParser',
  function(editableDirectiveFactory, editableNgOptionsParser) {
    return editableDirectiveFactory({
      directiveName: 'editableRadiolist',
      inputTpl: '<span></span>',
      render: function() {
        this.parent.render.call(this);
        var parsed = editableNgOptionsParser(this.attrs.eNgOptions);

        var html = '<label data-ng-repeat="'+parsed.ngRepeat+'">'+
          '<input type="radio" data-ng-disabled="::' + this.attrs.eNgDisabled + '" data-ng-model="$parent.$parent.$data" value="{{::'+parsed.locals.valueFn+'}}">'+
          '<span data-ng-bind="::'+parsed.locals.displayFn+'"></span></label>';

        this.inputEl.removeAttr('ng-model');
        this.inputEl.removeAttr('ng-options');
        this.inputEl.html(html);
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          setTimeout(function() {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }, 500);
        });
      }
    });
}]);
