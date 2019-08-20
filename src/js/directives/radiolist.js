// radiolist
angular.module('xeditable').directive('editableRadiolist', [
  'editableDirectiveFactory',
  'editableNgOptionsParser',
  '$interpolate',
  function(editableDirectiveFactory, editableNgOptionsParser, $interpolate) {
    return editableDirectiveFactory({
      directiveName: 'editableRadiolist',
      inputTpl: '<span></span>',
      render: function() {
        this.parent.render.call(this);
        var parsed = editableNgOptionsParser(this.attrs.eNgOptions),
            ngChangeHtml = '',
            ngNameHtml = '',
            ngValueFn = isNaN(parsed.locals.valueFn) ? "'" + parsed.locals.valueFn + "'" : parsed.locals.valueFn,
            ngDisabled = this.attrs.eNgDisabled ? this.attrs.eNgDisabled : false;

        if (this.attrs.eNgChange) {
          ngChangeHtml = ' ng-change="' +  this.attrs.eNgChange + '"';
        }

        if (this.attrs.eName) {
            ngNameHtml = ' name="' +  this.attrs.eName + '"';
        }

        var html = '<label data-ng-repeat="'+parsed.ngRepeat+'">'+
          '<input type="radio" data-ng-disabled="::' +
            ngDisabled +
            '" data-ng-model="$parent.$parent.$data" data-ng-value="' + $interpolate.startSymbol() +
            '::' + ngValueFn + $interpolate.endSymbol() +'"' +
            ngChangeHtml + ngNameHtml + '>'+
          '<span data-ng-bind="::'+parsed.locals.displayFn+'"></span></label>';

        this.inputEl.removeAttr('ng-model');
        this.inputEl.removeAttr('ng-options');
        this.inputEl.removeAttr('ng-change');
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
