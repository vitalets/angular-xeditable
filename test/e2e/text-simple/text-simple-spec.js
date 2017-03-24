
var EditTextPage = require('./text-simple-page');
var hasClass = require('../hasClass');

describe('text-simple', function () {
    var editTextPage= new EditTextPage();
    
	beforeEach(function () {
        
                
        // load the simple-text test view
		browser.get(browser.baseUrl +'/test/e2e/text-simple/text-simple.html');
	});

	it('should be clickable', function () {
		editTextPage.beginEdit();
	});

	it('should hide anchor after click', function () {
		editTextPage.beginEdit();
		expect(editTextPage.label.isDisplayed()).toBe(false);
	});

	it('should show input after click', function () {
		editTextPage.beginEdit();
		expect(editTextPage.input.isDisplayed()).toBe(true);
	});
    
	it('should contain the "awesome user" as initial text in input control', function () {
		editTextPage.beginEdit();

		var text = editTextPage.input.getAttribute('value');

		expect(text).toBe("awesome user");
	});

	it('should cancel by click on body', function () {
    
        editTextPage.beginEdit();
        
        // link is hidden
        expect(editTextPage.label.isDisplayed()).toBe(false);
        
        editTextPage.body.click();
       
        // link is re-shown.
        expect(editTextPage.label.isDisplayed()).toBe(true);
	});
    
    it('Should update model on submit', function(){
        editTextPage.setText("Mary");
        
        editTextPage.submitButton.click();

        expect(editTextPage.label.getText()).toBe("Mary");
    });

    it('Should not update model on cancel', function () {
        editTextPage.setText("Mary");

        editTextPage.cancelButton.click();

        expect(editTextPage.label.getText()).toBe("awesome user");
    });

    it('Should add "editable-empty" class to label when model is cleared', function () {
        editTextPage.beginEdit();

        editTextPage.input.clear().then(function () {
            editTextPage.submitButton.click();

            expect(hasClass(editTextPage.label, 'editable-empty')).toBe(true);
        });
    });

    it('Should not update the model when clicking on the body', function () {
        editTextPage.setText("Mary");

        editTextPage.body.click();

        expect(editTextPage.label.getText()).toBe("awesome user");
    });
});
