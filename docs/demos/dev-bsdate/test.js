describe('dev-bsdate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#minMax').css('display')).not().toBe('none');
    expect(element(s+'a#minMax').text()).toMatch('15/05/1984');
    element(s+'a#minMax').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a#minMax').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').css('color')).toBe('rgb(255, 255, 255)');
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-info span').text()).toMatch('15');

    //set 01 May
    element(s+'form table > tbody > tr:eq(0) > td:eq(3) > button').click();
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(0);
    expect(element(s+'form input[type="text"]').val()).toBe('01-May-1984');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#minMax').css('display')).not().toBe('none');
    expect(element(s+'a#minMax').text()).toMatch('01/05/1984');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor and not submit new value when new value is outside of date range', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#minMax').css('display')).not().toBe('none');
    expect(element(s+'a#minMax').text()).toMatch('15/05/1984');
    element(s+'a#minMax').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a#minMax').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-info span').text()).toMatch('15');

    //set 29 april
    element(s+'form table > tbody > tr:eq(0) > td:eq(1) > button').click();
    expect(element(s+'form table > tbody > tr:eq(0) > td:eq(1) > button').attr('disabled')).toBe("disabled");
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-1984');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#minMax').css('display')).not().toBe('none');
    expect(element(s+'a#minMax').text()).toMatch('');
    expect(element(s+'form').count()).toBe(0);

    //Click on page to close popup to have the isOpened flag properly set for the next text
    element(s).click();
  });

  it('should show editor with selected date set to the current date', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#initDate').css('display')).not().toBe('none');
    expect(element(s+'a#initDate').text()).toMatch('empty');
    element(s+'a#initDate').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a#initDate').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-sm span').text()).toMatch(new Date().getDate());
  });


  it('should show editor and submit new value and input field is read only', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#readOnly').css('display')).not().toBe('none');
    expect(element(s+'a#readOnly').text()).toMatch('15/05/2006');
    element(s+'a#readOnly').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a#readOnly').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').attr('readonly')).toBe("readonly");
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-2006');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-info span').text()).toMatch('15');

    //set 01 May
    element(s+'form table > tbody > tr:eq(0) > td:eq(3) > button').click();
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(0);
    expect(element(s+'form input[type="text"]').val()).toBe('02-May-2006');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#readOnly').css('display')).not().toBe('none');
    expect(element(s+'a#readOnly').text()).toMatch('02/05/2006');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor and submit new value and on change event is called', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#onChangeDate').css('display')).not().toBe('none');
    expect(element(s+'a#onChangeDate').text()).toMatch('15/05/1984');
    element(s+'a#onChangeDate').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a#onChangeDate').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-info span').text()).toMatch('15');

    //set 29 april
    element(s+'form table > tbody > tr:eq(0) > td:eq(1) > button').click();
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(0);
    expect(element(s+'form input[type="text"]').val()).toBe('29-April-1984');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#onChangeDate').css('display')).not().toBe('none');
    expect(element(s+'a#onChangeDate').text()).toMatch('29/04/1984');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show input without calendar button and open calendar popup on click of input field', function() {
    var s = '[ng-controller="DevBsdateCtrl"] ';

    expect(element(s+'a#hideCalendarButton').css('display')).not().toBe('none');
    expect(element(s+'a#hideCalendarButton').text()).toMatch('15/05/1984');
    element(s+'a#hideCalendarButton').click();
    expect(element(s+'form .input-group-btn button[type="button"]').count()).toBe(0);
    element(s+'form input[type="text"]').click();

    expect(element(s+'a#hideCalendarButton').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('15-May-1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form table button.btn-info span').text()).toMatch('15');

    //set 29 april
    element(s+'form table > tbody > tr:eq(0) > td:eq(1) > button').click();
    expect(element(s+'ul.dropdown-menu:visible').count()).toBe(0);
    expect(element(s+'form input[type="text"]').val()).toBe('29-April-1984');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#hideCalendarButton').css('display')).not().toBe('none');
    expect(element(s+'a#hideCalendarButton').text()).toMatch('29/04/1984');
    expect(element(s+'form').count()).toBe(0);
  });
});