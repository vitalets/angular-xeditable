describe('onaftersave', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html?test');
  });

  it('should show error for incorrect value and save correct', function() {
    var s = '[ng-controller="OnaftersaveCtrl"] ';

    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    //not valid
    using(s).input('$data').enter('error');
    element(s+'form button[type="submit"]').click();

    //local model changed
    expect(element(s+'a').text()).toMatch('error');

    //saving
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(0.5);

    //error shown
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'a').text()).toMatch('error'); //local model updated!
    expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(1);
    expect(element(s+'button:visible:enabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Error message');

    //valid
    using(s).input('$data').enter('super');
    element(s+'form button[type="submit"]').click();

    //local model changed
    expect(element(s+'a').text()).toMatch('super');

    //saving
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(0.5);

    //no error shown, form closed
    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('super');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

});