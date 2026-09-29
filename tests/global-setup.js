const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('Global setup is running...');
  // Add your setup logic here (e.g., authentication, database seed)
}

module.exports = globalSetup;
