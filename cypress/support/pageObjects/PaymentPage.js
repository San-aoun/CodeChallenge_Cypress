class PaymentPage
{

    getExpansion()
    {
        return cy.get('mat-expansion-panel-header[role="button"]').find('mat-panel-title')
    }
    getNameCard()
    {
        return cy.get('input[type="text"]')
    }
    getNumberCard()
    {
        return cy.get('input[type="number"]')
    }
    getSubmitAddCard()
    {
        return cy.get('#submitButton')
    }
    getSubmitButton()
    {
        return cy.get('#submitButton')
    }
    getRedioBtton()
    {
        return cy.get('input[class="mat-radio-input"]')
    }
    getProcessToReview()
    {
        return cy.get('button[aria-label="Proceed to review"]')
    }
    getConfirmOrder()
    {
        return cy.get('button[id="checkoutButton"]')
    }
}

export default PaymentPage;