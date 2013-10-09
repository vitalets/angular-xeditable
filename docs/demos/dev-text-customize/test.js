describe('dev-text-customize', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should transfer `e-|data-e-|x-e-` attributes (except e-form and e-ng-submit)', function() {
    var s = '[ng-controller="DevTextCustomizeCtrl"] ';

    expect(element(s+'a').text()).toMatch('AWESOME USER');
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('style')).toBe("color: green");
    expect(element(s+'form input[type="text"]').attr('autocomplete')).toBe("off");
    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').attr('data-var')).toBe("var");
    expect(element(s+'form input[type="text"]').attr('ng-bind')).toBe("test");
    expect(element(s+'form input[type="text"]').attr('form')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('ng-submit')).not().toBeDefined();

    //reopen
    element(s+'form button[type="button"]').click();
    element(s+'a').click();

    expect(element(s+'form input[type="text"]').attr('style')).toBe("color: green");
    expect(element(s+'form input[type="text"]').attr('autocomplete')).toBe("off");
    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').attr('data-var')).toBe("var");
    expect(element(s+'form input[type="text"]').attr('ng-bind')).toBe("test");
    expect(element(s+'form input[type="text"]').attr('form')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('ng-submit')).not().toBeDefined();
  });

});