import "cypress-localstorage-commands";
import HomePage from "./pageObjects/HomePage";
import LogInPages from "./pageObjects/LogInPage";
import BasketPage from "./pageObjects/BasketPage";  
import AddressPage from "./pageObjects/AddressPage";  
import PaymentPage from "./pageObjects/PaymentPage";  

// API Test //
Cypress.Commands.add('getAccessToken', () => {
    cy.request({
        method: 'POST',
        url: 'https://juice-shop.guardrails.ai/rest/user/login', //get from cypress.env.json
        form: true, //sets to application/x-www-form-urlencoded
        body: {
          email: 'piyathida.sanaoun01@gmail.com',
          password: '123456',
        }
      }).then(resp => {
        if (resp.status === 200) {
            const accessToken = { token: resp.body };
            cy.writeFile("cypress/fixtures/token.json", accessToken);
        }   
    });
});
Cypress.Commands.add('createBusket', (productId,quantity) => {
    cy.fixture('token.json').then((accToken) => {
		cy.request({
			method: "PUT",
			url: 'https://juice-shop.guardrails.ai/api/BasketItems/',
			failOnStatusCode: false,
			headers: {
				Authorization: `Bearer ${JSON.stringify(accToken.token.authentication.token)}`
			},
			body: {
                BasketId: `${JSON.stringify(accToken.token.authentication.bid)}`,
                ProductId: productId,
                quantity: quantity
              },
		})
	});
});
Cypress.Commands.add('updateBusket', (productId,quantity) => {
        cy.fixture('token.json').then((accToken) => {
            cy.request({
                method: "PUT",
                url: `https://juice-shop.guardrails.ai/api/BasketItems/${productId}`,
                failOnStatusCode: false,
                headers: {
                    
                    Authorization: `Bearer ${JSON.stringify(accToken.token.authentication.token)}`
                },
                body: {
                    quantity: quantity
                  },
            })
        });
});
Cypress.Commands.add('getBusketItem', () => {
    cy.fixture('token.json').then((accToken) => {
		cy.request({
			method: "GET",
            url:`https://juice-shop.guardrails.ai/rest/basket/${JSON.stringify(accToken.token.authentication.bid)}`,
			failOnStatusCode: false,
			headers: {
				Authorization: `Bearer ${JSON.stringify(accToken.token.authentication.token)}`
			},

		})
        .then(resp => {
            if (resp.status === 200) {
                const data = { data: resp.body };
                cy.writeFile("cypress/fixtures/getBusket.json", data);
            }  
	});
});
});
Cypress.Commands.add('deleteBusket', (productId) => {
    cy.fixture('token.json').then((accToken) => {
        cy.log(accToken.token.authentication.token)
		cy.request({
			method: "DELETE",
            url: `https://juice-shop.guardrails.ai/api/BasketItems/${productId}`,
			failOnStatusCode: false,
			headers: {
				Authorization: `Bearer ${JSON.stringify(accToken.token.authentication.token)}`
			},

		})
	});
});

// UI Test //
Cypress.Commands.add('userGoToURL',(url)=>
{
    var homePage = new HomePage()
    cy.visit('https://juice-shop.guardrails.ai')
    homePage.getCloseWelcomeBanner().click({timeout: 20000})
})
Cypress.Commands.add('userLogin',(user,password)=>
{
    var homePage = new HomePage()
    var loginPage = new LogInPages()

    homePage.getBarAccount().click({ force: true })
    loginPage.getBarLogin().click({ force: true })
    loginPage.getTypeEmail().type('piyathida.sanaoun01@gmail.com');
    loginPage.getTypePassword().type('123456');
    loginPage.getButtonLogin().click({ force: true })
})
Cypress.Commands.add('additemToBasket',(productName)=>
{
    var homePage = new HomePage()
    homePage.getListProduct().each(($el, index, $list) => {
        if($el.text().includes(productName))
        {
            homePage.getAddButton()
            .eq(index)
            .trigger("click",{force: true}, {timeout: 20000});
        }
    })
})
Cypress.Commands.add('checkOutProduct',()=>
{
    var basket = new BasketPage()
    basket.getClickBasket().trigger("click",{force: true}, {timeout: 20000});
    basket.getCheckOut().trigger("click",{force: true}, {timeout: 20000});
})
Cypress.Commands.add('CreateNewAddress',(country,name,tel,zip,address,city,state)=>
{
    var address = new AddressPage()
    address.getAddNewAdress().click({ force: true }, {timeout: 20000})
    address.getInputCountry().type(country,{ force: true })
    address.getInputName().type(name,{ force: true })
    address.getInputZip().type(zip,{ force: true })
    address.getMobileNumber().type(tel,{ force: true })
    address.getInputCity().type(city,{ force: true })
    address.getInputState().type(state,{ force: true })
    address.getTextAreaAddress().type('Hello world')

    address.getSubmit().click({ force: true }, {timeout: 20000})
})
Cypress.Commands.add('chooseAddress',(addrName)=>
{
    var address = new AddressPage()
    address.getListDetails().each(($el, index) => {
        if($el.text().includes(addrName))
        {
            address.getredioSelectDetail()
            .eq(index)
            .click({ force: true })
        }
    })
    cy.scrollTo('bottom', { ensureScrollable: false }, {timeout: 20000})
    address.getButtonProcessPayment().trigger("click",{force: true});
})
Cypress.Commands.add('chooseDeliverySpeed',(speed)=>
{
    var address = new AddressPage()
    address.getredioSelectDetail().first().click({ force: true })
    address. getButtonProcessDelivery().trigger("click",{force: true});
})
Cypress.Commands.add('addCreditCardandSubmit',(nameCard,numberCard,expireMonth,expireYear)=>
{
    const payment = new PaymentPage()
    payment.getExpansion().contains('Add new card').click({ force: true }, {timeout: 20000})
    payment.getNameCard().eq(1).type(nameCard,{force: true})
    payment.getNumberCard().type(numberCard,{force: true})
    cy.get('select').eq(0).select(1, { force: true })
    cy.get('select').eq(1).select("2080", { force: true })
    payment.getSubmitAddCard().click({ force: true }, {timeout: 20000})
    payment.getRedioBtton().first().check({ force: true }, {timeout: 20000})
    
    cy.scrollTo('bottom', { ensureScrollable: false }, {timeout: 20000})
    payment.getProcessToReview().trigger("click",{force: true});
   
})
Cypress.Commands.add('confirmOrder',()=>
{
    const payment = new PaymentPage()
    payment.getConfirmOrder().trigger("click",{force: true}, {timeout: 20000})
})
Cypress.Commands.add('searchProduct',(proName)=>
{
    const homepage = new HomePage()
    cy.wait(1000)
    homepage.getSearchTabe().click()
    homepage.getSearchType().type(proName).type('{enter}')
})

// Validation
Cypress.Commands.add('verifyProductItemShouldnotInclude',(proName)=>
{
    cy.get(('.item-name')).each(($el) => {
        const acualtResault= $el.text();
        expect(acualtResault).to.not.equal(proName)
    })
    
})
Cypress.Commands.add('verifyGetBusketItemafterCreate',(status,name,basketId,quantity)=>
{
    cy.fixture('getBusket.json').then((actaulResults) => {
		expect(JSON.stringify(actaulResults.status)).to.eq(status)
        expect(JSON.stringify(actaulResults.status.body.productId.name)).to.eq(name)
        expect(JSON.stringify(actaulResults.status.body.productId.basketId)).to.eq(basketId)
        expect(JSON.stringify(actaulResults.status.body.productId.quantity)).to.eq(quantity)
	});
    
})
