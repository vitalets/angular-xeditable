var page = function () {
    this.body = element(by.css('body'));
    this.label = element(by.binding('user.name'));
    this.input = element(by.model('$parent.$data'));
    this.submitButton = element(by.css('button[type=submit]'));
    this.cancelButton = element(by.css('[ng-click="$form.$cancel()"]'));

    this.beginEdit = function () {
        this.label.click();
    }

    this.setText = function (text) {

        let input1 = this.input;
        this.label.click();

        this.input.clear().then(function () {
            input1.sendKeys(text);
        });
    }
};

module.exports = page;