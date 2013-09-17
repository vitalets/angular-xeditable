describe('send-to-server', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html');
  });

  it('onbeforesave', function() {
    var s = '[ng-controller="SendToServerCtrl"] ';

    expect(element(s+'a[onbeforesave]').text()).toMatch('awesome user');
    element(s+'a[onbeforesave]').click();

    //not valid
    using(s).input('$data').enter('error');
    element(s+'form button[type="submit"]').click();

    //saving
    expect(element(s+'a[onbeforesave]').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(1);

    //error shown
    expect(element(s+'a[onbeforesave]').css('display')).toBe('none');
    expect(element(s+'a[onbeforesave]').text()).toMatch('awesome user');
    expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(1);
    expect(element(s+'button:visible:enabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Error message');

    //valid
    using(s).input('$data').enter('awesome');
    element(s+'form button[type="submit"]').click();

    //saving
    expect(element(s+'a[onbeforesave]').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(1);

    //no error shown, form closed
    expect(element(s+'a[onbeforesave]').css('display')).not().toBe('none');
    expect(element(s+'a[onbeforesave]').text()).toMatch('awesome');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

  it('onaftersave', function() {
    var s = '[ng-controller="SendToServerCtrl"] ';

    expect(element(s+'a[onaftersave]').text()).toMatch('awesome user');
    element(s+'a[onaftersave]').click();

    //not valid
    using(s).input('$data').enter('error');
    element(s+'form button[type="submit"]').click();

    //saving
    expect(element(s+'a[onaftersave]').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(1);

    //error shown
    expect(element(s+'a[onaftersave]').css('display')).toBe('none');
    expect(element(s+'a[onaftersave]').text()).toMatch('error'); //local model updated!
    expect(element(s+'input[type="text"]:visible:enabled').count()).toBe(1);
    expect(element(s+'button:visible:enabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Error message');

    //valid
    using(s).input('$data').enter('awesome');
    element(s+'form button[type="submit"]').click();

    //saving
    expect(element(s+'a[onaftersave]').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible:disabled').count()).toBe(1);
    expect(element(s+'button:visible:disabled').count()).toBe(2);
    expect(element(s+'.editable-error:visible').count()).toBe(0);

    sleep(1);

    //no error shown, form closed
    expect(element(s+'a[onaftersave]').css('display')).not().toBe('none');
    expect(element(s+'a[onaftersave]').text()).toMatch('awesome');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

});