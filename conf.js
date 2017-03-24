exports.config = {
	capabilities: {
		"browserName": "chrome",
	},
    specs: ['test/e2e/text-simple/text-simple-spec.js']
};

if (process.env.TRAVIS) {
	exports.config.baseUrl = 'https://b3ncr.github.io/angular-xeditable/'; // Change to your dev server
	exports.config.capabilities["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER; // this is required by saucelabs
	exports.config.sauceUser = process.env.SAUCE_USERNAME;
	exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
}
else{
    exports.config.baseUrl = 'http://127.0.0.1:8000/';
    exports.config.seleniumUrl = "http://localhost:4444/wd/hub";
}

