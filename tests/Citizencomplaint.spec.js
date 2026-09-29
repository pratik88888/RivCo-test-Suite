const {test,expect} = require('@playwright/test');
const { POManager } = require('../PageObject/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/Citizencomplainttestdata.json")));



test('Citizencomplaint @T282bed2d', async ({browser})=>
{
 test.setTimeout(180000);
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
 await createcasePage.address(dataset.address,dataset.unitnumber);
 await createcasePage.duplicatecheck();
 await createcasePage.map();
 
 await createcasePage.otherdetails(dataset.addressnotes,dataset.violationtype,dataset.description);
 await createcasePage.captureAndSaveCaseNumber();

 const casedetailsPage = poManager.getcaseDetailsPage();
 await casedetailsPage.gotoCaseDetailsPage();
 await casedetailsPage.casedetailspagebanner();
//  await casedetailsPage.validaterightpanelanddetailstab();

});