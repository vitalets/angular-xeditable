describe('editable-form', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form by `edit` button click and close by `cancel`', function() {
    var s = '[ng-controller="EditableFormCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);

    //show form
    element(s+'form > div > button').click();
    //second click to test that controls not dublicated!
    element(s+'form > div > button').click();
    //also click outside to check blur = ignore
    element('body').click();

    //form shown in disabled state (loading)
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:disabled').count()).toBe(2);
    expect(element(s+'select:disabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);

    sleep(delay);

    //also click outside to check blur = ignore
    element('body').click();    

    //form enabled when data loaded
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);
    expect(element(s+'select:enabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //click cancel
    element(s+'form > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });

  it('should show form and save new values', function() {
    var s = '[ng-controller="EditableFormCtrl"] ';

    //show form
    element(s+'form > div > button').click();

    sleep(delay);

    //set incorrect values (field's onbeforesave error)
    using(s+'form > div:eq(0)').input('$parent.$data').enter('username2');
    element(s+'.buttons > span button[type="submit"]').click();

    //error shown
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'select:enabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);
    expect(element(s+'form > div:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');

    //set incorrect values (form's onaftersave error)
    using(s+'form > div:eq(0)').input('$parent.$data').enter('error');
    element(s+'.buttons > span button[type="submit"]').click();

    //saving
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:disabled').count()).toBe(2);
    expect(element(s+'select:disabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled').count()).toBe(1);
    expect(element(s+'form > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //error shown
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'select:enabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled').count()).toBe(1);
    expect(element(s+'form > div:eq(0) .editable-error').text()).toMatch('Server-side error');

    //set correct values
    using(s+'form > div:eq(0)').input('$parent.$data').enter('awesome');
    using(s+'form > div:eq(1)').select('$parent.$data').option('number:3'); //status4
    using(s+'form > div:eq(2)').select('$parent.$data').option('number:1'); //user

    //click submit
    element(s+'.buttons > span button[type="submit"]').click();
    //second click to check that it works correctly
    element(s+'.buttons > span button[type="submit"]').click();

    //saving
    expect(element(s+'.buttons > span button:disabled').count()).toBe(2);
    expect(element(s+'select:disabled').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled').count()).toBe(1);
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'form > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //form closed, new values shown
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'form > div > span[editable-text]:visible').text()).toMatch('awesome');
    expect(element(s+'form > div > span[editable-select]:visible:eq(0)').text()).toMatch('status3');
    expect(element(s+'form > div > span[editable-select]:visible:eq(1)').text()).toMatch('user');

    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });

});