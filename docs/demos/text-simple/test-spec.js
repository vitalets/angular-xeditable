
var EditTextPage = require('./textsimple.pageObject');

describe('text-simple', function () {
	var cssForOuterDiv = '[ng-controller="TextSimpleCtrl"] ';
    var editTextPage;
    
	beforeEach(function () {
        editTextPage = new EditTextPage();
		browser.get(browser.baseUrl +'/docs/demos/text-simple/test-page.html');
	});

	it('should be clickable', function () {
		editTextPage.beginEdit();
	});

	it('should hide anchor after click', function () {
		editTextPage.beginEdit();
		expect(element(by.binding('user.name')).isDisplayed()).toBe(false);
	});

	it('should show input after click', function () {
		editTextPage.beginEdit();
		expect(element(by.model('$parent.$data')).isDisplayed()).toBe(true);
	});
    
	it('should contain the "awesome user" as initial text in input control', function () {
		editTextPage.beginEdit();

		var text = element(by.css(cssForOuterDiv + 'form input[type="text"]')).getAttribute('value');

		expect(text).toBe("awesome user");
	});

	it('should cancel by click on body', function () {
    
        editTextPage.beginEdit();
        
        // link is hidden
		expect(element(by.binding('user.name')).isDisplayed()).toBe(false);
        
        element(by.css('body')).click();
       
       // link is re-shown.
		expect(element(by.binding('user.name')).isDisplayed()).toBe(true);
	});
    
    it('Should update model on button click', function(){
    
    });
});
