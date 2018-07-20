import $ from 'jquery';
import angular from 'angular';
import _angularMocks from 'angular-mocks';
import uiDate from './date.js';

const module = angular.mock.module;
const inject = angular.mock.inject;

describe('uiDate', function() {

  function selectDate(element, date) {
    element.datepicker('setDate', date);
    $.datepicker._selectDate(element);
  }

  beforeEach(module(uiDate.name));
  describe('simple use on input element', function() {
    it('should have a date picker attached', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile('<input ui-date/>')($rootScope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<input ui-date ng-model="x"/>')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should handle the "readonly" attribute', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile('<input ui-date readonly=\'readonly\' />')($rootScope);
        $rootScope.$apply();
        $(document.body).append(element);
        // On initial load the datepicker is attached to the DOM but its style (i.e.
        // display: none) has not been applied -- it will be invisible but the
        // ":visible" will fail which would be solved for checking ":empty". However,
        // this doesn't handle the case where the readonly attribute is dynamically
        // toggled -- so for this test to pass properly, we must first initialize the
        // datepicker by toggling it before checking visibility.
        element.datepicker('show');
        element.datepicker('hide');
        element.focus();
        expect(angular.element('#ui-datepicker-div').is(':visible')).toBeFalsy();
        element.remove();
      });
    });
    it('should put the date in the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<input ui-date ng-model="x"/>')($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });
    it('should not trigger a ng-change when nothing changes', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<input ui-date ng-model="x" />')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        var cur = $rootScope.x;
        element.focus();
        element.blur();

        expect($rootScope.x).toEqual(cur);
      // cur = $rootScope.x;
      // element.focus();
      // element.blur();
      // expect($rootScope.x).toBe(cur);
      });
    });
  // this test passes on chrome 47 but dies on firefox 42.  Travis on firefox 31 is ok
  // it('should hide the date picker after selecting a date', function() {
  //   inject(function($compile, $rootScope, $document) {
  //     var aDate, element;
  //     aDate = new Date(2010, 12, 1);
  //     element = $compile('<input ui-date="{showAnim: false}" ng-model="x"/>')($rootScope);
  //     $rootScope.$apply();
  //     //angular.element(document).find('body').append(element); // Need to add it to the document so that it can get focus
  //     $($document[0].body).append(element);
  //     element.focus();
  //     expect(angular.element('#ui-datepicker-div').is(':visible')).toBeTruthy();
  //     selectDate(element, aDate);
  //     expect(angular.element('#ui-datepicker-div').is(':visible')).toBeFalsy();
  //     element.remove(); // And then remove it again!
  //   });
  // });
  });
  describe('when model is not a Date', function() {
    var element;
    var scope;
    beforeEach(inject(function($compile, $rootScope) {
      element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
      scope = $rootScope;
    }));
    it('should not freak out when the model is null', function() {
      scope.$apply(function() {
        scope.x = null;
      });
      expect(element.datepicker('getDate')).toBeNull();
    });
    it('should not freak out when the model is undefined', function() {
      scope.$apply(function() {
        scope.x = undefined;
      });
      expect(element.datepicker('getDate')).toBeNull();
    });
    it('should throw an error if you try to pass in a boolean when the model is false', function() {
      expect(function() {
        scope.$apply(function() {
          scope.x = false;
        });
      }).toThrow();
    });
  });

  it('should update the input field correctly on a manual update', function() {
    inject(function($compile, $rootScope) {
      var dateString = '2012-08-17';
      var dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
      var element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
      $rootScope.$apply(function() {
        $rootScope.x = dateObj;
      });

      dateString = '2012-7-01';
      dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);

      // Now change the date in the input box
      element.val(dateString);
      element.trigger('input');
      //      expect($rootScope.x).toEqual(element.val());
      expect(element.datepicker('getDate')).toEqual(dateObj);

      // Now blur the input and expect the input to be re-formatted
      // and the model to get converted to a Date object
      element.trigger('blur');
      expect(element.val()).toEqual('2012-07-01');
      $rootScope.$digest();
      expect($rootScope.x).toEqual(dateObj);
    });
  });

  it('should preserve time', function() {
    inject(function($compile, $rootScope) {
      $rootScope.x = new Date(2012, 9, 12, 15);
      var element = $compile('<input ui-date ng-model="x"/>')($rootScope);
      $rootScope.$apply();
      selectDate(element, $rootScope.x);
      expect($rootScope.x.getHours()).toBe(15);
    });
  });

  it('should convert a model string to a Date immediately after applied', function() {
    inject(function($compile, $rootScope) {
      $rootScope.x = '2015-09-13';
      var element = $compile('<input ui-date ng-model="x"/>')($rootScope);
      $rootScope.$apply();
      selectDate(element, $rootScope.x);
      expect($rootScope.x).toEqual(new Date('2015-09-13'));
    });
  });

  describe('jQuery widget', function() {
    var element;

    beforeEach(inject(function($compile, $rootScope) {
      element = $compile('<div><input ui-date="{showOn:\'button\'}"><span>{{5+7}}</span></div>')($rootScope);
      $(document.body).append(element);
      $rootScope.$digest();
    }));

    it('should not stop following elements from linking', function() {
      expect(element.find('span').text()).toEqual('12');
    });

    afterEach(function() {
      element.remove();
    });
  });
  describe('use with user events', function() {
    it('should call the user onSelect event within a scope.$apply context', function() {
      inject(function($compile, $rootScope) {
        var watched = false;
        $rootScope.myDateSelected = function() {
          $rootScope.watchMe = true;
        };
        $rootScope.$watch('watchMe', function(watchMe) {
          if (watchMe) {
            watched = true;
          }
        });
        var aDate = new Date(2012, 9, 11);
        var element = $compile('<input ui-date="{onSelect: myDateSelected}" ng-model="x"/>')($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect(watched).toBeTruthy();
      });
    });

    it('should call the user beforeShow event listener', function() {
      inject(function($compile, $rootScope) {
        var element;
        $rootScope.beforeShowFn = function() {};
        spyOn($rootScope, 'beforeShowFn');
        spyOn($.datepicker, '_findPos').and.returnValue([0, 0]);
        element = $compile('<input ui-date="{beforeShow: beforeShowFn}" ng-model="x" />')($rootScope);
        $rootScope.$apply();

        expect($rootScope.beforeShowFn).not.toHaveBeenCalled();

        element.datepicker('show');
        $rootScope.$apply();

        expect($rootScope.beforeShowFn).toHaveBeenCalled();
      });
    });

    it('should call the user onClose event listener', function() {
      inject(function($compile, $rootScope) {
        var element;
        $rootScope.onCloseFn = function() {};
        spyOn($rootScope, 'onCloseFn');
        spyOn($.datepicker, '_findPos').and.returnValue([0, 0]);
        element = $compile('<input ui-date="{onClose: onCloseFn}" ng-model="x" />')($rootScope);
        $rootScope.$apply();

        expect($rootScope.onCloseFn).not.toHaveBeenCalled();

        element.datepicker('show');
        element.datepicker('hide');
        $rootScope.$apply();

        expect($rootScope.onCloseFn).toHaveBeenCalled();
      });
    });
  });

  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile('<input ui-date ng-model="x" ng-required="true" />')($rootScope);
        $rootScope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<input ui-date ng-model="x" ng-required="true" />')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<input ui-date ng-model="x" ng-required="true" />')($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('simple use on a div element', function() {
    it('should have a date picker attached', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile('<div ui-date></div>')($rootScope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<div ui-date ng-model="x"></div>')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should put the date in the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<div ui-date ng-model="x"></div>')($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });

    it('should cleanup when the datepicker parent is removed', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile('<div ui-date></div>')($rootScope);
        expect(element.data('datepicker')).toBeUndefined();
        $rootScope.$apply();
        expect(element.children().length).toBe(1);
        element.remove();
        $rootScope.$apply();
        expect(element.children().length).toBe(0);
      });
    });

    // it('should focus after selecting a date', function() {
    //   inject(function($compile, $rootScope) {
    //     var element = $compile(`<div>
    //         <input id="firstBox"/>
    //         <input id="focusDate" ui-date/>
    //         </div>`)($rootScope);
    //     $rootScope.$apply();
    //     $(document.body).append(element);
    //     var datePickerElement = element.find('#focusDate');
    //     $rootScope.$apply();
    //     datePickerElement.datepicker('show');
    //     datePickerElement.datepicker('hide');
    //     expect($('#focusDate').is(':focus')).toBe(true);
    //     element.remove();
    //   });
    // });

  });
  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<div ui-date ng-model="x" ng-required="true" ></div>')($rootScope);
        $rootScope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<div ui-date ng-model="x" ng-required="true" ></div>')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile('<div ui-date ng-model="x" ng-required="true" ></div>')($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('when attribute options change', function() {
    it('should watch attribute and update date widget accordingly', function() {
      inject(function($compile, $rootScope) {
        var element;
        $rootScope.config = {
          minDate: 5,
        };
        element = $compile('<input ui-date="config" ng-model="x"/>')($rootScope);
        $rootScope.$apply();
        expect(element.datepicker('option', 'minDate')).toBe(5);
        $rootScope.$apply(function() {
          $rootScope.config.minDate = 10;
        });
        expect(element.datepicker('option', 'minDate')).toBe(10);
      });
    });
  });
});

