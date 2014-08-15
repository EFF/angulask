module.exports = function(config) {  
  config.set({
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine', 'browserify'],

    files: ['client/scripts/*', 'client/scripts/tests/**/*.js'],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    browserNoActivityTimeout : 25000,

    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false,

    // Browserify config
    browserify: {
      watch: true
    },

    // Add browserify to preprocessors
    preprocessors: {
            'client/scripts/tests/**/*': ['browserify'],
            'client/scripts/app/*': ['browserify']
        }
  }); 
};
