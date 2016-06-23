describe('dev-select-multiple', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show options defined without value', function() {
    var s = '[ng-controller="DevSelectCtrl"] ';

    expect(element(s+'a#multiSelect').text()).toMatch('status2');
    expect(element(s+'a#multiSelect').text()).toMatch('status4');
    element(s+'a#multiSelect').click();

    expect(element(s+'a#multiSelect').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible:enabled').count()).toBe(1);
    expect(element(s+'form select option').count()).toBe(4);
    expect(element(s+'form select option:selected').count()).toBe(2);
    expect(element(s+'form select').val()).toMatch('["1","3"]');

    using(s).select('$parent.$data').option('status2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#multiSelect').css('display')).not().toBe('none');
    expect(element(s+'a#multiSelect').text()).toMatch('status2');
    expect(element(s+'a#multiSelect').text()).not().toMatch('status4');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show options with default value selected', function() {
    var s = '[ng-controller="DevSelectCtrl"] ';

    expect(element(s+'a#defaultValue').text()).toMatch('Not set');
    element(s+'a#defaultValue').click();

    expect(element(s+'a#defaultValue').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form select:visible:enabled').count()).toBe(1);
    expect(element(s+'form select option').count()).toBe(5);
    expect(element(s+'form select option:selected').count()).toBe(1);
    expect(element(s+'form select').val()).toMatch('');

    using(s).select('$parent.$data').option('status2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a#defaultValue').css('display')).not().toBe('none');
    expect(element(s+'a#defaultValue').text()).toMatch('status2');
    expect(element(s+'form').count()).toBe(0);
  });
});