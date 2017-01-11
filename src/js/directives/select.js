//select
angular.module('xeditable').directive('editableSelect', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableSelect',
      inputTpl: '<select></select>',
      render: function() {
        this.parent.render.call(this);

        if (this.attrs.ePlaceholder) {
          var placeholder = angular.element('<option value="">' + this.attrs.ePlaceholder + '</option>');
          this.inputEl.append(placeholder);
        }
      },
      autosubmit: function() {
        var self = this;

        if (!self.attrs.hasOwnProperty("eMultiple")) {
          self.inputEl.bind('change', function () {
            self.scope.$apply(function () {
                self.scope.$form.$submit();
            });
          });
        }
      }
    });
}]);