describe('dev-textarea', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show html in link and show editor and submit new value', function() {
    var s = '[ng-controller="DevTextareaCtrl"] ';
    var a = s + 'a#displayHtml ';
    
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('<strong>Title</strong><p>my text...');
    element(a).click();

    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form textarea:visible').count()).toBe(1);
    expect(element(s+'form textarea').val()).toMatch('<strong>Title</strong><p>my text...');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$parent.$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('username2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('textarea with submit on enter attribute', function() {
    var s = '[ng-controller="DevTextareaCtrl"] ';
    var a = s + 'a#submitOnEnter ';
    
    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('<strong>Title</strong><p>my text...');
    element(a).click();

    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form textarea:visible').count()).toBe(1);
    expect(element(s+'form textarea').val()).toMatch('<strong>Title</strong><p>my text...');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(0);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(0);
    
    using(s).input('$parent.$data').enter('username3');
    
    //click body --> submit
    element('body').click();

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('<strong>Title</strong><p>my text...');
    expect(element(s+'form').count()).toBe(0);
  });
});