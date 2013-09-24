describe('checkbox', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="CheckboxCtrl"] ';

    expect(element(s+'a').text()).toMatch('Remember me');
    element(s+'a').click();

    expect(element(s+'a:visible').count()).toBe(0);
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="checkbox"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="checkbox"]').val()).toBe('on');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$data').check();
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a:visible').count()).toBe(1);
    expect(element(s+'a').text()).toMatch("Don't remember");
    expect(element(s+'form').count()).toBe(0);
  });

});