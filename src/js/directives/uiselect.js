/*
 AngularJS-native version of Select2 and Selectize
 https://github.com/angular-ui/ui-select
 */
angular.module('xeditable').directive('editableUiSelect',['editableDirectiveFactory', 'editableUtils',
    function(editableDirectiveFactory, editableUtils) {
        var findElement = function(name) {
            for(var i = 0, len = match.length; i < len; i++) {
                  if (match[i].name === name) {
                      return i;
                  }
              }
        };

        var match = [];
        var choices = [];

        var dir = editableDirectiveFactory({
            directiveName: 'editableUiSelect',
            inputTpl: '<ui-select></ui-select>',
            render: function () {
                var index = findElement(this.name);
                this.parent.render.call(this);
                this.inputEl.append(editableUtils.rename('ui-select-match', match[index].element));
                this.inputEl.append(editableUtils.rename('ui-select-choices', choices[index].element));
                this.inputEl.removeAttr('ng-model');
                this.inputEl.attr('ng-model', '$parent.$parent.$data');
            }
        });

        var linkOrg = dir.link;

        dir.link = function (scope, el, attrs, ctrl) {
            var matchEl = el.find('editable-ui-select-match');
            var choicesEl = el.find('editable-ui-select-choices');

            match.push({name : attrs.name || attrs.editableUiSelect, element : matchEl.clone()});
            choices.push({name : attrs.name || attrs.editableUiSelect, element : choicesEl.clone()});

            matchEl.remove();
            choicesEl.remove();

            return linkOrg(scope, el, attrs, ctrl);
        };

        return dir;
    }]);