describe('dev-editable-row', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form by `edit` button and save new values', function() {
    var s = '[ng-controller="DevEditableRowCtrl"] table tr:eq(2) '; //work with user 2

    //edit button initially shown, form initially hidden
    function checkClosed() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(1);
      expect(element(s+'td:eq(1) span[editable-checklist]:visible').count()).toBe(1);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(1);
      expect(element(s+'td:eq(3) .buttons:visible').count()).toBe(1);
      expect(element(s+'td:eq(3) form button:visible').count()).toBe(0);
      expect(element(s+'select').count()).toBe(0);
      expect(element(s+'input[type="text"]').count()).toBe(0);
    }

    //form shown in disabled state (loading)
    function checkWaiting() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'td:eq(1) span[editable-checklist]:visible').count()).toBe(0);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) > button:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) form button:visible:disabled').count()).toBe(2);
      expect(element(s+'select:visible:disabled').count()).toBe(1);
      expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    }

    //form enabled when data loaded
    function checkShown() {
      expect(element(s+'td:eq(0) span[editable-text]:visible').count()).toBe(0);
      expect(element(s+'td:eq(1) span[editable-checklist]:visible').count()).toBe(0);
      expect(element(s+'td:eq(2) span[editable-select]:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) .buttons:visible').count()).toBe(0);
      expect(element(s+'td:eq(3) form button:visible:enabled').count()).toBe(2);
      expect(element(s+'select:visible:enabled').count()).toBe(1);
      expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(1);
    }

    checkClosed();

    //show form
    element(s+'td:eq(3) .buttons button.btn-primary:visible').click();
    checkWaiting();
    sleep(delay);
    checkShown();

    //set incorrect values
    using(s+'td:eq(0)').input('$parent.$data').enter('username2');
    element(s+'td:eq(3) form button[type="submit"]').click();

    checkShown();

    //error shown
    expect(element(s+'td:eq(0) .editable-error:visible').count()).toBe(1);
    expect(element(s+'td:eq(0) .editable-error').text()).toMatch('Username 2 should be `awesome`');

    //set correct values
    using(s+'td:eq(0)').input('$parent.$data').enter('awesome');
    // check status4
    using(s+'label:eq(3)').input('checked').check();
    using(s+'td:eq(2)').select('$parent.$data').option('number:1'); //user
    element(s+'td:eq(3) form button[type="submit"]').click();

    checkWaiting();
    //error hidden
    expect(element(s+'td:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    checkClosed();
  });

  it('should add new users', function() {
    var s = '[ng-controller="DevEditableRowCtrl"] ';

    // initially 3 rows + header
    expect(element(s + 'table tr').count()).toBe(4);

    // click add button
    element(s + '> button').click();
    expect(element(s + 'table tr').count()).toBe(5);

    // waiting mode
    var r = s + 'table tr:eq(4) ';
    expect(element(r + 'span[editable-text]:visible').count()).toBe(0);
    expect(element(r + 'input[type="text"]:visible:disabled').count()).toBe(1);

    sleep(delay);

    // loaded
    expect(element(r + 'input[type="text"]:visible:enabled').count()).toBe(1);
  });

  it('should delete users', function() {
    var s = '[ng-controller="DevEditableRowCtrl"] table ';

    // initially 3 rows + header
    expect(element(s + 'tr').count()).toBe(4);

    // click delete button
    element(s + 'tr:eq(2) .buttons .btn-danger').click();
    expect(element(s + 'tr').count()).toBe(3);
  });

});