describe('select-nobuttons', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form without buttons and submit automatically', function() {
    var s = '[ng-controller="SelectNobuttonsCtrl"] ';

    expect(element(s+'a').text()).toMatch('status2');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible:enabled').count()).toBe(1);
    expect(element(s+'form select option').count()).toBe(4);
    expect(element(s+'form button:visible').count()).toBe(0);
    expect(element(s+'form select').val()).toBe('number:2');

    //set new value
    using(s).select('$parent.$data').option('number:3');

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('status3');
    expect(element(s+'form').count()).toBe(0);
  });

});