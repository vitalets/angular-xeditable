/*
 Tags input directive for AngularJS
 https://github.com/mbenford/ngTagsInput
 */
angular.module('xeditable').directive('editableTagsInput', ['editableDirectiveFactory', 'editableUtils',
  function(editableDirectiveFactory, editableUtils) {
    var findElement = function(name) {
        for(var i = 0, len = autoComplete.length; i < len; i++) {
            if (autoComplete[i].name === name) {
                return i;
            }
        }
    };

    var autoComplete = [];

    var dir = editableDirectiveFactory({
        directiveName: 'editableTagsInput',
        inputTpl: '<tags-input></tags-input>',
        render: function () {
            var index = findElement(this.name);
            this.parent.render.call(this);
            this.inputEl.append(editableUtils.rename('auto-complete', autoComplete[index].element));
            this.inputEl.removeAttr('ng-model');
            this.inputEl.attr('ng-model', '$parent.$data');
        }
    });

    var linkOrg = dir.link;

    dir.link = function (scope, el, attrs, ctrl) {
        var autoCompleteEl = el.find('editable-tags-input-auto-complete');

        autoComplete.push({name : attrs.name || attrs.editableTagsInput, element : autoCompleteEl.clone()});

        autoCompleteEl.remove();

        return linkOrg(scope, el, attrs, ctrl);
    };

    return dir;
}]);