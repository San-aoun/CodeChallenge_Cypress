class HomePage
{
    getBarAccount()
    {
        return cy.get('#navbarAccount')
    }
    getCloseWelcomeBanner()
    {
        return cy.get('[aria-label="Close Welcome Banner"]')
    }
    getAddButton()
    {
        return  cy.get('button[aria-label="Add to Basket"]')
    }
    getListProduct()
    {
        return cy.get('.mat-grid-tile.ng-star-inserted')
    }
    getSearchTabe()
    {
        return  cy.get('#searchQuery')
    }
    getSearchType()
    {
        return cy.get('input[type="text"]')
    }
}

export default HomePage;
