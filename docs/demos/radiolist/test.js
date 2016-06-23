describe('radiolist', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show radio options and submit new value', function() {
    var s = '[ng-controller="RadiolistCtrl"] ';

    expect(element(s+'a').text()).toMatch('status2');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="radio"]:visible:enabled').count()).toBe(2);

    expect(using(s+'label:eq(0)').input('$parent.$parent.$data').val()).toBe('1');
    expect(using(s+'label:eq(1)').input('$parent.$parent.$data').val()).toBe('2');

    // select status1
    using(s+'label:eq(0)').input('$parent.$parent.$data').select('1');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('status1');
    expect(element(s+'form').count()).toBe(0);
  });

});