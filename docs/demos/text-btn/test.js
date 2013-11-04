describe('text-btn', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor by external button', function() {
    var s = '[ng-controller="TextBtnCtrl"] ';

    expect(element(s+'span:eq(0)').text()).toMatch('awesome user');

    //not open by click
    element(s+'span:eq(0)').click();
    expect(element(s+'span:eq(0)').css('display')).not().toBe('none');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'> button').css('display')).not().toBe('none');

    //open by ext btn
    element(s+'> button').click();
    expect(element(s+'span:eq(0)').css('display')).toBe('none');
    expect(element(s+'form').count()).toBe(1);
    expect(element(s+'> button').css('display')).toBe('none');

    //e-form should not transfer
    expect(element(s+'form input[type="text"]').attr('form')).toBeFalsy();
    expect(element(s+'form').attr('name')).toBeFalsy();
    expect(element(s+'form').attr('editable-form')).toBeTruthy();

    //submit
    using(s).input('$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'span:eq(0)').css('display')).not().toBe('none');
    expect(element(s+'span:eq(0)').text()).toMatch('username2');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'> button').css('display')).not().toBe('none');
  });

  /*
  it('should close correctly by escape', function() {
    var s = '[ng-controller="TextBtnCtrl"] ';

    expect(element(s+'span:eq(0)').text()).toMatch('awesome user');

    //open by ext btn
    element(s+'> button').click();

    //`escape` can't be simulated here
  });
  */

});