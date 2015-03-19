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

				inputDatePicker.attr('datepicker-popup', this.attrs.eDatepickerPopupXEditable || 'yyyy/MM/dd' );
				inputDatePicker.attr('is-open', this.attrs.eIsOpen);
				inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);
				inputDatePicker.attr('datepicker-popup', this.attrs.eDatepickerPopup);
				inputDatePicker.attr('datepicker-mode', this.attrs.eDatepickerMode || 'day');
				inputDatePicker.attr('min-date', this.attrs.eMinDate);
				inputDatePicker.attr('max-date', this.attrs.eMaxDate);
				inputDatePicker.attr('show-weeks', this.attrs.eShowWeeks || true);
				inputDatePicker.attr('starting-day', this.attrs.eStartingDay || 0);
				inputDatePicker.attr('init-date', this.attrs.eInitDate || new Date());
				inputDatePicker.attr('min-mode', this.attrs.eMinMode || 'day');
				inputDatePicker.attr('max-mode', this.attrs.eMaxMode || 'year');
				inputDatePicker.attr('format-day', this.attrs.eFormatDay || 'dd');
				inputDatePicker.attr('format-month', this.attrs.eFormatMonth || 'MMMM');
				inputDatePicker.attr('format-year', this.attrs.eFormatYear || 'yyyy');
				inputDatePicker.attr('format-day-header', this.attrs.eFormatDayHeader || 'EEE');
				inputDatePicker.attr('format-day-title', this.attrs.eFormatDayTitle || 'MMMM yyyy');
				inputDatePicker.attr('format-month-title', this.attrs.eFormatMonthTitle || 'yyyy');
				inputDatePicker.attr('year-range', this.attrs.eYearRange || 20);
				inputDatePicker.attr('show-button-bar', this.attrs.eShowButtonBar || true);
				inputDatePicker.attr('current-text', this.attrs.eCurrentText || 'Today');
				inputDatePicker.attr('clear-text', this.attrs.eClearText || 'Clear');
				inputDatePicker.attr('close-text', this.attrs.eCloseText || 'Done');
				inputDatePicker.attr('close-on-date-selection', this.attrs.eCloseOnDateSelection || true);
				inputDatePicker.attr('date-picker-append-to-body', this.attrs.eDatePickerAppendToBody || false);
				inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);

				buttonDatePicker.attr('ng-click',this.attrs.eNgClick);

				buttonWrapper.append(buttonDatePicker);
				this.inputEl.prepend(inputDatePicker);
				this.inputEl.append(buttonWrapper);

				this.inputEl.removeAttr('class');
				this.inputEl.attr('class','input-group');

			}
    });
}]);