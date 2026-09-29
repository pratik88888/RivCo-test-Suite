
class DashboardPage
{
    constructor(page)
    {
this.page = page;
this.dashboardPageLoad =  page.locator('span.text.CaseNumberWid').last();
this.Dashboard =  page.locator('span.text.CaseNumberWid');
this.RecordCount = page.locator('span.recordcount:visible');
this.Resetfilter =  page.locator("//button[@id='btnClearExternalFilterCriteria']//*[name()='svg']");

    }

async defaultdashboard ()
{
 // Dashboard default View //
await this.dashboardPageLoad.waitFor({ state: 'attached' });

//Dashboard report with default filter //
 var DashboardData = await this.Dashboard.allTextContents();
 var RecordCountData = await this.RecordCount.allTextContents();
var Count = RecordCountData.map(item => {
    var match = item.match(/\d+/g); 
    return match ? parseInt(match.join(''), 10) : null;
  })
var DashboardReport = DashboardData.map((key, index) => {
    return { [key]: Count[index] };
});
console.log("Default dashboard view"); 
console.log(DashboardReport);
console.log('-----------------------------------------'); 
}

async dashboardwithoutfilter ()
{
//Dashboard report without filter //
await this.Resetfilter.click();
await this.page.waitForLoadState('networkidle');
var DashboardData = await this.Dashboard.allTextContents();
var RecordCountData = await this.RecordCount.allTextContents();
//  var Count = RecordCount.filter(item => typeof item === 'number');
var Count = RecordCountData.map(item => {
    var match = item.match(/\d+/g); 
    return match ? parseInt(match.join(''), 10) : null;
  })
var DashboardReport = DashboardData.map((key, index) => {
    return { [key]: Count[index] };
});
console.log("Dashboard View after reset filter"); 
console.log(DashboardReport); 
console.log('-----------------------------------------'); 
}
}
module.exports = {DashboardPage};
