//text
angular.module('xeditable').directive('editableText', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableText',
      inputTpl: '<input type="text">'
    });
}]);