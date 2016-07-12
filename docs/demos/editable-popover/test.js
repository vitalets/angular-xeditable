describe('editable-popover', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });


  it('should show editor and submit new value', function() {
    var s = '[ng-controller="EditPopoverCtrl"] ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$parent.$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('username2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should not save by cancel button', function() {
    var s = '[ng-controller="EditPopoverCtrl"] ';
    element(s+'a').click();

    using(s).input('$parent.$data').enter('username2');
    element(s+'form button[type="button"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should attach `editable-empty` class', function() {
    var s = '[ng-controller="EditPopoverCtrl"] ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'a').attr('class')).not().toMatch('editable-empty');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$parent.$data').enter('');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('empty');
    expect(element(s+'a').attr('class')).toMatch('editable-empty');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should cancel by click on body', function() {
    var s = '[ng-controller="EditPopoverCtrl"] ';
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);

    // click on input - still visible
    element(s+'form input[type="text"]').click();
    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);

    // click on body - close
    element('body').click();
    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });
});