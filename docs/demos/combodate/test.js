describe('combodate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="CombodateCtrl"] ';

    expect(element(s+'a[editable-combodate]').css('display')).not().toBe('none');
    expect(element(s+'a[editable-combodate]').text()).toMatch('May 15, 1984 12:00:00 AM');
    element(s+'a[editable-combodate]').click();

    expect(element(s+'a[editable-combodate]').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible').count()).toBe(5);
    expect(element(s+'form select.day').val()).toBe('15');
    expect(element(s+'form select.month').val()).toBe('4');
    expect(element(s+'form select.year').val()).toBe('1984');
    expect(element(s+'form select.hour').val()).toBe('0');
    expect(element(s+'form select.minute').val()).toBe('0');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set 29 april
    element(s+'form select.day option[value=29]').click();
    element(s+'form select.month option[value=3]').click(); // month option numbers appear to be offset by 1

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a[editable-combodate]').css('display')).not().toBe('none');
    expect(element(s+'a[editable-combodate]').text()).toMatch('Apr 29, 1984 12:00:00 AM');
    expect(element(s+'form').count()).toBe(0);
  });
});