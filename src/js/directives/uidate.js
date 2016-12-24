/*
 jQuery UI Datepicker for AngularJS
 https://github.com/angular-ui/ui-date
 */
angular.module('xeditable').directive('editableUidate', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableUidate',
            inputTpl: '<input class="form-control" />',
            render: function() {
                this.parent.render.call(this);
                this.inputEl.attr('ui-date', this.attrs.eUiDate);
                this.inputEl.attr('placeholder', this.attrs.ePlaceholder);
            }
        });
}]);
