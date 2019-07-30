describe('uipopover', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });


it('should show editor and submit new value', function() {
    var s = '[ng-controller="UiPopoverCtrl"] ',
        p = 'div.popover-content ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(p+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(p+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(p+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(p+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(p+'form button[type="button"]:visible').count()).toBe(1);

    using(p).input('$parent.$data').enter('username2');
    element(p+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('username2');
    expect(element(p+'form').count()).toBe(0);
  });

  it('should not save by cancel button', function() {
    var s = '[ng-controller="UiPopoverCtrl"] ',
        p = 'div.popover-content ';
    element(s+'a').click();

    using(p).input('$parent.$data').enter('username2');
    element(p+'form button[type="button"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should attach `editable-empty` class', function() {
    var s = '[ng-controller="UiPopoverCtrl"] ',
        p = 'div.popover-content ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'a').attr('class')).not().toMatch('editable-empty');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(p+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(p+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(p+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(p+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(p+'form button[type="button"]:visible').count()).toBe(1);

    using(p).input('$parent.$data').enter('');
    element(p+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('empty');
    expect(element(s+'a').attr('class')).toMatch('editable-empty');
    expect(element(p+'form').count()).toBe(0);
  });

  it('should cancel by click on body', function() {
    var s = '[ng-controller="UiPopoverCtrl"] ',
        p = 'div.popover-content ';

    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(p+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(p+'form input[type="text"]:visible').count()).toBe(1);

    // click on input - still visible
    element(p+'form input[type="text"]').click();
    expect(element(s+'a').css('display')).toBe('inline');
    expect(element(p+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(p+'form input[type="text"]:visible').count()).toBe(1);

    // click on body - close
    element('body').click();
    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(p+'form').count()).toBe(0);
  });
});