describe('uidate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="UidateCtrl"] ';

    expect(element(s+'span[editable-uidate]').css('display')).not().toBe('none');
    expect(element(s+'span[editable-uidate]').text()).toMatch('11/04/1985');
    element(s+'span[editable-uidate]').click();

    expect(element(s+'span[editable-uidate]').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input:visible').count()).toBe(1);
    expect(element(s+'form input').val()).toBe('04/11/1985');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);
    expect(element('div#ui-datepicker-div:visible').count()).toBe(1);
    expect(element('a.ui-state-active').text()).toMatch('11');

    //set 29 april
    element('div#ui-datepicker-div > table > tbody > tr:eq(0) > td:eq(1) > a').click();
    expect(element(s+'div#ui-datepicker-div:visible').count()).toBe(0);
    expect(element(s+'form input').val()).toBe('04/01/1985');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span[editable-uidate]').css('display')).not().toBe('none');
    expect(element(s+'span[editable-uidate]').text()).toMatch('01/04/1985');
    expect(element(s+'form').count()).toBe(0);
  });
});
