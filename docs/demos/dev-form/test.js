describe('dev-form', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should keep disabled fields after waiting', function() {
    var s = '[ng-controller="DevFormCtrl"] ';

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

});