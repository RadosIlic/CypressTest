class LoginPage {

    getEmail() {
        return cy.get('#username')
    }

    getPassword() {
        return cy.get('#password')
    }

    getLoginBtn() {
        return cy.get('[type="submit"]')
    }

    getEmailRequiredMessage() {
        return cy.get('[data-testid="emailRequired"]')
    }

    getPasswordRequiredMessage() {
        return cy.get('[data-testid="passwordRequired"]')
    }

    getInvalidCredentialsMessage() {
        return cy.get('[data-testid="infoWrongCredentials"]')
    }

    getInvalidEmailAddressMessage() {
        return cy.get('[data-testid="emailIncorrect"]')
    }

}

export default LoginPage;