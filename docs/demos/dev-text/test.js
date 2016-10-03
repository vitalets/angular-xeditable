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
    expect(element(s+'form input[type="text"]').attr('label')).toBe("User Name");
    expect(element(s+'form input[type="text"]').attr('form')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('ng-submit')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('k-data-text-field')).toBeDefined();

    //reopen
    element(s+'form button[type="button"]').click();
    element(a).click();

    expect(element(s+'form input[type="text"]').attr('style')).toBe("color: green");
    expect(element(s+'form input[type="text"]').attr('autocomplete')).toBe("off");
    expect(element(s+'form input[type="text"]').attr('required')).toBe("required");
    expect(element(s+'form input[type="text"]').attr('placeholder')).toBe("Enter name");
    expect(element(s+'form input[type="text"]').attr('data-var')).toBe("var");
    expect(element(s+'form input[type="text"]').attr('ng-bind')).toBe("test");
    expect(element(s+'form input[type="text"]').attr('label')).toBe("User Name");
    expect(element(s+'form input[type="text"]').attr('form')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('ng-submit')).not().toBeDefined();
    expect(element(s+'form input[type="text"]').attr('k-data-text-field')).toBeDefined();
    expect(element(s+'form').attr('class')).toBe("form-inline editable-wrap editable-text class1 class2 ng-pristine ng-valid ng-scope ng-valid-required");
    expect(element(s+'form button[type="button"]').attr('title')).toBe("Cancel");
    expect(element(s+'form button[type="button"]').attr('aria-label')).toBe("Cancel");
    expect(element(s+'form button[type="submit"]').attr('title')).toBe("Submit");
    expect(element(s+'form button[type="submit"]').attr('aria-label')).toBe("Submit");
    expect(element(s+'form .input-group-addon').count()).toBe(2);
  });

  it('blur = `submit`', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a.submit '

    // click on body
    element(a).click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form input[type="text"]').attr('label')).toBe("User Name");
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    using(s).input('$parent.$data').enter('username2');

    element('body').click();
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('username2');
    expect(element(s+'form').count()).toBe(0);  

    // click on another editable
    element(a).click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form').count()).toBe(1);
    using(s).input('$parent.$data').enter('username3');

    element(s+'a.cancel').click();
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('username3');
    expect(element(s+'form').count()).toBe(1);    
  });

  it('blur = `cancel`', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a.cancel '

    // click on body 
    element(a).click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    using(s).input('$parent.$data').enter('username2');

    element('body').click();
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);  

    // click on another editable 
    element(a).click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form').count()).toBe(1);
    using(s).input('$parent.$data').enter('username3');

    element(s+'a.ignore').click();
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(1);    
  });

  it('blur = `ignore`', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a.ignore '

    // click on body 
    element(a).click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    using(s).input('$parent.$data').enter('username2');

    element('body').click();
    expect(element(a).css('display')).toBe('none');
    expect(element(a).text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(1);  

    // click on another editable 
    element(s+'a.submit').click();
    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form').count()).toBe(2);    
  });

  it('should disable editing of the element', function() {
    var s = '[ng-controller="DevText"] ';
    var a = s + 'a#editingEnabled '

    expect(element(a).text()).toMatch('awesome user');
    element(a).click();

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });
});