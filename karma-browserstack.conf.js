'use strict'
require('dotenv').config()

const {name:project} = require('./package.json')

const browsers = [
  // https://www.browserstack.com/list-of-browsers-and-platforms?product=automate
  // https://www.browserstack.com/automate/browsers.json
  { os:'Windows', os_version:'7',  browser:'ie', browser_version:'9.0' },
  { os:'Windows', os_version:'7',  browser:'ie', browser_version:'10.0' },
  { os:'Windows', os_version:'7',  browser:'ie', browser_version:'11.0' },
  { os:'Windows', os_version:'10', browser:'ie', browser_version:'11.0' },

  { os:'Windows', os_version:'10', browser:'edge', browser_version:'13.0' },
  { os:'Windows', os_version:'10', browser:'edge', browser_version:'14.0' },

  { os:'Windows', os_version:'10', browser:'firefox', browser_version:'48.0' },
  { os:'Windows', os_version:'10', browser:'firefox', browser_version:'49.0' },

  { os:'Windows', os_version:'10', browser:'chrome', browser_version:'57.0' },
  { os:'Windows', os_version:'10', browser:'chrome', browser_version:'58.0' },

  { os:'OS X', os_version:'El Capitan', browser:'safari', browser_version:'9.0' },
  { os:'OS X', os_version:'Sierra',     browser:'safari', browser_version:'10.0' },

  { os:'ios', os_version:'8.3', browser:'iphone', device:'iPhone 6', browser_version:null },
  { os:'ios', os_version:'9.1', browser:'iphone', device:'iPhone 6S', browser_version:null },

  { os:'android', os_version:'4.4', browser:'android', device:'Samsung Galaxy S5', browser_version:null },

  // TODO :: these devices may not be available to sponsored accounts once beta period is over
  { device:'Samsung Galaxy Note 4', os:'android', os_version:'6.0', real_mobile:'true' },
  { device:'Google Pixel',          os:'android', os_version:'7.1', real_mobile:'true' }
]
.reduce(function(result, browser) {
  browser.base = 'BrowserStack'
  browser.project = project
  result[`${browser.os} ${browser.os_version}, ${browser.browser} ${browser.browser_version}`] = browser
  return result
}, {})

// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: Object.keys(browsers),
    browserStack: {
      username:  process.env.BROWSERSTACK_USER,
      accessKey: process.env.BROWSERSTACK_KEY
    },
    captureTimeout: 120000,
    concurrency: 2,
    customLaunchers: browsers,
    files: ['test.js'],
    frameworks: ['mocha', 'chai'],
    logLevel: config.LOG_INFO,
    reporters: ['dots'],
    singleRun: true
  })
}
