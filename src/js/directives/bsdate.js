/*
 Angular-ui bootstrap datepicker
 http://angular-ui.github.io/bootstrap/#/datepicker
 */
angular.module('xeditable').directive('editableBsdate', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableBsdate',
            inputTpl: '<div></div>',
            render: function() {
                /** This basically renders a datepicker as in the example shown in
                 **  http://angular-ui.github.io/bootstrap/#/datepicker
                 **  The attributes are all the same as in the bootstrap-ui datepicker with e- as prefix
                 **/
                this.parent.render.call(this);

                var inputDatePicker = angular.element('<input type="text" class="form-control" ng-model="$data"/>');
                var buttonDatePicker = angular.element('<button type="button" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>');
                var buttonWrapper = angular.element('<span class="input-group-btn"></span>');

                inputDatePicker.attr('uib-datepicker-popup', this.attrs.eDatepickerPopupXEditable || 'yyyy/MM/dd' );
                inputDatePicker.attr('is-open', this.attrs.eIsOpen);
                inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);
                inputDatePicker.attr('uib-datepicker-popup', this.attrs.eDatepickerPopup);
                inputDatePicker.attr('min-date', this.attrs.eMinDate);
                inputDatePicker.attr('max-date', this.attrs.eMaxDate);
                inputDatePicker.attr('year-range', this.attrs.eYearRange || 20);
                inputDatePicker.attr('show-button-bar', this.attrs.eShowButtonBar || true);
                inputDatePicker.attr('current-text', this.attrs.eCurrentText || 'Today');
                inputDatePicker.attr('clear-text', this.attrs.eClearText || 'Clear');
                inputDatePicker.attr('close-text', this.attrs.eCloseText || 'Done');
                inputDatePicker.attr('close-on-date-selection', this.attrs.eCloseOnDateSelection || true);
                inputDatePicker.attr('datepicker-append-to-body', this.attrs.eDatePickerAppendToBody || false);
                inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);
                inputDatePicker.attr('name', this.attrs.eName);

                this.scope.dateOptions = {
                    formatDay:  this.attrs.eFormatDay || 'dd',
                    formatMonth: this.attrs.eFormatMonth || 'MMMM',
                    formatYear: this.attrs.eFormatYear || 'yyyy',
                    formatDayHeader: this.attrs.eFormatDayHeader || 'EEE',
                    formatDayTitle: this.attrs.eFormatDayTitle || 'MMMM yyyy',
                    formatMonthTitle: this.attrs.eFormatMonthTitle || 'yyyy',
                    showWeeks: this.attrs.eShowWeeks ? this.attrs.eShowWeeks.toLowerCase() === 'true' : true,
                    startingDay: this.attrs.eStartingDay || 0,
                    minMode: this.attrs.eMinMode || 'day',
                    maxMode: this.attrs.eMaxMode || 'year',
                    initDate: this.attrs.eInitDate || new Date(),
                    datepickerMode: this.attrs.eDatepickerMode || 'day'
                };

                inputDatePicker.attr('datepicker-options', "dateOptions");

                buttonDatePicker.attr('ng-click',this.attrs.eNgClick);

                buttonWrapper.append(buttonDatePicker);
                this.inputEl.prepend(inputDatePicker);
                this.inputEl.append(buttonWrapper);

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
            }
	});
}]);