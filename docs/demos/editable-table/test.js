describe('editable-table', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html');
  });

  iit('should show form by `edit` button and save new values', function() {
    var s = '[ng-controller="EditableTableCtrl"] > form ';

    //edit button initially shown, form initially hidden
    function checkClosed() {
      expect(element(s+'table span[editable-text]:visible').count()).toBe(3);
      expect(element(s+'table span[editable-select]:visible').count()).toBe(6);
      expect(element(s+'> div > button:visible').count()).toBe(1);
      expect(element(s+'> div > span > button:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]').count()).toBe(0);
      expect(element(s+'select').count()).toBe(0);
    }

    //form shown in disabled state (loading)
    function checkWaiting() {
      expect(element(s+'table span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'table span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'> div > button:visible').count()).toBe(0);
      expect(element(s+'> div > span > button:visible:disabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(3);
      expect(element(s+'select:visible:disabled').count()).toBe(6);
    }

    //form enabled when data loaded
    function checkShown() {
      expect(element(s+'table span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'table span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'> div > button:visible').count()).toBe(0);
      expect(element(s+'> div > span > button:visible:enabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(3);
      expect(element(s+'select:visible:enabled').count()).toBe(6);
    }

    //check initial values
    expect(element(s+'table tr:eq(1) td:eq(0) span[editable-text]').text()).toMatch('user1');
    expect(element(s+'table tr:eq(2) td:eq(0) span[editable-text]').text()).toMatch('user2');
    expect(element(s+'table tr:eq(3) td:eq(0) span[editable-text]').text()).toMatch('user3');
    expect(element(s+'table tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status2');
    expect(element(s+'table tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('admin');

    checkClosed();

    //show form
    element(s+'> div > button').click();
    checkWaiting();
    sleep(1);
    checkShown();

    //submit incorrect values
    element(s+'> div > span > button[type="submit"]').click();

    checkShown();
    
    //error shown
    expect(element(s+'table tr:eq(1) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'table tr:eq(2) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'table tr:eq(3) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'table tr:eq(1) td:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');

    //set correct values
    using(s+'table tr:eq(1) td:eq(0)').input('$data').enter('awesome'); 
    using(s+'table tr:eq(2) td:eq(0)').input('$data').enter('awesome'); 
    using(s+'table tr:eq(3) td:eq(0)').input('$data').enter('awesome'); 
    using(s+'table tr:eq(1) td:eq(1)').select('$data').option('3'); //status4
    using(s+'table tr:eq(1) td:eq(2)').select('$data').option('0'); //user

    element(s+'> div > span > button[type="submit"]').click();

    checkWaiting();
    //error hidden
    expect(element(s+'table tr td:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(1);

    checkClosed();

    //check updated values
    expect(element(s+'table tr:eq(1) td:eq(0) span[editable-text]').text()).not().toMatch('user1');
    expect(element(s+'table tr:eq(2) td:eq(0) span[editable-text]').text()).not().toMatch('user2');
    expect(element(s+'table tr:eq(3) td:eq(0) span[editable-text]').text()).not().toMatch('user3');
    expect(element(s+'table tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status4');
    expect(element(s+'table tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('user');
  });

});