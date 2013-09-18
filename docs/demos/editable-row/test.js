describe('editable-row', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html?test');
  });

  it('should show form by `edit` button and save new values', function() {
    var s = '[ng-controller="EditableRowCtrl"] table tr:eq(2) ';

    //edit button initially shown, form initially hidden
    function checkClosed() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(1);
      expect(element(s+'td:eq(1) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'td:eq(3) > button:visible').count()).toBe(1);
      expect(element(s+'td:eq(3) form button:visible').count()).toBe(0);
      expect(element(s+'select').count()).toBe(0);
      expect(element(s+'input[type="text"]').count()).toBe(0);
    }

    //form shown in disabled state (loading)
    function checkWaiting() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'td:eq(1) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) > button:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) form button:visible:disabled').count()).toBe(2);
      expect(element(s+'select:visible:disabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    }

    //form enabled when data loaded
    function checkShown() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'td:eq(1) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) > button:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) form button:visible:enabled').count()).toBe(2);
      expect(element(s+'select:visible:enabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(1);
    }

    checkClosed();

    //show form
    element(s+'td:eq(3) > button:visible').click();
    checkWaiting();
    sleep(0.5);
    checkShown();

    //set incorrect values
    using(s+'td:eq(0)').input('$data').enter('username2'); 
    element(s+'td:eq(3) form button[type="submit"]').click();

    checkShown();

    //error shown
    expect(element(s+'td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'td:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');

    //set correct values
    using(s+'td:eq(0)').input('$data').enter('awesome'); 
    using(s+'td:eq(1)').select('$data').option('3'); //status4
    using(s+'td:eq(2)').select('$data').option('0'); //user
    element(s+'td:eq(3) form button[type="submit"]').click();

    checkWaiting();
    //error hidden
    expect(element(s+'td:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(0.5);

    checkClosed();
  });

});