describe('checklist', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show checkboxes and submit new value', function() {
    var s = '[ng-controller="ChecklistCtrl"] ';

    expect(element(s+'a').text()).toMatch('status2, status3');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="checkbox"]:visible:enabled').count()).toBe(3);
    expect(element(s+'form input[type="checkbox"]:checked').count()).toBe(2);

    // check status1
    using(s+'label:eq(0)').input('checked').check();
    // uncheck status3
    using(s+'label:eq(2)').input('checked').check();
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('status1, status2');
    expect(element(s+'form').count()).toBe(0);
  });

});