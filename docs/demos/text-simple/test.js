describe('text-simple', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html?test');
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="TextSimpleCtrl"] ';

    expect(element(s+'a').text()).toMatch('AWESOME USER');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('USERNAME2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should not save by cancel button', function() {
    var s = '[ng-controller="TextSimpleCtrl"] ';
    element(s+'a').click();

    using(s).input('$data').enter('username2');
    element(s+'form button[type="button"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('AWESOME USER');
    expect(element(s+'form').count()).toBe(0);
  });

});