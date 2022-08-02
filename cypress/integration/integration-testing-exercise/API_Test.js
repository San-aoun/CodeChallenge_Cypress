/// <reference types="cypress" />

describe('When the User logIn and action with activities', () => {

    beforeEach(()=>
    {
        cy.clearCookies({ domain: null })
        cy.getAccessToken();
    })

    it('The user added 1 item to the basket should verify that 1 item is in the basket', function() 
    {
      cy.createBusket(1,1).should((resp) => {
        cy.log(resp)
        expect(resp.status).to.eq(200)
      });
      cy.getBusketItem()
      .then((resp) => {
          expect(resp.body.status).to.eq("success")
          expect(resp.body.data.ProductId).to.eq(1)
          expect(resp.body.data.id).to.eq(6)
          expect(resp.body.data.quantity).to.eq(1)});

    });

    it('The user updated item instead should verify that 2 item is in the basket', function() {
      cy.updateBusket(1,1).then(resp => {
        expect(resp.status).to.eq(200)
      });
      cy.getBusketItem()
      .then((resp) => {
        expect(resp.body.status).to.eq("success")
        expect(resp.body.data.ProductId).to.eq(1)
        expect(resp.body.data.id).to.eq(6)
        expect(resp.body.data.quantity).to.eq(2)});
      
    });

    it('The user deleted item and validate should only 1 item remains in the basket', function() 
    {
      cy.deleteBusket(1).then(resp => {
        expect(resp.status).to.eq(200)
      });
      cy.getBusketItem()
      .then((resp) => {
        expect(resp.body.status).to.eq("success")
        expect(resp.body.data.ProductId).to.eq(1)
        expect(resp.body.data.id).to.eq(6)
        expect(resp.body.data.quantity).to.eq(1)});
});
});




