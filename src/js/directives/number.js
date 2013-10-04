/*
Angular-ui bootstrap datepicker
http://angular-ui.github.io/bootstrap/#/datepicker
*/
angular.module('xeditable').directive('editableNumber', ['editableDirectiveFactory',
  function (editableDirectiveFactory) {
      return editableDirectiveFactory({
          directiveName: 'editableNumber',
          inputTpl: '<input type="number">'
      });
  }]);
