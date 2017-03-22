var url = 'http://127.0.0.1:8000/'; // This should be local webserver
var capabilities = {
    'browserName': 'firefox'
};
if (process.env.TRAVIS) {
    url = 'https://b3ncr.github.io/angular-xeditable/'; // Change to your dev server
    capabilities["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER; // this is required by saucelabs
}

exports.config = {
	baseUrl: url,
	seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: capabilities,
	specs: ['docs/demos/text-simple/test-spec.js']
};
