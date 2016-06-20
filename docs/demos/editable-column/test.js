describe('editable-column', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show USERNAME form by `edit` button and save new values', function() {
    var s = '[ng-controller="EditableColumnCtrl"] table ';

    //edit button initially shown, form initially hidden
    function checkClosed() {
      expect(element(s+'tr:eq(2) td:eq(0) span[editable-text]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(2) td:eq(1) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(2) td:eq(2) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(0) td > button:visible').count()).toBe(3);
      expect(element(s+'tr:eq(0) td form button:visible').count()).toBe(0);
      expect(element(s+'select').count()).toBe(0);
      expect(element(s+'input[type="text"]').count()).toBe(0);
    }

    //form shown in disabled state (loading)
    function checkWaiting() {
      expect(element(s+'tr:eq(2) td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'tr:eq(2) td:eq(1) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(2) td:eq(2) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(0) td > button:visible:enabled').count()).toBe(2);
      expect(element(s+'tr:eq(0) td form button:visible:disabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(3);
    }

    //form enabled when data loaded
    function checkShown() {
      expect(element(s+'tr:eq(2) td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'tr:eq(2) td:eq(1) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(2) td:eq(2) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'tr:eq(0) td > button:visible:enabled').count()).toBe(2);
      expect(element(s+'tr:eq(0) td form button:visible:enabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(3);
    }

    checkClosed();

    //check initial values
    expect(element(s+'tr:eq(1) td:eq(0) span[editable-text]').text()).toMatch('user1');
    expect(element(s+'tr:eq(2) td:eq(0) span[editable-text]').text()).toMatch('user2');
    expect(element(s+'tr:eq(3) td:eq(0) span[editable-text]').text()).toMatch('user3');
    expect(element(s+'tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status2');
    expect(element(s+'tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('admin');

    //show form
    element(s+'tr:eq(0) td:eq(0) > button:visible').click();
    checkShown();

    //set incorrect values
    element(s+'tr:eq(0) td:eq(0) form button[type="submit"]').click();

    checkShown();

    //error shown
    expect(element(s+'tr:eq(1) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'tr:eq(1) td:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');
    expect(element(s+'tr:eq(2) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'tr:eq(2) td:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');
    expect(element(s+'tr:eq(3) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'tr:eq(3) td:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');

    //set correct values
    using(s+'tr:eq(1) td:eq(0)').input('$parent.$data').enter('awesome');
    using(s+'tr:eq(2) td:eq(0)').input('$parent.$data').enter('awesome');
    using(s+'tr:eq(3) td:eq(0)').input('$parent.$data').enter('awesome');

    element(s+'tr:eq(0) td:eq(0) form button[type="submit"]').click();

    checkWaiting();
    //error hidden
    expect(element(s+'td:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    checkClosed();

    //check updated values
    expect(element(s+'tr:eq(1) td:eq(0) span[editable-text]').text()).toMatch('awesome');
    expect(element(s+'tr:eq(2) td:eq(0) span[editable-text]').text()).toMatch('awesome');
    expect(element(s+'tr:eq(3) td:eq(0) span[editable-text]').text()).toMatch('awesome');
    expect(element(s+'tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status2');
    expect(element(s+'tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('admin');
  });

});