describe('uidate', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="UidateCtrl"] ';

    expect(element(s+'a[editable-uidate]').css('display')).not().toBe('none');
    expect(element(s+'a[editable-uidate]').text()).toMatch('11/03/1985');
    element(s+'a[editable-uidate]').click();

  });
});
