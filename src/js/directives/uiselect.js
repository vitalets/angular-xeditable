/*
 AngularJS-native version of Select2 and Selectize
 https://github.com/angular-ui/ui-select
 */
angular.module('xeditable').directive('editableUiSelect',['editableDirectiveFactory',
    function(editableDirectiveFactory) {
        var rename = function (tag, el) {
            var newEl = angular.element('<' + tag + '/>');
            newEl.html(el.html());
            var attrs = el[0].attributes;
            for (var i = 0; i < attrs.length; ++i) {
                newEl.attr(attrs.item(i).nodeName, attrs.item(i).value);
            }
            return newEl;
        };

        var match = [];
        var choices = [];

        var dir = editableDirectiveFactory({
            directiveName: 'editableUiSelect',
            inputTpl: '<ui-select></ui-select>',
            render: function () {
                var index = -1;
                for(var i = 0, len = match.length; i < len; i++) {
                  if (match[i].name === this.name) {
                      index = i;
                      break;
                  }
              }
                this.parent.render.call(this);
                this.inputEl.append(rename('ui-select-match', match[index].element));
                this.inputEl.append(rename('ui-select-choices', choices[index].element));
                this.inputEl.removeAttr('ng-model');
                this.inputEl.attr('ng-model', '$parent.$data');
            }
        });

        var linkOrg = dir.link;

        dir.link = function (scope, el, attrs, ctrl) {
            var matchEl = el.find('editable-ui-select-match');
            var choicesEl = el.find('editable-ui-select-choices');

            match.push({'name' : attrs.name || attrs.editableUiSelect, 'element' : matchEl.clone()});
            choices.push({'name' : attrs.name || attrs.editableUiSelect, 'element' : choicesEl.clone()});

            matchEl.remove();
            choicesEl.remove();

            return linkOrg(scope, el, attrs, ctrl);
        };

        return dir;
    }]);