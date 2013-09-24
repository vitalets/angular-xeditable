describe('validate-remote', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show error', function() {
    var s = '[ng-controller="ValidateRemoteCtrl"] ';

    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    //not valid
    using(s).input('$data').enter('username');
    element(s+'form button[type="submit"]').click();

    //checking
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:disabled:visible').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(delay);

    //error shown
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);
    expect(element(s+'button:visible:enabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Username should be `awesome`');

    //valid
    using(s).input('$data').enter('awesome');
    element(s+'form button[type="submit"]').click();

    //checking
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(delay);

    //no error shown, form closed
    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

});