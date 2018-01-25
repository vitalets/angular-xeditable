/*
 Angular-ui bootstrap datepicker
 http://angular-ui.github.io/bootstrap/#/datepicker
 */
angular.module('xeditable').directive('editableBsdate', ['editableDirectiveFactory', '$injector', '$parse',
    function(editableDirectiveFactory, $injector, $parse) {

        // Constants from Angular-ui bootstrap datepicker
        var uibDatepickerConfig = $injector.get('uibDatepickerConfig');
        var uibDatepickerPopupConfig = $injector.get('uibDatepickerPopupConfig');

        var popupAttrNames = [
            ['eIsOpen', 'is-open'],
            ['eDateDisabled', 'date-disabled'],
            ['eDatepickerPopup', 'uib-datepicker-popup'],
            ['eShowButtonBar', 'show-button-bar'],
            ['eCurrentText', 'current-text'],
            ['eClearText', 'clear-text'],
            ['eCloseText', 'close-text'],
            ['eCloseOnDateSelection', 'close-on-date-selection'],
            ['eDatepickerAppendToBody', 'datepicker-append-to-body'],
            ['eOnOpenFocus', 'on-open-focus'],
            ['eName', 'name'],
            ['eDateDisabled', 'date-disabled'],
            ['eAltInputFormats', 'alt-input-formats']
        ];

        var dateOptionsNames = [
            ['eFormatDay', 'formatDay'],
            ['eFormatMonth', 'formatMonth'],
            ['eFormatYear', 'formatYear'],
            ['eFormatDayHeader', 'formatDayHeader'],
            ['eFormatDayTitle', 'formatDayTitle'],
            ['eFormatMonthTitle', 'formatMonthTitle'],
            ['eMaxMode', 'maxMode'],
            ['eMinMode', 'minMode'],
            ['eDatepickerMode', 'datepickerMode']
        ];

        return editableDirectiveFactory({
            directiveName: 'editableBsdate',
            inputTpl: '<div></div>',
            render: function() {
                /** This basically renders a datepicker as in the example shown in
                 **  http://angular-ui.github.io/bootstrap/#/datepicker
                 **  The attributes are all the same as in the bootstrap-ui datepicker with e- as prefix
                 **/
                this.parent.render.call(this);

                var attrs = this.attrs;
                var scope = this.scope;

                var inputDatePicker = angular.element('<input type="text" class="form-control" ng-model="$parent.$data"/>');

                inputDatePicker.attr('uib-datepicker-popup', attrs.eDatepickerPopupXEditable || uibDatepickerPopupConfig.datepickerPopup );
                inputDatePicker.attr('year-range', attrs.eYearRange || 20);
                inputDatePicker.attr('ng-readonly', attrs.eReadonly || false);

                for (var i = popupAttrNames.length - 1; i >= 0; i--) {
                    var popupAttr = attrs[popupAttrNames[i][0]];
                    if (typeof popupAttr !== 'undefined') {
                        inputDatePicker.attr(popupAttrNames[i][1], popupAttr);
                    }
                }

                if (attrs.eNgChange) {
                    inputDatePicker.attr('ng-change', attrs.eNgChange);
                    this.inputEl.removeAttr('ng-change');
                }

                if (attrs.eStyle) {
                    inputDatePicker.attr('style', attrs.eStyle);
                    this.inputEl.removeAttr('style');
                }

                var dateOptions = {
                    maxDate: scope.$eval(attrs.eMaxDate) || uibDatepickerConfig.maxDate,
                    minDate: scope.$eval(attrs.eMinDate) || uibDatepickerConfig.minDate,
                    showWeeks: attrs.eShowWeeks ? attrs.eShowWeeks.toLowerCase() === 'true' : uibDatepickerConfig.showWeeks,
                    startingDay: attrs.eStartingDay || 0,
                    initDate: scope.$eval(attrs.eInitDate) || new Date()
                };

                if (attrs.eDatepickerOptions) {
                    var eDatepickerOptions = $parse(attrs.eDatepickerOptions)(scope);
                    angular.extend(dateOptions, eDatepickerOptions);
                }

                for (var z = dateOptionsNames.length - 1; z >= 0; z--) {
                    var doAttr = attrs[dateOptionsNames[z][0]];
                    if (typeof doAttr !== 'undefined') {
                        dateOptions[dateOptionsNames[z][1]] = doAttr;
                    }
                }

                scope.dateOptions = dateOptions;

                var showCalendarButton = angular.isDefined(attrs.eShowCalendarButton) ? attrs.eShowCalendarButton : "true";

                //See if calendar button should be displayed
                if (showCalendarButton === "true") {
                    var buttonDatePicker = angular.element('<button type="button" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>');
                    var buttonWrapper = angular.element('<span class="input-group-btn"></span>');

                    buttonDatePicker.attr('ng-click', attrs.eNgClick);

                    buttonWrapper.append(buttonDatePicker);

                    this.inputEl.append(buttonWrapper);
                } else {
                    //If no calendar button, display calendar popup on click of input field
                    inputDatePicker.attr('ng-click', attrs.eNgClick);
                }

                inputDatePicker.attr('datepicker-options', "dateOptions");

                this.inputEl.prepend(inputDatePicker);

                this.inputEl.removeAttr('class');
                this.inputEl.removeAttr('ng-click');
                this.inputEl.removeAttr('is-open');
                this.inputEl.removeAttr('init-date');
                this.inputEl.removeAttr('datepicker-popup');
                this.inputEl.removeAttr('required');
                this.inputEl.removeAttr('ng-model');
                this.inputEl.removeAttr('date-picker-append-to-body');
                this.inputEl.removeAttr('name');
                this.inputEl.attr('class','input-group');
            },
            autosubmit: function() {
                var self = this;
                self.inputEl.bind('change', function() {
                    setTimeout(function() {
                        self.scope.$apply(function() {
                            self.scope.$form.$submit();
                        });
                    }, 500);
                });
                
                self.inputEl.bind('keydown', function(e) {
                    //submit on tab
                    if (e.keyCode === 9 && self.editorEl.attr('blur') === 'submit') {
                        self.scope.$apply(function() {
                            self.scope.$form.$submit();
                        });
                    }
                });
            }
    });
}]);