describe('uiDateFormat', function() {
  beforeEach(module('ui.date'));

  describe('$formatting', function() {
    it('should parse the date correctly from an ISO string', function() {
      inject(function($compile, $rootScope) {
        var aDate, aDateString, element;
        aDate = new Date(2012, 8, 17);
        aDateString = aDate.toISOString();

        element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);
        $rootScope.x = aDateString;
        $rootScope.$digest();

        // Check that the model has not been altered
        expect($rootScope.x).toEqual(aDateString);
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(aDate);
      });
    });
    it('should parse the date correctly from a custom string', function() {
      inject(function($compile, $rootScope) {
        var aDate = new Date(2012, 9, 11);
        var aDateString = 'Thursday, 11 October, 2012';

        var element = $compile('<input ui-date-format="DD, d MM, yy" ng-model="x"/>')($rootScope);
        $rootScope.x = aDateString;
        $rootScope.$digest();

        // Check that the model has not been altered
        expect($rootScope.x).toEqual(aDateString);
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(aDate);
      });
    });
    it('should handle unusual model values', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);

        $rootScope.x = false;
        $rootScope.$digest();
        // Check that the model has not been altered
        expect($rootScope.x).toEqual(false);
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(null);

        $rootScope.x = undefined;
        $rootScope.$digest();
        // Check that the model has not been altered
        expect($rootScope.x).toBeUndefined();
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(null);

        $rootScope.x = null;
        $rootScope.$digest();
        // Check that the model has not been altered
        expect($rootScope.x).toBeNull();
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(null);
      });
    });

    it('should validate null and blank dates as valid', function() {
      inject(function($compile, $rootScope) {

        var element = $compile('<form name="testForm"><input name="optionalDate" ui-date="{dateFormat: \'yy-mm-dd\'}" ng-required="false" ng-model="x"/></form>')($rootScope);
        var ngModel = element.find('input').controller('ngModel');
        ngModel.$setViewValue('');

        expect($rootScope.testForm.$error).toEqual({});
      })
    });

    // it('should validate null and blank dates as valid', function() {
    //   inject(function($compile, $rootScope) {
    //     $rootScope.x = null;
    //     var element = $compile('<form name="testForm"><input name="optionalDate" ui-date="{dateFormat: \'yy-mm-dd\'}" ng-required="false" ng-model="x"/></form>')($rootScope);
    //     expect($rootScope.testForm.$error).toEqual({});
    //
    //     element.find('input').val('09-99-99').triggerHandler('input');
    //     expect($rootScope.testForm.$error).toEqual({});
    //   })
    // });

  });

  describe('$parsing', function() {
    it('should format a selected date correctly to an ISO string', function() {
      inject(function($compile, $rootScope) {
        var aDate = new Date(2012, 8, 17);
        var aDateString = aDate.toISOString();
        var element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);
        $rootScope.$digest();

        element.controller('ngModel').$setViewValue(aDate);
        // Check that the model is updated correctly
        expect($rootScope.x).toEqual(aDateString);
        // Check that the $viewValue has not been altered
        expect(element.controller('ngModel').$viewValue).toEqual(aDate);
      });
    });

    it('should not throw when a user types in an incomplete value', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<input ui-date-format="yy-mm-dd" ng-model="x"/>')($rootScope);
        var ngModel = element.controller('ngModel');
        expect(function incompleteValue() {
          ngModel.$setViewValue('2015-');
        }).not.toThrow();
        expect(ngModel.$modelValue).toBeUndefined();
      });
    });

    it('should convert empty strings to null', inject(function($compile, $rootScope) {
      var element = $compile('<input ui-date-format ng-model="x">')($rootScope);
      element.controller('ngModel').$setViewValue('');
      $rootScope.$digest();
      expect($rootScope.x).toBeNull();

      element = $compile('<input ui-date-format="DD, d MM, yy" ng-model="x">')($rootScope);
      element.controller('ngModel').$setViewValue('');
      $rootScope.$digest();
      expect($rootScope.x).toBeNull();
    }));

    it('should not freak out on invalid values', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);
        $rootScope.$digest();

        element.controller('ngModel').$setViewValue('abcdef');
      });
    });

    it('should format a selected date correctly to a custom string', function() {
      inject(function($compile, $rootScope) {
        var format = 'DD, d MM, yy';
        var aDate = new Date(2012, 9, 11);
        var aDateString = 'Thursday, 11 October, 2012';
        var element = $compile('<input ui-date-format="' + format + '" ng-model="x"/>')($rootScope);
        $rootScope.$digest();

        element.controller('ngModel').$setViewValue(aDate);
        // Check that the model is updated correctly
        expect($rootScope.x).toEqual(aDateString);
        // Check that the $viewValue has not been altered
        expect(element.controller('ngModel').$viewValue).toEqual(aDate);
      });
    });

    it('should parse the date correctly from a UNIX timestamp in milliseconds', function() {
      inject(function($compile, $rootScope) {
        var aDate = new Date(2012, 9, 11);
        var aDateTimestamp = aDate.getTime();

        var element = $compile('<input ui-date-format="@" ng-model="x"/>')($rootScope);
        $rootScope.x = aDateTimestamp;
        $rootScope.$digest();

        // Check that the model has not been altered
        expect($rootScope.x).toEqual(aDateTimestamp);
        // Check that the viewValue has been parsed correctly
        expect(element.controller('ngModel').$viewValue).toEqual(aDate);
      });
    });
  });

  describe('with uiDateConfig', function() {
    var element, scope;

    beforeEach(function() {
      module('ui.date');
    });

    it('use ISO if not config value', function() {
      inject(['$compile', '$rootScope', function($compile, $rootScope) {
        element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);
        scope = $rootScope;
      }]);

      var aDate = new Date(2012, 9, 11);
      var aISODateString = aDate.toISOString();
      scope.x = aISODateString;
      scope.$digest();
      expect(element.controller('ngModel').$viewValue).toEqual(aDate);
    });

    it('use format value if config given', function() {
      var format = 'yy DD, d MM';
      module(function($provide) {
        $provide.constant('uiDateFormatConfig', format);
      });

      inject(['$compile', '$rootScope', function($compile, $rootScope) {
        element = $compile('<input ui-date-format ng-model="x"/>')($rootScope);
        scope = $rootScope;
      }]);

      var aDateString = '2012 Friday, 12 October';
      var expectedDate = new Date('2012-10-12');

      scope.x = aDateString;
      scope.$digest();

      var pickerDate = element.controller('ngModel').$viewValue;
      expect(pickerDate.getDate()).toEqual(expectedDate.getUTCDate());
      expect(pickerDate.getUTCMonth()).toEqual(expectedDate.getUTCMonth());
      expect(pickerDate.getUTCFullYear()).toEqual(expectedDate.getUTCFullYear());
    });
  });

});
