
class LoginPage

{
constructor(page)
    {

this.UserName = page.locator('#Username');
this.PassWord = page.locator('#Password');
this.SignIn = page.getByRole('button', { name: 'Login' })
    }

async validatelogin(username,password)
{
await this.UserName.fill(username);
await this.PassWord.fill(password);
await this.SignIn.click();
}
    
}
module.exports = {LoginPage};