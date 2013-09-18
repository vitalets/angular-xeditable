describe('text-customize', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html?test');
  });

  it('should transfer e-* attributes (except e-form)', function() {
    var s = '[ng-controller="TextCustomizeCtrl"] ';

    expect(element(s+'a').text()).toMatch('AWESOME USER');
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').outerWidth()).toBe(150);

    //reopen
    element(s+'form button[type="button"]').click();
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').outerWidth()).toBe(150);
  });

});