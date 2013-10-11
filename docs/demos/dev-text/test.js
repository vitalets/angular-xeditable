describe('dev-text', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should transfer `e-|data-e-|x-e-` attributes (except e-form and e-ng-submit)', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a#e-attrs '

    expect(element(a).text()).toMatch('AWESOME USER');
    element(a).click();

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
    element(a).click();

    expect(element(s+'form input[type="text"]').attr('style')).toBe("color: green");
    expect(element(s+'form input[type="text"]').attr('autocomplete')).toBe("off");
    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').attr('data-var')).toBe("var");
    expect(element(s+'form input[type="text"]').attr('ng-bind')).toBe("test");
    expect(element(s+'form input[type="text"]').attr('form')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('ng-submit')).not().toBeDefined();
  });

  it('should have different when blur = `cancel|submit|ignore`', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a.submit '

    element(a).click();

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
    element(a).click();

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