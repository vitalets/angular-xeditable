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

            //Add bootstrap simple input groups
            if (this.attrs.eInputgroupleft || this.attrs.eInputgroupright) {
              this.inputEl.wrap('<div class="input-group"></div>');

              if (this.attrs.eInputgroupleft) {
                var inputGroupLeft = angular.element('<span class="input-group-addon">' + this.attrs.eInputgroupleft + '</span>');
                this.inputEl.parent().prepend(inputGroupLeft);
              }

              if (this.attrs.eInputgroupright) {
                var inputGroupRight = angular.element('<span class="input-group-addon">' + this.attrs.eInputgroupright + '</span>');
                this.inputEl.parent().append(inputGroupRight);
              }
            }

            // Add label to the input
            if (this.attrs.eLabel) {
              var label = angular.element('<label>' + this.attrs.eLabel + '</label>');
              if (this.attrs.eInputgroupleft || this.attrs.eInputgroupright) {
                this.inputEl.parent().parent().prepend(label);
              } else {
                this.inputEl.parent().prepend(label);
              }
            }
            
            // Add classes to the form
            if (this.attrs.eFormclass) {
              this.editorEl.addClass(this.attrs.eFormclass);
            }
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

