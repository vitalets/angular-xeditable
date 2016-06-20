describe('editable-table', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  var s = '[ng-controller="EditableTableCtrl"] > form ';

  //form enabled when data loaded
  function checkInitialValues() {
    expect(element(s+'table tr').count()).toBe(4);
    expect(element(s+'table tr:eq(1) td:eq(0) span[editable-text]').text()).toMatch('user1');
    expect(element(s+'table tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status2');
    expect(element(s+'table tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('admin');
    expect(element(s+'table tr:eq(2) td:eq(0) span[editable-text]').text()).toMatch('user2');
    expect(element(s+'table tr:eq(3) td:eq(0) span[editable-text]').text()).toMatch('user3');    
  }

  //edit button initially shown, form initially hidden
  function checkClosed() {
    expect(element(s+'table span[editable-text]:visible').count()).toBeGreaterThan(2);
    expect(element(s+'table span[editable-select]:visible').count()).toBeGreaterThan(5);
    expect(element(s+'.btn-edit button:visible').count()).toBe(1);
    expect(element(s+'.btn-form button:visible').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
  }

  //form shown in disabled state (loading)
  function checkWaiting() {
    expect(element(s+'table span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'table span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.btn-edit button:visible').count()).toBe(0);
    expect(element(s+'.btn-form button:visible:disabled').count()).toBe(3);
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBeGreaterThan(2);
    expect(element(s+'select:visible:disabled').count()).toBeGreaterThan(5);
  }

  //form enabled when data loaded
  function checkShown() {
    expect(element(s+'table span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'table span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'.btn-edit button:visible').count()).toBe(0);
    expect(element(s+'.btn-form button:visible:enabled').count()).toBe(3);
    expect(element(s+'input[type="text"]:visible:enabled').count()).toBeGreaterThan(2);
    expect(element(s+'select:visible:enabled').count()).toBeGreaterThan(5);
  }

  it('should show form by `edit` button and save new values', function() {
    //check initial values
    checkInitialValues();
    checkClosed();

    //show form
    element(s+'.btn-edit button').click();
    checkWaiting();
    sleep(delay);
    checkShown();

    //submit incorrect values (they set initially)
    element(s+'.btn-form button[type="submit"]').click();

    checkShown();

    //error shown (row 2)
    expect(element(s+'table tr:eq(2) td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'table tr:eq(2) td:eq(0) .editable-error').text()).toMatch('Username 2 should be `awesome`');

    //set correct values
    using(s+'table tr:eq(2) td:eq(0)').input('$parent.$data').enter('awesome'); //user2: name = awesome
    using(s+'table tr:eq(1) td:eq(1)').select('$parent.$data').option('number:3'); //user1: status = status4
    using(s+'table tr:eq(1) td:eq(2)').select('$parent.$data').option('number:1'); //user1: group = user

    //add 2 new rows
    expect(element(s+'table tr').count()).toBe(4);
    element(s+'.btn-form button.pull-right').click();
    element(s+'.btn-form button.pull-right').click();
    expect(element(s+'table tr').count()).toBe(6);

    //delete row 3
    element(s+'table tr:eq(3) td:eq(3) button').click();
    expect(element(s+'table tr').count()).toBe(5);

    //submit
    element(s+'.btn-form button[type="submit"]').click();

    checkWaiting();

    //error hidden
    expect(element(s+'table tr td:eq(2) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    checkClosed();

    //check updated values
    expect(element(s+'table tr:eq(1) td:eq(0) span[editable-text]').text()).toMatch('user1');
    expect(element(s+'table tr:eq(1) td:eq(1) span[editable-select]').text()).toMatch('status3');
    expect(element(s+'table tr:eq(1) td:eq(2) span[editable-select]').text()).toMatch('user');
    expect(element(s+'table tr:eq(2) td:eq(0) span[editable-text]').text()).not().toMatch('user2');
    expect(element(s+'table tr:eq(3) td:eq(0) span[editable-text]').text()).toMatch('empty');    
  });


  it('should be able to cancel all changes', function() {
    //check initial values
    checkInitialValues();
    checkClosed();
    //show form
    element(s+'.btn-edit button').click();
    sleep(delay);
    checkShown();

    //set correct values
    using(s+'table tr:eq(2) td:eq(0)').input('$parent.$data').enter('awesome'); //user2: name = awesome
    using(s+'table tr:eq(1) td:eq(1)').select('$parent.$data').option('number:3'); //user1: status = status4
    using(s+'table tr:eq(1) td:eq(2)').select('$parent.$data').option('number:1'); //user1: group = user

    //add 2 new rows
    expect(element(s+'table tr').count()).toBe(4);
    element(s+'.btn-form button.pull-right').click();
    element(s+'.btn-form button.pull-right').click();
    expect(element(s+'table tr').count()).toBe(6);

    //delete row 3
    element(s+'table tr:eq(3) td:eq(3) button').click();
    expect(element(s+'table tr').count()).toBe(5);

    //click cancel  
    element(s+'.btn-form button[ng-click="tableform.$cancel()"]').click();

    //check reset values
    checkInitialValues();
    checkClosed();    
  });

});