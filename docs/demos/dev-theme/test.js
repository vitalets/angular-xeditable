describe('dev-theme', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should have bs3 theme classes', function() {
    var s = '[ng-controller="DevTheme"] ';
    var a = s + 'a#e-attrs '

    // click on body
    element(a).click();
    expect(element(a).css('display')).toBe('none');

    expect(element(s+'form .editable-buttons button[type="submit"]').attr('class')).toBe("btn btn-primary");
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    using(s).input('$parent.$data').enter('username2');

    element('body').click();
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should have default theme classes', function() {
    var s = '[ng-controller="DevTheme"] ';
    var a = s + 'a.cancel '

    expect(element(a).text()).toMatch('awesome user');
    element(a).click();

    expect(element(s+'form .editable-buttons button[type="submit"]').attr('class')).toBe(undefined);
  });


});