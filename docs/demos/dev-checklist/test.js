describe('dev-checklist', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show checkboxes and submit new value with no buttons and blur = submit', function() {
    var s = '[ng-controller="DevChecklistCtrl"] ';

    expect(element(s+'a.nobuttons ').text()).toMatch('status2, status3');
    element(s+'a.nobuttons ').click();

    expect(element(s+'a.nobuttons ').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="checkbox"]:visible:enabled').count()).toBe(3);
    expect(element(s+'form input[type="checkbox"]:checked').count()).toBe(2);

    // check status1
    using(s+'label:eq(0)').input('checked').check();
    // uncheck status3
    using(s+'label:eq(2)').input('checked').check();
    element(s).click();

    expect(element(s+'a.nobuttons ').css('display')).not().toBe('none');
    expect(element(s+'a.nobuttons ').text()).toMatch('status1, status2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show checkboxes and submit new value with no buttons and blur = submit and call on-change event', function() {
    var s = '[ng-controller="DevChecklistCtrl"] ';

    expect(element(s+'a.onchange ').text()).toMatch('status2, status3');
    element(s+'a.onchange ').click();

    expect(element(s+'a.onchange ').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="checkbox"]:visible:enabled').count()).toBe(3);
    expect(element(s+'form input[type="checkbox"]:checked').count()).toBe(2);
    expect(element(s+'form input[type="checkbox"]').attr('ng-change')).toBeDefined();
    expect(element(s+'form input[type="checkbox"]').attr('checklist-comparator')).toBeDefined();

    // check status1
    using(s+'label:eq(0)').input('checked').check();
    // uncheck status3
    using(s+'label:eq(2)').input('checked').check();
    element(s).click();

    expect(element(s+'a.onchange ').css('display')).not().toBe('none');
    expect(element(s+'a.onchange ').text()).toMatch('status2, status1');
    expect(element(s+'form').count()).toBe(0);
  });
  
});