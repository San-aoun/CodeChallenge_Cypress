
class AddressPage
{

    getAddNewAdress()
    {
        return cy.get('button[routerlink="/address/create"]', { timeout: 10000 }).should('be.visible')
    }
    getInputCountry()
    {
        return  cy.get('input[data-placeholder="Please provide a country."]')
    }
    getInputName()
    {
        return  cy.get('input[data-placeholder="Please provide a name."]')
    }
    getInputZip()
    {
        return  cy.get('input[data-placeholder="Please provide a ZIP code."]')
    }
    getInputCity()
    {
        return  cy.get('input[data-placeholder="Please provide a city."]')
    }
    getInputState()
    {
        return  cy.get('input[data-placeholder="Please provide a state."]')
    }
    getTextAreaAddress()
    {
        return cy.get('textarea')
    }
    getMobileNumber()
    {
        return cy.get('input[data-placeholder="Please provide a mobile number."]')
    }
    getSubmit()
    {
        return cy.get('#submitButton')
    }
    getListDetails()
    {
        return cy.get('.mat-cell.cdk-cell.cdk-column-Name.mat-column-Name.ng-star-inserted')
    }
    getredioSelectDetail()
    {
        return cy.get('.mat-radio-button.mat-accent')
    }
    getButtonProcessPayment()
    {
        return cy.get('button[aria-label="Proceed to payment selection"]')
    }
    getButtonProcessDelivery()
    {
        return cy.get('button[aria-label="Proceed to delivery method selection"]')
    }
}

export default AddressPage;