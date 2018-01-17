/*
Input types: text|password|email|tel|number|url|search|color|date|datetime|datetime-local|time|month|week|file
*/

(function() {

  var camelCase = function(dashDelimitedString) {
    return dashDelimitedString.toLowerCase().replace(/-(.)/g, function(match, word) {
      return word.toUpperCase();
    });
  };

  var types = 'text|password|email|tel|number|url|search|color|date|datetime|datetime-local|time|month|week|file'.split('|');

  //todo: datalist

  // generate directives
  angular.forEach(types, function(type) {
    var directiveName = camelCase('editable' + '-' + type);
    angular.module('xeditable').directive(directiveName, ['editableDirectiveFactory',
      function(editableDirectiveFactory) {
        return editableDirectiveFactory({
          directiveName: directiveName,
          inputTpl: '<input type="'+type+'">',
          render: function() {
            this.parent.render.call(this);

            var attrs = this.attrs;
            var scope = this.scope;

            //Add bootstrap simple input groups
            if (attrs.eInputgroupleft || attrs.eInputgroupright) {
              this.inputEl.wrap('<div class="input-group"></div>');

              if (attrs.eInputgroupleft) {
                var inputGroupLeft = angular.element('<span class="input-group-addon" data-ng-bind="' + attrs.eInputgroupleft + '"></span>');
                this.inputEl.parent().prepend(inputGroupLeft);
              }

              if (attrs.eInputgroupright) {
                var inputGroupRight = angular.element('<span class="input-group-addon" data-ng-bind="' + attrs.eInputgroupright + '"></span>');
                this.inputEl.parent().append(inputGroupRight);
              }
            }

            // Add label to the input
            if (attrs.eLabel) {
              var label = angular.element('<label>' + attrs.eLabel + '</label>');
              if (attrs.eInputgroupleft || attrs.eInputgroupright) {
                this.inputEl.parent().parent().prepend(label);
              } else {
                this.inputEl.parent().prepend(label);
              }
            }

            // Add classes to the form
            if (attrs.eFormclass) {
              this.editorEl.addClass(attrs.eFormclass);
              this.inputEl.removeAttr('formclass');
            }
          },
          autosubmit: function() {
            var self = this;
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
    }]);
  });

  //`range` is bit specific
  angular.module('xeditable').directive('editableRange', ['editableDirectiveFactory', '$interpolate',
    function(editableDirectiveFactory, $interpolate) {
      return editableDirectiveFactory({
        directiveName: 'editableRange',
        inputTpl: '<input type="range" id="range" name="range">',
        render: function() {
          this.parent.render.call(this);
          this.inputEl.after('<output>' + $interpolate.startSymbol() + '$data' + $interpolate.endSymbol()  + '</output>');
        }
      });
  }]);

}());

