const { When, Then, Given } = require('@cucumber/cucumber')
const {test,expect} = require('@playwright/test');
const { POManager } = require('../../tests/PageObject/POManager.spec');
const {playwright} = require('@playwright/test');
const { chromium } = require('@playwright/test'); 
const dataset = JSON.parse(JSON.stringify(require("../../utils/Citizencomplainttestdata.json")));
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(30000); 



Given('Navigate to login page', async function () {
   this.browser = await chromium.launch({ headless: false });   
   const context = await this.browser.newContext();
   const page = await context.newPage();
    this.poManager = new POManager(page);
   const landingPage = this.poManager.getlandingPage();
   await landingPage.goto();
});

When('A citizen login to Code Enforcement system web portal with {string} and {string}', async function (UserName, PassWord) {
    const loginPage = this.poManager.getloginPage();
   //  console.log (await this.page.title());
    await loginPage.validatelogin(dataset.UserName,dataset.PassWord);
});

// Then('System grants access to the Citizen dashboard', async function () {
//     const dashboardPage = this.poManager.getdashboardPage();
//     await dashboardPage.defaultdashboard();
// });


When('A citizen navigate to create case page and provide {string}, {string}, {string}', async function (servicetype, address, unitnumber) {
   const createcasePage = this.poManager.getcreateCasePage();
   await createcasePage.address(dataset.servicetype,dataset.address,dataset.unitnumber);
});

Then('System verify duplicate check, Location check and map view', async function () {
   const createcasePage = this.poManager.getcreateCasePage();
   await createcasePage.duplicatecheck();
   await createcasePage.map();
});

When('A citizen provide {string}, {string}, {string} with contact details and violation document and submit case.', async function (addressnotes, violationtype, description) {
   const createcasePage = this.poManager.getcreateCasePage();
   await createcasePage.otherdetails(dataset.addressnotes,dataset.violationtype,dataset.description);
});

Then('New case is created with Unique Case Number.', async function () {
  const createcasePage = this.poManager.getcreateCasePage();
  await createcasePage.successpage();
});
