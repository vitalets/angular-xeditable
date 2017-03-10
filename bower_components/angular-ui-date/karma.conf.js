// Karma configuration
//
var webpack = require('webpack');
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'src/*.spec.js',
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/*.spec.js': ['webpack'],
    },

    webpack: {
      plugins: [
        new webpack.ProvidePlugin({
          // $: 'jquery',
          // jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
      ],
      module: {
        loaders: [
          // it helps angular to have jQuery exposed so that it uses $ instead of jqLite
          // this is an alternative to using a webpack provide plugin
          // {
          //   test: require.resolve('jquery'),
          //   loader: 'expose?$!expose?jQuery',
          // },
          {
            test: /(\.js$)/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
        ],
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    reportSlowerThan: 200,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


  });

  if (process.env.TRAVIS) {
    config.set({
      browsers: ['Firefox'],
      reporters: 'dots',
      autoWatch: false,
      singleRun: true,
    });
  }

};
