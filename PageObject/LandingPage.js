const {test,expect} = require('@playwright/test');
class LandingPage

{

constructor(page)
{
    this.page = page;
    this.link = page.getByRole('link', { name: 'Registration | Login' }).first();
}
    async goto ()
{
 await this.page.setViewportSize({ width: 1920, height: 1080 });
 await this.page.goto ("https://rivcoce-uat.3diengage.com/");
 await expect(this.page).toHaveTitle("County of Riverside | Code Enforcement");
 await this.link.click();
 
}
}
module.exports = {LandingPage};