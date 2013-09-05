/*
Factory to create editable directives
*/
angular.module('XEditable').factory('editableFactory', ['$parse', 'XSingleEditor', 'XEditor', '$document', 
  function($parse, XSingleEditor, XEditor, $document) {
  //once bind `click` to document to close editors
  $document.bind('click', function(){
    //console.log('document clicked');
  });
  //todo: bind `escape keypress` to close
  //todo: collect editors?
  //directive object
  return function(overwriteEditor) {
    return { 
      restrict: 'A',
      scope: true,
      require: '?^editableForm',
      link: function preLink(scope, elem, attrs, ctrl) {
        //creale local single editor
        scope.$editor = new XSingleEditor(scope, elem, attrs);
        //overwrite some methods
        if(overwriteEditor) {
          angular.extend(scope.$editor, overwriteEditor);
        }



        if(ctrl) {
          ctrl.init(scope.$editor.modelName);
        }



        //render input, must be called after overwrite.
        scope.$editor.renderInput();
        //render wrapInput, must be called after renderInput.
        scope.$editor.renderWrapInput();

        var isMulti = false;
        var editorExt;

        //if `editor` attribute defined --> export editor to parent scope.
        //Exported editor can manage several editable elements (e.g. editable row) 
        if (attrs.xeditor) {
          //try get editor from parent scope - it may be already defined
          var editorExtGetter = $parse(attrs.xeditor);
          editorExt = editorExtGetter(scope.$parent);
          //if editor not defined in parent scope - create it
          if(!editorExt) {
            editorExt = new XEditor();
            //put external editor to parent scope
            editorExtGetter.assign(scope.$parent, editorExt);
          }

          //add current local editor to collection
          editorExt.items.push(scope.$editor);

          //watch change of local visible property to update master editor
          scope.$watch('$editor.visible', function(){
            editorExt.refreshVisible();
          });
          //watch change of value 
          if(editorExt.$$watchers[scope.$editor.modelName]) {
            scope.$watch('$editor.value', editorExt.$$watchers[scope.$editor.modelName]);
          }

          //render depends on how many items are there in external editor
          //if == 1: render with form and buttons
          //if > 1: render withour form and buttons
          var l = editorExt.items.length;
          if(l > 1) {
            isMulti = true;
            if(l === 2) {
              //re-render first editor in multi mode (without form and buttons)
              editorExt.items[0].renderEditor(true);
            }
          }
        } 

        //single element is rendered with form and buttons, multi - without
        scope.$editor.renderEditor(isMulti);

        //open by click (for single element)
        scope.$editor.bindTrigger(editorExt || null);
      }
    };
  };
}])