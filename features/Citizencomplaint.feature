Feature: 

  Scenario: A citizen(Complainant) logs into the portal, submits a complaint(case), and the system auto-assigns it to the appropriate Code Enforcement Department officer for further action.
    Given Navigate to login page
    When A citizen login to Code Enforcement system web portal with "Username" and "Password"
    # Then System grants access to the Citizen dashboard
    When A citizen navigate to create case page and provide "Service Type", "Address", "Unit Number"
    Then System verify duplicate check, Location checcdk and map view
    When A citizen provide "Address Notes", "Violation Type", "Description" with contact details and violation document and submit case.
    Then New case is created with Unique Case Number.
