const { LandingPage } = require('../PageObject/LandingPage');
const { LoginPage } = require('../PageObject/LoginPage');
const { DashboardPage } = require('../PageObject/DashboardPage');
const { CreateCasePage } = require('../PageObject/CreateCasePage');
const { CaseDetailsPage } = require('../PageObject/CaseDetailsPage');
const { GlobalSearchPage } = require('../PageObject/GlobalSearchPage');

class POManager
{
    constructor(page)
    {
      this.page = page;
      this.landingPage = new LandingPage(this.page);
      this.loginPage = new LoginPage(this.page);
      this.dashboardPage = new DashboardPage(this.page);
      this.createCasePage = new CreateCasePage(this.page);
      this.caseDetailsPage = new CaseDetailsPage(this.page);
      this.globalSearchPage = new GlobalSearchPage(this.page);
    }

    getlandingPage ()
    {
        return this.landingPage;
    }

   getloginPage ()
    {
        return this.loginPage;
    }

     getdashboardPage ()
    {
        return this.dashboardPage;
    }

     getcreateCasePage ()
    {
        return this.createCasePage;
    }

     getcaseDetailsPage ()
    {
        return this.caseDetailsPage;
    }

    getglobalsearchpage ()
    {
        return this.globalSearchPage;
    }
    
    }
module.exports = {POManager};