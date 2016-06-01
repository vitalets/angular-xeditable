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
    expect(element(s+'form').attr('class')).toBe("form-inline editable-wrap editable-text class1 class2 ng-pristine ng-valid ng-scope ng-valid-required");

    //reopen
    element(s+'form button[type="button"]').click();
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
  });

});