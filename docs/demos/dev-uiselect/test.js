describe('dev-uiselect', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form by `edit` button click and close by `cancel`', function() {
    var s = '[ng-controller="DevUiSelectCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'div#state:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);

    //show form
    element(s+'form[name=uiSelectForm] > div > button').click();
    //second click to test that controls not duplicated!
    element(s+'form[name=uiSelectForm] > div > button').click();
    //also click outside to check blur = ignore
    element('body').click();

    //form shown in disabled state (loading)
    expect(element(s+'div#state:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);

    sleep(delay);

    //also click outside to check blur = ignore
    element('body').click();

    //form enabled when data loaded
    expect(element(s+'div#state:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(4);

    //click cancel
    element(s+'form[name=uiSelectForm] > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'div#state:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

  it('should show form and save new values', function() {
    var s = '[ng-controller="DevUiSelectCtrl"] ';

    //show form
    element(s+'form[name=uiSelectForm] > div > button').click();

    sleep(delay);

    //select a value for the first dropdown
    element(s+'div[name=state] > div > span').click();
    input('$select.search').enter('Illinois');
    element(s+'#ui-select-choices-row-0-').click();

    //select a value for the second dropdown
    element(s+'div[name=state2] > div > span').click();
    input('$select.search').enter('Arizona');
    element(s+'#ui-select-choices-row-1-').click();

    //click submit
    element(s+'span button[name="submitState"]').click();
    //second click to check that it works correctly
    element(s+'span button[name="submitState"]').click();

    //saving
    expect(element(s+'form[name=uiSelectForm] > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //form closed, new values shown
    expect(element(s+'div#state:visible').count()).toBe(1);
    expect(element(s+'div#state:visible').text()).toMatch('Illinois');
    expect(element(s+'div#state2:visible').count()).toBe(1);
    expect(element(s+'div#state2:visible').text()).toMatch('Arizona');
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });


  it('should show form by `edit` button click and close by `cancel` for tag select', function() {
    var s = '[ng-controller="DevUiSelectCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'div#tag:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);

    //show form
    element(s+'form[name=uiTagsform] > div > button').click();
    //second click to test that controls not duplicated!
    element(s+'form[name=uiTagsform]  > div > button').click();
    //also click outside to check blur = ignore
    element('body').click();

    //form shown in disabled state (loading)
    expect(element(s+'div#tag:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);

    sleep(delay);

    //also click outside to check blur = ignore
    element('body').click();

    //form enabled when data loaded
    expect(element(s+'div#tag:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(4);

    //click cancel
    element(s+'form[name=uiTagsform]  > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'div#tag:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

  it('should show form and save new values for tag select', function() {
    var s = '[ng-controller="DevUiSelectCtrl"] ';

    //show form
    element(s+'form[name=uiSelectForm] > div > button').click();
    element(s+'form[name=uiTagsform] > div > button').click();

    sleep(delay);

    //select a value for the first dropdown
    element(s+'div[name=state] > div > span').click();
    input('$select.search').enter('Illinois');
    element(s+'#ui-select-choices-row-0-').click();

    //select a value for the second dropdown
    element(s+'div[name=state2] > div > span').click();
    input('$select.search').enter('Arizona');
    element(s+'#ui-select-choices-row-1-').click();

    //select a value for the tag dropdown
    element(s+'div[name=tag] > div > span').click();
    input('$select.search').enter('Angular');
    element(s+'#ui-select-choices-row-2-').click();

    //click submit for state form
    element(s+'span button[name="submitState"]').click();
    //second click to check that it works correctly
    element(s+'span button[name="submitState"]').click();


    //click submit for tag form
    element(s+'span button[name="submitTag"]').click();
    //second click to check that it works correctly
    element(s+'span button[name="submitTag"]').click();

    //saving
    expect(element(s+'form[name=uiTagsform] > div:eq(0) .editable-error:visible').count()).toBe(0);
    expect(element(s+'form[name=uiSelectForm] > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //form closed, new values shown
    expect(element(s+'div#state:visible').count()).toBe(1);
    expect(element(s+'div#state:visible').text()).toMatch('Illinois');
    expect(element(s+'div#state2:visible').count()).toBe(1);
    expect(element(s+'div#state2:visible').text()).toMatch('Arizona');
    expect(element(s+'div#tag:visible').count()).toBe(1);
    expect(element(s+'div#tag:visible').text()).toMatch('Angular');
    expect(element(s+'.buttons > button:visible').count()).toBe(2);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });
});