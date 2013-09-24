describe('select-local', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show options and submit new value', function() {
    var s = '[ng-controller="SelectLocalCtrl"] ';

    expect(element(s+'a').text()).toMatch('status2');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible:enabled').count()).toBe(1);
    expect(element(s+'form select option').count()).toBe(4);
    //select uses own values in options!!
    expect(element(s+'form select').val()).toBe('1');

    using(s).select('$data').option('2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('status3');
    expect(element(s+'form').count()).toBe(0);
  });

});