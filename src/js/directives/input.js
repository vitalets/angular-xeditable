/*
Input types: text|email|tel|number|url|search|color|date|datetime|time|month|week
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
          inputTpl: '<input type="'+type+'">'
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

