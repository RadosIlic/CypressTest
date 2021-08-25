class LogoutPage {
    getLogoutMessage() {
        return cy.get('[data-testid="logout"]')
    }
}

export default LogoutPage;