describe('typeahead', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="TypeaheadCtrl"] ';
    var a = s+'a[editable-text] ';

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('Arizona');
    element(a).click();

    expect(element(a).css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('Arizona'); 
    expect(element(s+'form .editable-buttons button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form .editable-buttons button[type="button"]:visible').count()).toBe(1);

    //type 'a'
    using(s).input('$data').enter('a');
    expect(element(s+'form ul.typeahead.dropdown-menu:visible').count()).toBe(1);
    expect(element(s+'form ul.typeahead.dropdown-menu > li').count()).toBe(8);

    //click 4 - California
    element(s+'form ul.typeahead.dropdown-menu > li:eq(4)').click();
    expect(element(s+'form ul.typeahead.dropdown-menu:visible').count()).toBe(0);
    expect(element(s+'form input[type="text"]').val()).toBe('California');

    //submit
    element(s+'form button[type="submit"]').click();

    expect(element(a).css('display')).not().toBe('none');
    expect(element(a).text()).toMatch('California');
    expect(element(s+'form').count()).toBe(0);
  });
});