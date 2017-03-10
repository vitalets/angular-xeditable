exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome'
	},
	specs: ['docs/demos/text-simple/test-spec.js']
};
