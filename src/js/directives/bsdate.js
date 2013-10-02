/*
Angular-ui bootstrap datepicker
http://angular-ui.github.io/bootstrap/#/datepicker
*/
angular.module('xeditable').directive('editableBsdate', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableBsdate',
      modelKeyName: 'modelKey',
      inputTpl: '<input type="text">'
    });
}]);
