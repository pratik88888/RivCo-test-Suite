const {test,expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');
class CaseDetailsPage


{

    constructor(page)
    {
this.page = page;
this.Citizendashboard = page.locator('span:has-text("Citizen Dashboard")');
this.MyCases = page.locator(':text-is("My Cases")');
this.CaseNumberfilter = page.locator("//input[@title='Case Number']")
this.CaseNumberresult = page.locator(`//tr[td[5][contains(., 'Open')]]//td[1]//a`);
this.CasedetailsPage = page.locator('strong:visible').last();
this.banner = page.locator('li.cust-nav-tab:visible');
this.rightpanelanddetails = page.locator('li.list-group-item');
this.Actions = page.locator('#dropdownHeaderMenuLink');
this.CaseActionOptions = page.locator('button.dropdown-item.CaseHeaderExecuteCaseTransition');
this.Acceptaction = page.locator('button:has-text("Accept")');
this.ReferOutaction = page.locator('button:has-text("Refer Out")');
this.Submitbutton = page.locator('input[type="submit"]');
this.scheduleaction = page.locator('button:has-text("Schedule")');
this.ValidationList2 = page.locator('span.text-danger.field-validation-error');
this.InspectionTypedropdown = page.locator('select.form-control:visible').first();
this.AssignedTodropdown = page.locator('button.multiselect.dropdown-toggle.custom-select');
this.AssignedToUser = page.locator('input.form-control.multiselect-search:visible');
this.Calendarbutton = page.locator(".input-group-addon.button-cal");
this.ScheduleComment = page.locator('#Controls_0__ScheduleInspection_Comment');
this.DurationDropdown = page.locator('select.form-control:visible').last();
this.Inspectnowaction = page.getByText('Inspect Now', { exact: true });
this.AddViolation = page.getByText('Add Violation', { exact: true });
this.AddViolationbutton = page.locator('button:has-text("Add Selected Violations")')
this.AddCommentForViolationAction = page.locator('[id*="btnComment_"]');
this.AddCommentforViolation = page.locator('textarea.Comment.k-content.k-raw-content')
// Target the frame, then locate the editable body element inside it//
this.kendoFrame = this.page.frameLocator('iframe.k-content');
this.AddimageforViolationaction = page.locator('[id*="btnPhoto_"]');
this.AddimageforViolation = page.locator("//input[@id='upload_Files']");
this.AddCommentforViolationSavebutton = page.locator('#btnSaveAdHocComments');
this.AddimageforViolationsSavebutton = page.locator('#btnSaveAdHocDocument');
this.ViolationSubmit = page.locator('#btnInspectNow');
this.AddComplianceDays = page.locator('#ddlComplianceDays');
this.ComplianceDate = page.locator('#lblComplianceDate');
this.ScheduleReinspection = page.locator('label:has-text("No - Schedule Re-inspection")')
this.Inspectiontime = page.locator('[name="DurationMinute"]');
this.InspectionSummarySubmit = page.locator('button').filter({ hasText: 'Submit' }).last();
this.SuccessOkbutton = page.getByRole('button', { name: 'Ok' });
this.ReferoutAgencyDropdown =page.locator('button.multiselect.dropdown-toggle.custom-select');
this.ReferoutAgencySearch = page.locator('input.form-control.multiselect-search:visible');
this.ReferoutAgencySearchlist = page.locator('ul.multiselect-container.dropdown-menu.show');


    }

    async gotoCaseDetailsPage ()
    {
        await this.Citizendashboard.click();
        await this.page.waitForLoadState('networkidle');
        await this.MyCases.click();
        await this.page.waitForLoadState('networkidle');
        const caseToLookup = process.env.GLOBAL_CASE_NUMBER;
        await this.CaseNumberfilter.fill(caseToLookup);
        await this.page.keyboard.press('Enter');
        await this.CaseNumberresult.first().click();
    }

async validaterightpanelanddetailstab() {
    await this.page.waitForLoadState('networkidle');
    const rightpanelanddetailsfulldata = await this.rightpanelanddetails.allTextContents();

    // 1. Direct, robust element targeting using the explicit IDs from your HTML
    const selectedPriority = await this.page.locator('#LutCasePriorityId').evaluate(el => el.options[el.selectedIndex]?.text || '').catch(() => '');
    const selectedSource = await this.page.locator('#Source').evaluate(el => el.options[el.selectedIndex]?.text || '').catch(() => '');

    const seenLabels = [];

    const rightpanelanddetails = rightpanelanddetailsfulldata.map(item => {
        let clean = item.replace(/\s+/g, ' ').trim();

        // 2. Inject colons for primary unique labels
        clean = clean.replace(/^(Address|Unit|Internal Workflow Status|Priority|Submitted By|Created Date|Updated Date|Source|Assignee\(s\))(?!\s*:)/, (match, p1) => {
            if (p1 === 'Address' && clean.startsWith('Address Notes')) {
                return match; 
            }
            
            if (!seenLabels.includes(p1)) {
                seenLabels.push(p1);
                return p1 + " :"; 
            }
            return match;
        });

        // 3. Match and format options strictly based on the real HTML structure
        return clean.replace(/(Priority|Source)\s*:\s*(.*)/, (match, label, options) => {
            const activeValue = (label === 'Priority' ? selectedPriority : selectedSource).trim();

            // Match exact individual option entries from your HTML file definitions
            let listChoices = [];
            if (label === 'Priority') {
                listChoices = ['Low', 'Normal', 'High', 'Urgent'];
            } else {
                listChoices = ['Android', 'Batch Generation', 'Office', 'Telephone', 'Web', 'iOS'];
            }

            const formattedOptions = listChoices.map(opt => {
                // Precise match tracking against the dynamic selection value
                if (opt.toLowerCase() === activeValue.toLowerCase()) {
                    return `[*${opt}*]`;
                }
                return `[${opt}]`;
            }).join(' ');

            return `${label} : ${formattedOptions}`;
        });
    }).filter(Boolean);

    console.log('-----------------------------------------'); 
    console.log("Extracted Right Panel View and Details Tab: "); 
    console.log(rightpanelanddetails);
    console.log('-----------------------------------------'); 
}

async acceptflow ()
{
        await this.Actions.click();
        console.log('--- Actions ---');
        console.log(await this.CaseActionOptions.allTextContents());
        console.log('-----------------------------------------');
        await this.Acceptaction.click();
        await this.Submitbutton.click();
        await this.page.waitForLoadState('networkidle');
}
async scheduleflow (Type,Assignedtouser,ScheduleComment,duration)
{
        await this.Actions.click();
        console.log('--- Actions ---');
        console.log(await this.CaseActionOptions.allTextContents());
        console.log('-----------------------------------------');
        await this.scheduleaction.click();
        await this.InspectionTypedropdown.selectOption({ label: "Select" });
        await this.Submitbutton.click();
        await expect(this.ValidationList2).toHaveText(['Inspection Type is required', 'Assigned To is required', 'Schedule For is required']);
        await this.InspectionTypedropdown.selectOption({ label: Type });
        await this.AssignedTodropdown.click();
        await this.AssignedToUser.fill(Assignedtouser);
        await this.page.getByLabel(Assignedtouser).click();
        await this.page.mouse.click(0, 0);
        await this.Calendarbutton.click();
        await this.page.mouse.click(0, 0);
        await this.DurationDropdown.selectOption({ label: duration });
        await this.ScheduleComment.fill(ScheduleComment);
        await this.Submitbutton.click();
        await this.page.waitForLoadState('networkidle');
}

async inspectionflow (violationtext,violationcomment)
{
        await this.Actions.click();
        console.log('--- Actions ---');
        console.log(await this.CaseActionOptions.allTextContents());
        console.log('-----------------------------------------');
        await this.Inspectnowaction.click();
        await this.AddViolation.click();
        await this.page.locator(`label:has-text("${violationtext}")`).click();
        await this.AddViolationbutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.AddCommentForViolationAction.first().click();

        // Kendo UI Editor//
        this.kendoEditableBody = this.kendoFrame.locator('body#body, body[contenteditable="true"]');
       // Wait for the iframe container/wrapper to fully render on the page
        await this.page.locator('iframe.k-content').waitFor({ state: 'visible' });

       // Clear and fill the editable body inside the iframe
        await this.kendoEditableBody.clear();
        await this.kendoEditableBody.fill(violationcomment);
        await this.AddCommentforViolationSavebutton.click();

        await this.AddimageforViolationaction.first().click();
        await this.AddimageforViolation.setInputFiles('C:/Users/idc552/Desktop/New Project/Violation1.jpg');
        await this.AddimageforViolationsSavebutton.click();
        await this.ViolationSubmit.click();

        await this.page.waitForLoadState('networkidle');
        await this.AddComplianceDays.selectOption({ label: '10' });
        await this.page.waitForLoadState('networkidle');
        console.log(await this.ComplianceDate.textContent());
        await this.ViolationSubmit.click();
        await this.ScheduleReinspection.click();
        await this.ViolationSubmit.click();
        await this.Inspectiontime.selectOption({ label: '10 mins' });
        await this.InspectionSummarySubmit.click();
        await this.SuccessOkbutton.click();
}

async casedetailspagebanner() 
{
    await this.page.waitForSelector('li.cust-nav-tab', { state: 'visible', timeout: 10000 });
    const tabs = this.page.locator('li.cust-nav-tab');
    const count = await tabs.count();
    const allTexts = [];

    for (let i = 0; i < count; i++) {
        const tab = tabs.nth(i);
        
        // Dynamically find the first element node (typically the label) and the last/next element node (the value)
        // If they use specific child tags like span or div, you can replace '*' with 'span' or 'div'
        const labelEl = tab.locator('*').first();
        const valueEl = tab.locator('*').last();

        const labelText = (await labelEl.innerText()).trim();
        const valueText = (await valueEl.innerText()).trim();

        // Prevent duplicating text if the tab doesn't have child nodes
        if (labelText && valueText && labelText !== valueText) {
            allTexts.push(`${labelText}: ${valueText}`);
        } else {
            // Fallback for single-text items
            allTexts.push(await tab.innerText());
        }
    }

    console.log('--- Case Details Banner ---');
    console.log(allTexts);
    console.log('-----------------------------------------'); 
}

async referoutflow (AgencyName)
{
        await this.Actions.click();
        console.log('--- Actions ---');
        console.log(await this.CaseActionOptions.allTextContents());
        console.log('-----------------------------------------');
        await this.ReferOutaction.click();
        await this.ReferoutAgencyDropdown.click();
        await this.ReferoutAgencySearch.fill(AgencyName);
        await this.ReferoutAgencySearchlist.click();
        await this.Submitbutton.click();
        
        await this.page.waitForLoadState('networkidle');
}

}
module.exports = {CaseDetailsPage};

