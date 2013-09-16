/*
Helpers
*/

/*
Collect results of function calls. Shows waiting if there are promises. 
Finally, applies callbacks if:
- onTrue(): all results are true and all promises resolved to true
- onFalse(): at least one result is false or promise resolved to false
- onString(): at least one result is string or promise rejected or promise resolved to string
*/
angular.module('xeditable').factory('editablePromiseCollection', function($q) { 

  function promiseCollection() {
    return {
      promises: [],
      hasFalse: false,
      hasString: false,
      when: function(result, noPromise) {
        if (result === false) {
          this.hasFalse = true;
        } else if (!noPromise && angular.isObject(result)) {
          this.promises.push($q.when(result));
        } else if (angular.isString(result)){
          this.hasString = true;
        } else { //result === true || result === undefined || result === null
          return;
        }
      },
      //callbacks: onTrue, onFalse, onString
      then: function(callbacks) {
        callbacks = callbacks || {};
        var onTrue = callbacks.onTrue || angular.noop;
        var onFalse = callbacks.onFalse || angular.noop;
        var onString = callbacks.onString || angular.noop;
        var onWait = callbacks.onWait || angular.noop;

        var self = this;

        if (this.promises.length) {
          onWait(true);
          $q.all(this.promises).then(
            //all resolved       
            function(results) {
              onWait(false);
              //check all results via same `when` method (without checking promises)
              angular.forEach(results, function(result) {
                self.when(result, true);  
              });
              applyCallback();
            },
            //some rejected
            function(error) { 
              onWait(false);
              onString();
            }
          );
        } else {
          applyCallback();
        }

        function applyCallback() {
          if (!self.hasString && !self.hasFalse) {
            onTrue();
          } else if (!self.hasString && self.hasFalse) {
            onFalse();
          } else {
            onString();
          }
        }

      }
    };
  }

  return promiseCollection;

});