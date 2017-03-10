describe('text-simple', function () {
	var cssForOuterDiv = '[ng-controller="TextSimpleCtrl"] ';
	beforeEach(function () {
		browser.get('http://127.0.0.1:8000/docs/demos/text-simple/test-page.html');
	});

	it('should be clickable', function () {
		element(by.binding('user.name')).click();
	});

	it('should hide anchor after click', function () {
		element(by.binding('user.name')).click();
		expect(element(by.binding('user.name')).isDisplayed()).toBe(false);
	});

	it('should show input after click', function () {
		element(by.binding('user.name')).click();
		expect(element(by.model('$parent.$data')).isDisplayed()).toBe(true);
	});

	// can't find the input element this way as it doesn't exist before the click.
	// it('should not show input before click', function () {
	//     expect(element(by.model('$parent.$data')).isDisplayed()).toBe(false);
	// });

	it('should contain the "awesome user" as initial text in input control', function () {
		element(by.binding('user.name')).click();

		var text = element(by.css(cssForOuterDiv + 'form input[type="text"]')).getText();

		expect(text).toBe("awesome user");
	});

	it('should cancel by click on body', function () {
    
        element(by.binding('user.name')).click();
        
        // link is hidden
		expect(element(by.binding('user.name')).isDisplayed()).toBe(false);
        
        element(by.css('body')).click();
       
       // link is re-shown.
		expect(element(by.binding('user.name')).isDisplayed()).toBe(true);
        
		// var s = '[ng-controller="TextSimpleCtrl"] ';
		// element(s + 'a').click();

		// expect(element(s + 'a').css('display')).toBe('none');
		// expect(element(s + 'form[editable-form="$form"]').count()).toBe(1);
		// expect(element(s + 'form input[type="text"]:visible').count()).toBe(1);

		// // click on input - still visible
		// element(s + 'form input[type="text"]').click();
		// expect(element(s + 'a').css('display')).toBe('none');
		// expect(element(s + 'form[editable-form="$form"]').count()).toBe(1);
		// expect(element(s + 'form input[type="text"]:visible').count()).toBe(1);

		// // click on body - close
		// element('body').click();
		// expect(element(s + 'a').css('display')).not().toBe('none');
		// expect(element(s + 'a').text()).toMatch('awesome user');
		// expect(element(s + 'form').count()).toBe(0);
	});

	// it('should show editor and submit new value', function () {
	// var s = '[ng-controller="TextSimpleCtrl"] ';

	// expect(element(s + 'a').css('display')).not().toBe('none');
	// expect(element(s + 'a').text()).toMatch('awesome user');
	// element(s + 'a').click();

	// expect(element(s + 'a').css('display')).toBe('none');
	// expect(element(s + 'form[editable-form="$form"]').count()).toBe(1);
	// expect(element(s + 'form input[type="text"]:visible').count()).toBe(1);
	// expect(element(s + 'form input[type="text"]').val()).toBe('awesome user');
	// expect(element(s + 'form button[type="submit"]:visible').count()).toBe(1);
	// expect(element(s + 'form button[type="button"]:visible').count()).toBe(1);

	// using(s).input('$parent.$data').enter('username2');
	// element(s + 'form button[type="submit"]').click();

	// expect(element(s + 'a').css('display')).not().toBe('none');
	// expect(element(s + 'a').text()).toBe('username2');
	// expect(element(s + 'form').count()).toBe(0);
	// });

	// it('should not save by cancel button', function () {
	// var s = '[ng-controller="TextSimpleCtrl"] ';
	// element(s + 'a').click();

	// using(s).input('$parent.$data').enter('username2');
	// element(s + 'form button[type="button"]').click();

	// expect(element(s + 'a').css('display')).not().toBe('none');
	// expect(element(s + 'a').text()).toMatch('awesome user');
	// expect(element(s + 'form').count()).toBe(0);
	// });

	// it('should attach `editable-empty` class', function () {
	// var s = '[ng-controller="TextSimpleCtrl"] ';

	// expect(element(s + 'a').css('display')).not().toBe('none');
	// expect(element(s + 'a').text()).toMatch('awesome user');
	// expect(element(s + 'a').attr('class')).not().toMatch('editable-empty');
	// element(s + 'a').click();

	// expect(element(s + 'a').css('display')).toBe('none');
	// expect(element(s + 'form[editable-form="$form"]').count()).toBe(1);
	// expect(element(s + 'form input[type="text"]:visible').count()).toBe(1);
	// expect(element(s + 'form input[type="text"]').val()).toBe('awesome user');
	// expect(element(s + 'form button[type="submit"]:visible').count()).toBe(1);
	// expect(element(s + 'form button[type="button"]:visible').count()).toBe(1);

	// using(s).input('$parent.$data').enter('');
	// element(s + 'form button[type="submit"]').click();

	// expect(element(s + 'a').css('display')).not().toBe('none');
	// expect(element(s + 'a').text()).toBe('empty');
	// expect(element(s + 'a').attr('class')).toMatch('editable-empty');
	// expect(element(s + 'form').count()).toBe(0);
	// });

});
