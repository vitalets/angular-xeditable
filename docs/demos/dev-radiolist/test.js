describe('dev-radiolist', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show radio options and submit new value', function() {
    var s = '[ng-controller="DevRadiolistCtrl"] ';

    expect(element(s+'a.normal ').text()).toMatch('status1');
    element(s+'a.normal ').click();

    expect(element(s+'a.normal ').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="radio"]:visible:enabled').count()).toBe(2);

    expect(using(s+'label:eq(0)').input('$parent.$parent.$data').val()).toBe('true');
    expect(using(s+'label:eq(1)').input('$parent.$parent.$data').val()).toBe('false');

    // select status2
    using(s+'label:eq(1)').input('$parent.$parent.$data').select('false');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a.normal ').css('display')).not().toBe('none');
    expect(element(s+'a.normal ').text()).toMatch('status2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should show radio options and call on-change event', function() {
    var s = '[ng-controller="DevRadiolistCtrl"] ';

    expect(element(s+'a.nobuttons ').text()).toMatch('status1');
    element(s+'a.nobuttons ').click();

    expect(element(s+'a.nobuttons ').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="radio"]:visible:enabled').count()).toBe(2);
    expect(element(s+'form input[type="radio"]').attr('ng-change')).toBeDefined();

    expect(using(s+'label:eq(0)').input('$parent.$parent.$data').val()).toBe('true');
    expect(using(s+'label:eq(1)').input('$parent.$parent.$data').val()).toBe('false');

    // select status2
    using(s+'label:eq(1)').input('$parent.$parent.$data').select('false');
    element(s).click();

    expect(element(s+'a.nobuttons ').css('display')).not().toBe('none');
    expect(element(s+'a.nobuttons ').text()).toMatch('status1');
    expect(element(s+'form').count()).toBe(0);
  });

});