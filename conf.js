console.log("Protractor Config");
console.log(process.env.SELENIUM_URL);

var url = 'http://127.0.0.1:8000/'; // This should be local webserver
var capabilities = {
    'browserName': 'firefox'
};
if (process.env.TRAVIS) {
    url = 'https://b3ncr.github.io/angular-xeditable/'; // Change to your dev server
    capabilities.["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER; // this is required by saucelabs
}

exports.config = {
    baseUrl: url,
    seleniumAddress:   (process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),
    capabilities: {
        "browserName": "firefox",
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
    specs: ['docs/demos/text-simple/test-spec.js']
};
