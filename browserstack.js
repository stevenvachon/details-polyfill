'use strict'
require('dotenv').config()

const {name:project, version} = require('./package.json')
const id = require('shortid').generate()
const build = `v${version}_${id}`

module.exports = {
  port: 4000,
  tunnel: {
    type: 'browserstack',
    key: process.env.BROWSERSTACK_KEY
  },
  launch: {
    type: 'browserstack',
    username: process.env.BROWSERSTACK_USER,
    password: process.env.BROWSERSTACK_KEY,
    version: 4
  },
  browsers: [
    // https://www.browserstack.com/automate/browsers.json
    { project, build, os:'Windows', os_version:'7',  browser:'ie', browser_version:'9.0' },
    { project, build, os:'Windows', os_version:'7',  browser:'ie', browser_version:'10.0' },
    { project, build, os:'Windows', os_version:'7',  browser:'ie', browser_version:'11.0' },
    { project, build, os:'Windows', os_version:'10', browser:'ie', browser_version:'11.0' },

    { project, build, os:'Windows', os_version:'10', browser:'edge', browser_version:'13.0' },
    { project, build, os:'Windows', os_version:'10', browser:'edge', browser_version:'14.0' },

    { project, build, os:'Windows', os_version:'10', browser:'firefox', browser_version:'48.0' },
    { project, build, os:'Windows', os_version:'10', browser:'firefox', browser_version:'49.0' },

    { project, build, os:'Windows', os_version:'10', browser:'chrome', browser_version:'57.0' },
    { project, build, os:'Windows', os_version:'10', browser:'chrome', browser_version:'58.0' },

    { project, build, os:'OS X', os_version:'El Capitan', browser:'safari', browser_version:'9.0' },
    { project, build, os:'OS X', os_version:'Sierra',     browser:'safari', browser_version:'10.0' },

    { project, build, os:"ios", os_version:"8.3", browser:"iphone", device:"iPhone 6", browser_version:null },
    { project, build, os:"ios", os_version:"9.1", browser:"iphone", device:"iPhone 6S", browser_version:null },

    { project, build, os:"android", os_version:"4.4", browser:"android", device:"Samsung Galaxy S5", browser_version:null },

    { project, build, os:"android", os_version:"5.0", browser:"android", device:"Google Nexus 5", browser_version:null }
  ]
}
