const {test,expect} = require('@playwright/test');
const { POManager } = require('../PageObject/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/Stafftestdata.json")));



test('Staffcomplaint @T08bee1cc', async ({browser})=>
{
 const context = await browser.newContext();
 const page = await context.newPage();

 // Page wise//
const poManager = new POManager(page);
const landingPage = poManager.getlandingPage();
 await landingPage.goto();

 const loginPage = poManager.getloginPage();
 console.log (await page.title());
 await loginPage.validatelogin(dataset.UserName,dataset.PassWord);

 const dashboardPage = poManager.getdashboardPage();
 await dashboardPage.defaultdashboard();

 const createcasePage = poManager.getcreateCasePage();

 await createcasePage.servicetype(dataset.servicetype);
 await createcasePage.apn(dataset.apn);
 await createcasePage.otherdetails(dataset.addressnotes,dataset.violationtype,dataset.description);
 await createcasePage.captureAndSaveCaseNumber();

 const globalsearchPage = poManager.getglobalsearchpage();
 await globalsearchPage.globalSearchnavigate();

 const casedetailsPage = poManager.getcaseDetailsPage();
 await casedetailsPage.casedetailspagebanner();
 await casedetailsPage.validaterightpanelanddetailstab();

});