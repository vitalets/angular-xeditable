angular.module('xeditable').directive('editableAwesomplete', [
  'editableDirectiveFactory', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
      directiveName: 'editableAwesomplete',
      inputTpl: '<input />',
      render : function() {
          this.parent.render.call(this);
          new Awesomplete(this.inputEl[0], {
              //list : ['CSS', 'JavaScript'],
              filter: function(text, input) {
                  return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
              },
              replace: function(text) {
                  var before = this.input.value.match(/^.+,\s*|/)[0];
                  this.input.value = before + text + ", ";
                  var $e = angular.element(this.input);
                  $e.triggerHandler('input');
              }
        });
      }
    });
 
}]);
