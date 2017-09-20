//textarea
angular.module('xeditable').directive('editableTextarea', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableTextarea',
      inputTpl: '<textarea></textarea>',
      render: function() {
          this.parent.render.call(this);

          // Add classes to the form
          if (this.attrs.eFormclass) {
              this.editorEl.addClass(this.attrs.eFormclass);
              this.inputEl.removeAttr('formclass');
          }
      },
      addListeners: function() {
        var self = this;
        self.parent.addListeners.call(self);
        // submit textarea by ctrl+enter even with buttons
        if (self.single && self.buttons !== 'no') {
          self.autosubmit();
        }
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('keydown', function(e) {
          if (self.attrs.submitOnEnter) {
            if (e.keyCode === 13 && !e.shiftKey) {
              self.scope.$apply(function() {
                self.scope.$form.$submit();
              });
            }
          } else if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13) || 
                (e.keyCode === 9 && self.editorEl.attr('blur') === 'submit')) {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }
        });
      }
    });
}]);
