class LogInPages
{
    getBarLogin()
    {
        return cy.get('#navbarLoginButton')
    }
    getTypeEmail()
    {
        return cy.get('#email')
    }
    getTypePassword()
    {
        return cy.get('#password')
    }
    getButtonLogin()
    {
        return  cy.get('#loginButton')
    }
}

export default LogInPages;
