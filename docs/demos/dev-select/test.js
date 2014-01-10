describe('dev-select-multiple', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show options defined without value', function() {
    var s = '[ng-controller="DevSelectCtrl"] ';

    expect(element(s+'a').text()).toMatch('status2');
    expect(element(s+'a').text()).toMatch('status4');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible:enabled').count()).toBe(1);
    expect(element(s+'form select option').count()).toBe(4);
    expect(element(s+'form select option:selected').count()).toBe(2);
    expect(element(s+'form select').val()).toMatch('["1","3"]');

    using(s).select('$data').options('1', '2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('status2');
    expect(element(s+'a').text()).toMatch('status3');
    expect(element(s+'a').text()).not().toMatch('status4');
    expect(element(s+'form').count()).toBe(0);
  });

});