describe('edit-disabled', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should not show editor', function() {
    var s = '[ng-controller="EditDisabledCtrl"] ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('username2');
    expect(element(s+'form').count()).toBe(0);
  });
});