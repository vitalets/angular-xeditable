describe('html5-inputs', function() {

  // var $filter;

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show editor and submit new value', function($filter) {
    var s = '[ng-controller="Html5InputsCtrl"] ';
    var data0 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      month: null,
      week: null,
      password: 'password',
      'datetime-local': null,
      file: null
    };

    var data1 = {
      email: 'email@example1.com',
      tel: '123-45-63',
      number: 23,
      range: 15,
      url: 'http://example1.com',
      search: 'blabla1',
      color: '#000000',
      date: null,
      time: '12:40',
      month: null,
      week: null,
      password: 'password1',
      'datetime-local': null,
      file: null
    };

    function checkValues(data) {
      angular.forEach(data, function(v, k) {
        var e = s + 'a[editable-'+k+']';
        expect(element(e).css('display')).not().toBe('none');

        if (k === "time") {
          expect(element(e).text()).toMatch(v || 'empty');
        } else {
          expect(element(e).text()).toMatch(v || 'empty');
        }
      });
    }

    // check initial state
    checkValues(data0);

    // change values
    angular.forEach(data1, function(v, k) {
      var e = s + 'a[editable-'+k+']';
      element(e).click();
      expect(element(e).css('display')).toBe('none');
      expect(element(s+'form input[type="'+k+'"]:visible').count()).toBe(1);
      using(s).input('$parent.$data').enter(v);
      element(s+'form button[type="submit"]').click();
      expect(element(s+'form input[type="'+k+'"]:visible').count()).toBe(0);
    });

    // check final state
    checkValues(data1);
  });

});