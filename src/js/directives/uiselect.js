/*
 AngularJS-native version of Select2 and Selectize
 https://github.com/angular-ui/ui-select
 */
angular.module('xeditable').directive('editableUiSelect',['editableDirectiveFactory', 'editableUtils',
    function(editableDirectiveFactory, editableUtils) {
        var dir = editableDirectiveFactory({
            directiveName: 'editableUiSelect',
            inputTpl: '<ui-select></ui-select>',
            render: function () {
                this.parent.render.call(this);
                this.inputEl.append(editableUtils.rename('ui-select-match', this.attrs.$matchElement));
                this.inputEl.append(editableUtils.rename('ui-select-choices', this.attrs.$choicesElement));
                this.inputEl.removeAttr('ng-model');
                this.inputEl.attr('ng-model', '$parent.$parent.$data');
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

                self.inputEl.bind('keydown', function(e) {
                    //submit on tab
                    if (e.keyCode === 9 && self.editorEl.attr('blur') === 'submit') {
                        self.scope.$apply(function() {
                            self.scope.$form.$submit();
                        });
                    }
                });
            }
        });

        var linkOrg = dir.link;

        dir.link = function (scope, el, attrs, ctrl) {
            var matchEl = el.find('editable-ui-select-match');
            var choicesEl = el.find('editable-ui-select-choices');

            attrs.$matchElement = matchEl.clone();
            attrs.$choicesElement = choicesEl.clone();

            matchEl.remove();
            choicesEl.remove();

            return linkOrg(scope, el, attrs, ctrl);
        };

        return dir;
    }]);