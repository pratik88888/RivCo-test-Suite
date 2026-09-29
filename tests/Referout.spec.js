const {test,expect} = require('@playwright/test');
const { POManager } = require('../PageObject/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/Stafftestdata.json")));



test('Referout', async ({browser})=>
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

     const globalsearchPage = poManager.getglobalsearchpage();
     await globalsearchPage.globalSearchnavigate();

     const casedetailsPage = poManager.getcaseDetailsPage();
     await casedetailsPage.referoutflow(dataset.AgencyName);
     
     await casedetailsPage.casedetailspagebanner();
     await casedetailsPage.validaterightpanelanddetailstab();


     });