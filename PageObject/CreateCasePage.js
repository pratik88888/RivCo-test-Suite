 const {test,expect} = require('@playwright/test');
 const fs = require('fs');
 const path = require('path');

class CreateCasePage

{

constructor(page)

{
     this.page = page;
     this.CreateCase = page.getByRole('link', { name: 'Create Case' });
     this.ValidationList = page.locator('[id*="error"]:not(.text-danger):not(.error)');
     this.servicetypeselection = page.locator(".Sr-titile")
     this.Addressradiobutton = page.locator('label').filter({ hasText: 'Address' }).nth(1);
     this.APNradiobutton = page.locator('label').filter({ hasText: 'Parcel Number/APN' }).nth(1);
     this.Address = page.getByRole('textbox', { name: 'Address' }).nth(0);
     this.APNtextbox = page.getByRole('textbox', { name: 'Parcel Number/APN' });
     this.AddressResults = page.locator(".pac-container.pac-logo");
     this.VerifyLocation = page.locator('#verifySRLocation');
     this.VerifyAPN = page.getByRole('button', { name: 'Verify' });
     this.ParcelNumber = page.locator("p[class='Gisbgcolor']");
     this.duplicateModal = page.locator('#duplicateCasesDisplayDiv');
     this.ContinueButtonDuplicatecheck= page.locator('#btnContinueServiceRequest');
     this.LocationInfoMessage = page.locator('.text-success');
     this.UnitNumber = page.getByRole('textbox', { name: 'Unit Number' });
     this.Maplocation = page.locator('area[shape="poly"]');
     this.Addressnotes = page.getByRole('textbox', { name: 'Address Notes' });
     this.violationdropdown = page.locator('button.multiselect.dropdown-toggle.custom-select:visible');
     this.violationtype = page.locator('input.form-control.multiselect-search');
     this.description = page.getByRole('textbox', { name: 'Description' });
     this.usecontact = page.getByLabel('Use contact information from my profile');
     this.upload = page.locator('input[type="file"]');
     this.submitcase = page.locator('input[type="submit"]');
     this.SuccessMessage = page.locator('p.successfullytext');
     this.CaseNumberMessage = page.locator('p.successfullysubtext').first();

     
}

async servicetype (servicetype)
{
//Create Case //
await this.CreateCase.click();
await this.page.waitForLoadState('networkidle');

//Service Type//
await this.page.getByRole('combobox', { name: 'Service Request Type' }).click();
await this.page.getByRole('option', { name: servicetype}).click();
console.log("Service Type: " + await this.page.locator(".Sr-titile").textContent());

//Validation//
await this.submitcase.click();
await expect(this.ValidationList).toHaveText(['Property Address or Parcel Number/APN is required', 'Description is required', 'First Name is required', 'Last Name is required', 'Email is required', 'Phone Number is required']);
//Search by Property Address or Parcel Number/APN is required//

}


async address (address,unitnumber)
{
//Property identification //
await this.Addressradiobutton.click();
const textValue = await this.Addressradiobutton.inputValue();
console.log("Request Violation on: " + textValue);

//Address //
await this.Address.click();
await this.Address.pressSequentially(address, { delay: 150 });
await this.AddressResults.waitFor({ state: 'visible', timeout: 10000 });
const addresses = await this.page.locator('.pac-container .pac-item').evaluateAll(elements => {
    return elements.map(item => {
        const spans = Array.from(item.querySelectorAll(':scope > span:not(.pac-icon)'));
        
        return spans
            .map(span => span.textContent ? span.textContent.trim() : '')
            .filter(Boolean)
            .join(', ');
    });
});

console.log('--- Address Autocomplete Results Array ---');
console.log(addresses); 
console.log('-----------------------------------------');

//Just Click the First Suggestion//
await this.page.locator('.pac-container .pac-item').first().click();

await this.page.waitForLoadState('networkidle');
console.log ("Selected Address: " + await this.Address.getAttribute('value')); // Need to Get exact Address //

//Location //
await expect(this.page.locator(':text("Location is not verified")')).toBeVisible("Location is not verified");
await this.VerifyLocation.click();

// Unit Number//
await this.UnitNumber.fill(unitnumber);

}

async duplicatecheck() {
    await this.page.waitForTimeout(15000);

    const foundElements = await this.page.locator(':has-text("Duplicate Check")').allTextContents();
  
    const dynamicHeader = this.page.locator('text=Duplicate Check').first();

    if (await dynamicHeader.isVisible({ timeout: 4000 })) {
        console.log("Duplicate check Pop-up appears, Clicking continue...");
        await this.ContinueButtonDuplicatecheck.click();
        await this.page.waitForTimeout(1000);
    } else {
        console.log("Duplicate check Pop-up did not appear. Moving on.");
    }

    const textContent = await this.page.locator('.text-success').first().textContent();
    console.log(`Current Text Success Message: ${textContent}`);

    await expect(this.page.locator('.text-success').first()).toHaveText(
        /The given location is valid within the service area.|Duplicate cases exist against this service location./
    );
}

async map()
{
//  //Map Location //
const ActualAddress = await this.Maplocation.getAttribute('title');
  // SAVE TO GLOBAL ENV VARIABLE HERE //
//  process.env.GLOBAL_Address = ActualAddress;
console.log("Map location: " + await this.Maplocation.getAttribute('title'));
// return ActualAddress;
}

async apn(apn)
{
//Property identification //
await this.APNradiobutton.click();
const textValue = await this.APNradiobutton.inputValue();
console.log("Request Violation on: " + textValue);

//APN //
await this.APNtextbox.click();
await this.APNtextbox.fill(apn);
await this.VerifyAPN.click();
await expect(this.page.locator('span:has-text("The given APN is valid within the service area.")')).toHaveText( /The given APN is valid within the service area./)


}

async otherdetails (addressnotes,violationtype,description)
{
  await this.Addressnotes.fill(addressnotes);

// Violation Type//
await this.violationdropdown.click();
await this.violationtype.fill(violationtype);
const violationtypeselection = this.page.locator('label').filter({ hasText: violationtype });
await violationtypeselection.click();
console.log("Violation type: " + await this.page.locator(".multiselect-selected-text").textContent());

// Description //
await this.description.fill(description);

// Contact //
await this.usecontact.focus();
await this.page.keyboard.press('Space');

// Upload Pictures/Documents //
await this.upload.setInputFiles('C:/Users/idc552/Desktop/New Project/Violation.jpg');
const fullText = await this.page.locator('.k-namesizemain').textContent();
const singleLineText = fullText.replace(/\s+/g, ' ').trim();
console.log("Violation document: " + singleLineText);

// Submit Case //
await this.submitcase.click();

}

async captureAndSaveCaseNumber() {

// Wait for the success message with a strict 10-second timeout limit
await this.SuccessMessage.waitFor({ state: 'visible', timeout: 10000 });
console.log("Success Text: " + await this.SuccessMessage.textContent());
    
    // Take an actual screenshot before extraction
    await this.page.screenshot({ path: 'case-created.png' });

    // Get Case Number Text
    const actualCaseNumberText = await this.CaseNumberMessage.textContent();
    const CaseNumber = actualCaseNumberText.split(' ')[6];
    console.log("Extracted Case Number: " + CaseNumber);
    const resolvedPath = path.join(__dirname, '..', '..', 'test-data.json');
    fs.writeFileSync(path.join(__dirname, 'test-data.json'), JSON.stringify({ caseNumber: CaseNumber.trim() }));     
    // Save to the environment variable for subsequent test files to read
    process.env.GLOBAL_CASE_NUMBER = CaseNumber; 

    return CaseNumber;
}

}
module.exports = { CreateCasePage };
