describe('uiselect', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form by `edit` button click and close by `cancel`', function() {
    var s = '[ng-controller="UiSelectCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);

    //show form
    element(s+'form > div > button').click();
    //second click to test that controls not duplicated!
    element(s+'form > div > button').click();
    //also click outside to check blur = ignore
    element('body').click();

    //form shown in disabled state (loading)
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);

    sleep(delay);

    //also click outside to check blur = ignore
    element('body').click();

    //form enabled when data loaded
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);

    //click cancel
    element(s+'form > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

  it('should show form and save new values', function() {
    var s = '[ng-controller="UiSelectCtrl"] ';

    //show form
    element(s+'form > div > button').click();

    sleep(delay);

    //select a value
    element(s+'.ui-select-toggle').click();
    input('$select.search').enter('Illinois');
    element(s+'#ui-select-choices-row-0-').click();

    //click submit
    element(s+'span button[type="submit"]').click();
    //second click to check that it works correctly
    element(s+'span button[type="submit"]').click();

    //saving
    expect(element(s+'form > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //form closed, new values shown
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(1);
    expect(element(s+'form > div[editable-ui-select]:visible').text()).toMatch('Illinois');
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

});