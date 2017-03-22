describe('text-simple', function () {
	var cssForOuterDiv = '[ng-controller="TextSimpleCtrl"] ';
	beforeEach(function () {
		browser.get(browser.baseUrl +'/docs/demos/text-simple/test-page.html');
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
    
	it('should contain the "awesome user" as initial text in input control', function () {
		element(by.binding('user.name')).click();

		var text = element(by.css(cssForOuterDiv + 'form input[type="text"]')).getAttribute('value');

		expect(text).toBe("awesome user");
	});

	it('should cancel by click on body', function () {
    
        element(by.binding('user.name')).click();
        
        // link is hidden
		expect(element(by.binding('user.name')).isDisplayed()).toBe(false);
        
        element(by.css('body')).click();
       
       // link is re-shown.
		expect(element(by.binding('user.name')).isDisplayed()).toBe(true);
	});
    
});
