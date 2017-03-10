var url = 'http://127.0.0.1:8000/'; // This should be local webserver
if (process.env.TRAVIS) {
	url = 'https://b3ncr.github.io/angular-xeditable/' // Change to your dev server
}

exports.config = {
	baseUrl: url,
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome'
	},
	specs: ['docs/demos/text-simple/test-spec.js']
};
