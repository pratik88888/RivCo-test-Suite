const {test,expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class GlobalSearchPage
{
    constructor(page)
    {
this.page = page;    
this.GlobalSearch = page.locator('#CustomSearch');
this.GlobalSearchresults = page.locator(':text("1 matches found in Case")');
this.GlobalSearchresultview = page.locator('button').filter({ hasText: 'View' }).first();
    }

   async globalSearchnavigate ()
    {
        await this.page.waitForLoadState('networkidle');
         const testData = require('./test-data.json');
         const caseToLookup = testData.caseNumber;        
        await this.GlobalSearch.pressSequentially(caseToLookup);
        // await this.page.keyboard.press('Enter');
        await this.GlobalSearchresults.click();
        await this.page.waitForLoadState('networkidle');
        await this.GlobalSearchresultview.click();
        await this.page.waitForLoadState('networkidle');

    }
    
} 
module.exports = {GlobalSearchPage};