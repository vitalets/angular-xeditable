describe('dev-form', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should keep disabled fields after waiting', function() {
    var s = '[ng-controller="DevFormCtrl"] .check-disabled ';

    //show form
    element(s+'form > div > button').click();

    //form shown in disabled state (loading)
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:disabled').count()).toBe(2);
    expect(element(s+'select:disabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);

    sleep(delay);

    //form enabled, but two controls in disabled state
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);
    expect(element(s+'select:enabled:visible').count()).toBe(1);
    expect(element(s+'select:disabled:visible').count()).toBe(1);
    expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);

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

  it('should cancel form if blur = cancel', function() {
    var s = '[ng-controller="DevFormCtrl"] .check-blur-cancel ';

    expect(element(s+'form > div > span[editable-text]').text()).toMatch('awesome user');

    //show form
    element(s+'form > div > button').click();

    sleep(delay);

    //form enabled
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //set some value
    using(s+'form > div:eq(0)').input('$data').enter('username2');

    //click input --> no action, form shown
    element(s+'input[type="text"]').click();
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //click body --> cancel
    element('body').click();

    //form closed
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-text]').text()).toMatch('awesome user');
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });

  it('should submit form if blur = submit', function() {
    var s = '[ng-controller="DevFormCtrl"] .check-blur-submit ';

    expect(element(s+'form > div > span[editable-text]').text()).toMatch('awesome user');

    //show form
    element(s+'form > div > button').click();

    sleep(delay);

    //form enabled, but two controls in disabled state
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //set some value
    using(s+'form > div:eq(0)').input('$data').enter('username2');

    //click input --> no action, form shown
    element(s+'input[type="text"]').click();
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //click body --> submit
    element('body').click();

    //form closed
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-text]').text()).toMatch('username2');
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });  

});