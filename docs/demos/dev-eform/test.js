describe('dev-eform', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor by click', function() {
    var s = '[ng-controller="DevEformCtrl"] ';

    expect(element(s+'a:eq(0)').text()).toMatch('awesome user1');

    //not open by click
    element(s+'a:eq(0)').click();
    expect(element(s+'a:eq(0)').css('display')).toBe('none');
    expect(element(s+'form').count()).toBe(1);

    //e-form should not transfer
    expect(element(s+'form input[type="text"]').attr('form')).toBeFalsy();
    expect(element(s+'form').attr('name')).toBeFalsy();
    expect(element(s+'form').attr('editable-form')).toBeTruthy();

    //submit
    using(s).input('$parent.$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a:eq(0)').css('display')).not().toBe('none');
    expect(element(s+'a:eq(0)').text()).toMatch('username2');
    expect(element(s+'form').count()).toBe(0);
  });

});