/*
 Tags input directive for AngularJS
 https://github.com/mbenford/ngTagsInput
 */
angular.module('xeditable').directive('editableTagsInput', ['editableDirectiveFactory', 'editableUtils',
  function(editableDirectiveFactory, editableUtils) {
    var dir = editableDirectiveFactory({
        directiveName: 'editableTagsInput',
        inputTpl: '<tags-input></tags-input>',
        render: function () {
            this.parent.render.call(this);
            this.inputEl.append(editableUtils.rename('auto-complete', this.attrs.$autoCompleteElement));
            this.inputEl.removeAttr('ng-model');
            this.inputEl.attr('ng-model', '$parent.$data');
        }
    });

    var linkOrg = dir.link;

    dir.link = function (scope, el, attrs, ctrl) {
        var autoCompleteEl = el.find('editable-tags-input-auto-complete');

        attrs.$autoCompleteElement = autoCompleteEl.clone();

        autoCompleteEl.remove();

        return linkOrg(scope, el, attrs, ctrl);
    };

    return dir;
}]);