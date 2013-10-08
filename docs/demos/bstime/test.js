describe('bstime', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="BstimeCtrl"] ';
    var a = s+'a[editable-bstime] ';

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('19:20');
    element(a).click();

    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(2);
    expect(element(s+'form input[type="text"]:eq(0)').val()).toBe('19'); 
    expect(element(s+'form input[type="text"]:eq(1)').val()).toBe('20');
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //set 20:30
    element(s+'form table > tbody > tr:eq(0) > td:eq(0) a').click();
    element(s+'form table > tbody > tr:eq(0) > td:eq(2) a').click();
    expect(element(s+'form input[type="text"]:eq(0)').val()).toBe('20');
    expect(element(s+'form input[type="text"]:eq(1)').val()).toBe('30');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('20:30');
    expect(element(s+'form').count()).toBe(0);
  });
});