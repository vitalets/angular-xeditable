describe('bsdate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="BsdateCtrl"] ';

    expect(element(s+'a[editable-bsdate]').css('display')).not().toBe('none');
    expect(element(s+'a[editable-bsdate]').text()).toMatch('15/05/1984');
    element(s+'a[editable-bsdate]').click();
    element(s+'form .input-group-btn button[type="button"]').click();

    expect(element(s+'a[editable-bsdate]').css('display')).toBe('none');
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

    expect(element(s+'a[editable-bsdate]').css('display')).not().toBe('none');
    expect(element(s+'a[editable-bsdate]').text()).toMatch('29/04/1984');
    expect(element(s+'form').count()).toBe(0);
  });
});