'use strict'

// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    concurrency: 1,
    detectBrowsers: {
      usePhantomJS: false
    },
    files: ['test.js'],
    frameworks: ['detectBrowsers', 'mocha', 'chai'],
    logLevel: config.LOG_WARN,
    reporters: ['spec'],
    singleRun: true
  })
}
