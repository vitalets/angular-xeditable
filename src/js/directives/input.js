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

            if (this.attrs.eLabel) {
              var label = angular.element('<label>' + this.attrs.eLabel + '</label>');
              this.inputEl.parent().prepend(label);
            }
          }
        });
    }]);
  });

  //`range` is bit specific
  angular.module('xeditable').directive('editableRange', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
      return editableDirectiveFactory({
        directiveName: 'editableRange',
        inputTpl: '<input type="range" id="range" name="range">',
        render: function() {
          this.parent.render.call(this);
          this.inputEl.after('<output>{{$data}}</output>');
        }        
      });
  }]);

}());

