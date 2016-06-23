describe('select-remote', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should load remote options and submit new value', function() {
    var s = '[ng-controller="SelectRemoteCtrl"] ';

    expect(element(s+'a').text()).toMatch('admin');
    element(s+'a').click();

    //loading
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form select:disabled:visible').count()).toBe(1);
    expect(element(s+'button:disabled:visible').count()).toBe(2);
    sleep(delay);
    //loaded
    expect(element(s+'form select:enabled:visible').count()).toBe(1);
    expect(element(s+'button:enabled:visible').count()).toBe(2);
    expect(element(s+'form select:visible').count()).toBe(1);
    expect(element(s+'button:visible').count()).toBe(2);
    expect(element(s+'form select').val()).toBe('number:4');

    using(s).select('$parent.$data').option('number:3');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('vip');
    expect(element(s+'form').count()).toBe(0);
  });

});