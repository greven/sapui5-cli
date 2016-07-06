module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: ['test/unit/index.js'],

    preprocessors: {

    },

    reporters: ['spec'],

    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: [
        'PhantomJS'
        // , 'Chrome'
        // , 'Firefox'
        // , 'Safari'
    ],

    // Continuous Integration mode
    singleRun: true
  });
};
