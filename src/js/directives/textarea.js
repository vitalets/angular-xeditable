//textarea
angular.module('xeditable').directive('editableTextarea', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableTextarea',
      inputTpl: '<textarea></textarea>',
      addListeners: function() {
        var self = this;
        // self.parent.addListeners.call(self);
        // The above line should be uncommented, and the copy/paste from it that I've put below
        // is a great dirty hack, but I can't figure out the issue.
        // self.parent.addListeners.call(self);
        // submit textarea by ctrl+enter even with buttons
        if (self.single && self.buttons !== 'no') {
          self.autosubmit();
        }
        self.inputEl.bind('keyup', function(e) {
          if (!self.single) {
            return;
          }

          // todo: move this to editable-form!
          switch (e.keyCode) {
            // hide on `escape` press
            case 27:
              self.scope.$apply(function() {
                self.scope.$form.$cancel();
              });
              break;
          }
        });

        // autosubmit when `no buttons`
        if (self.single && self.buttons === 'no') {
          self.autosubmit();
        }

        // click - mark element as clicked to exclude in document click handler
        // that closes all opened editables
        self.editorEl.bind('click', function(e) {
          // ignore right/middle button click
          if (e.which !== 1) {
            return;
          }

          if (self.scope.$form.$visible) {
            self.scope.$form._clicked = true;
          }
        });

        // submit textarea by ctrl+enter even with buttons
        if (self.single && self.buttons !== 'no') {
          self.autosubmit();
        }
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('keydown', function(e) {
          if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13)) {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }
        });
      }
    });
}]);
