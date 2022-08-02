/// <reference types="cypress" />

describe('When the User logIn and action with activities', function()  
{ 
    beforeEach(()=>
    {
        cy.fixture('example').then(function(data)
        {
            this.data=data
        })
            
        cy.userGoToURL(Cypress.env('BaseUrl'))
        cy.userLogin(Cypress.env('UserName'),Cypress.env('Password'))
    })
    it('Then the user added one item to the basket, click on checkout, add a new address, fill in the address form should click on submit.', function() 
    {
        cy.additemToBasket(this.data.appleProduct);
        cy.checkOutProduct();
        cy.log(this.data.Addressdata.country)
        cy.CreateNewAddress(
            this.data.Addressdata.country,
            this.data.Addressdata.name,
            this.data.Addressdata.mobileNumber,
            this.data.Addressdata.zip,
            this.data.Addressdata.address,
            this.data.Addressdata.city,
            this.data.Addressdata.state
            );
        cy.chooseAddress(this.data.name)
        cy.chooseDeliverySpeed(this.data.deliverySpeed)
        cy.addCreditCardandSubmit(
            this.data.Creaditdata.name,
            this.data.Creaditdata.creditCardNumber,
            this.data.Creaditdata.cexpireMonth,
            this.data.Creaditdata.cexpireYear
            );
        cy.confirmOrder()

      });
    it('Then the user added two items to your basket, click on checkout, add a new address, fill in the address form should click on submit.', function() 
    {
        cy.additemToBasket(this.data.ProductData.appleProduct);
        cy.additemToBasket(this.data.ProductData.bananaProduct);
        cy.checkOutProduct();
        cy.CreateNewAddress(
            this.data.Addressdata.country,
            this.data.Addressdata.name,
            this.data.Addressdata.mobileNumber,
            this.data.Addressdata.zip,
            this.data.Addressdata.address,
            this.data.Addressdata.city,
            this.data.Addressdata.state
        );
        cy.chooseAddress(this.data.name)
        cy.chooseDeliverySpeed("One Day Delivery")
        cy.addCreditCardandSubmit(
            this.data.Creaditdata.name,
            this.data.Creaditdata.creditCardNumber,
            this.data.Creaditdata.cexpireMonth,
            this.data.Creaditdata.cexpireYear
            );
        cy.confirmOrder()
    });
    it("Then the user searched for apple, verify that 2 apple products show up should that banana product doesn't show up", function() 
    {
        cy.searchProduct("Apple");
        cy.verifyProductItemShouldnotInclude(" Banana Juice (1000ml) ");
    });
});