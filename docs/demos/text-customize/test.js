describe('text-customize', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should transfer e-* attributes (except e-form)', function() {
    var s = '[ng-controller="TextCustomizeCtrl"] ';

    expect(element(s+'a').text()).toMatch('AWESOME USER');
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");

    //reopen
    element(s+'form button[type="button"]').click();
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
  });

});