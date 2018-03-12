describe('dev-combodate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor including seconds and submit new value', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'a#seconds').css('display')).not().toBe('none');
    expect(element(s+'a#seconds').text()).toMatch('May 15, 1984 12:00:00 AM');
    element(s+'a#seconds').click();

    expect(element(s+'a#seconds').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(6);
    expect(element(s+'form select.day').val()).toBe('15');
    expect(element(s+'form select.month').val()).toBe('4');
    expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form select.hour').val()).toBe('0');
    expect(element(s+'form select.minute').val()).toBe('0');
    expect(element(s+'form select.second').val()).toBe('0');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set 29 april
    element(s+'form select.day option[value=29]').click();
    element(s+'form select.month option[value=3]').click(); // month option numbers appear to be offset by 1
    element(s+'form select.minute option[value=4]').click();
    element(s+'form select.second option[value=5]').click();

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#seconds').css('display')).not().toBe('none');
    expect(element(s+'a#seconds').text()).toMatch('Apr 29, 1984 12:04:05 AM');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor and submit new value when initial date does not match available values in drop downs', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'a#minuteStep').css('display')).not().toBe('none');
    expect(element(s+'a#minuteStep').text()).toMatch('May 15, 1984 10:11:00 AM');
    element(s+'a#minuteStep').click();

    expect(element(s+'a#minuteStep').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(5);
    expect(element(s+'form select.day').val()).toBe('15');
    expect(element(s+'form select.month').val()).toBe('4');
    expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form select.hour').val()).toBe('10');
    expect(element(s+'form select.minute').val()).toBe('10');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#minuteStep').css('display')).not().toBe('none');
    expect(element(s+'a#minuteStep').text()).toMatch('May 15, 1984 10:10:00 AM');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor for only year and submit new value', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'span#yearOnly').css('display')).not().toBe('none');
    expect(element(s+'span#yearOnly').text()).toMatch('1984');
    element(s+'span#yearOnly').click();

    expect(element(s+'span#yearOnly').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(1);
    expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set 2017
    element(s+'form select.year option[value=2017]').click();

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span#yearOnly').css('display')).not().toBe('none');
    expect(element(s+'span#yearOnly').text()).toMatch('2017');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor for year and month only and submit new value', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'span#yearMonthOnly').css('display')).not().toBe('none');
    expect(element(s+'span#yearMonthOnly').text()).toMatch('1984, May');
    element(s+'span#yearMonthOnly').click();

    expect(element(s+'span#yearMonthOnly').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(2);
    expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form select.month').val()).toBe('4');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set December 2017
    element(s+'form select.month option[value=11]').click();
    element(s+'form select.year option[value=2017]').click();

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span#yearMonthOnly').css('display')).not().toBe('none');
    expect(element(s+'span#yearMonthOnly').text()).toMatch('2017, December');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor for month only and submit new value', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'span#monthOnly').css('display')).not().toBe('none');
    expect(element(s+'span#monthOnly').text()).toMatch('May');
    element(s+'span#monthOnly').click();

    expect(element(s+'span#monthOnly').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(1);
    expect(element(s+'form select.month').val()).toBe('4');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set December 2017
    element(s+'form select.month option[value=11]').click();

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span#monthOnly').css('display')).not().toBe('none');
    expect(element(s+'span#monthOnly').text()).toMatch('December');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show editor for day/month/year and submit new value', function() {
    var s = '[ng-controller="DevCombodateCtrl"] ';

    expect(element(s+'span#dayMonthYear').css('display')).not().toBe('none');
    expect(element(s+'span#dayMonthYear').text()).toMatch('15/05/1984');
    element(s+'span#dayMonthYear').click();

    expect(element(s+'span#dayMonthYear').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(3);
      expect(element(s+'form select.day').val()).toBe('15');
      expect(element(s+'form select.month').val()).toBe('4');
      expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set December 25 2017
    element(s+'form select.year option[value=2017]').click();
    element(s+'form select.day option[value=25]').click();
    element(s+'form select.month option[value=11]').click(); // month option numbers appear to be offset by 1

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span#dayMonthYear').css('display')).not().toBe('none');
    expect(element(s+'span#dayMonthYear').text()).toMatch('25/12/2017');
    expect(element(s+'form').count()).toBe(0);
  });
});