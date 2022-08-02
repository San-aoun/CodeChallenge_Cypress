class BasketPage
{
    getClickBasket()
    {
        return cy.get('button[routerlink="/basket"]')
    }
    getCheckOut()
    {
        return cy.get('#checkoutButton', { timeout: 10000 }).should('be.visible');
    }
}

export default BasketPage;
