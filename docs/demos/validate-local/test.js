describe('validate-local', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show error', function() {
    var s = '[ng-controller="ValidateLocalCtrl"] ';

    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    //not valid
    using(s).input('$data').enter('username');
    element(s+'form button[type="submit"]').click();

    //form remains open
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Username should be `awesome`');

    //valid
    using(s).input('$data').enter('awesome');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

});