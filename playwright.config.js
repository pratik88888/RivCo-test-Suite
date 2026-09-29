const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 1. Global setup file path
globalSetup: require('path').join(__dirname, 'tests', 'global-setup.js'),

  // 2. Test directory configuration
  testDir: './tests',
  timeout: 300 * 1000,
  
  expect: {
    timeout: 80 * 1000,
  },
  
  reporter: 'html',

  // 3. Shared settings for all projects
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
    args: ['--start-maximized'],
    launchOptions: {
      slowMo: 0, // Introduces a 1000ms delay between actions
      

reporter: [
    ['list'], // Keeps console output
    ['@testomatio/reporter'] // Sends results to your dashboard
  ]
      
    },
  }
});
