class HomePage {

    getWelcomeToSuitestMessage() {
        return cy.get('[data-testid="Welcome to Suitest"]:last-child')
    }

    getPesonalAccountDropdown() {
        return cy.get('.title.dropdown-toggle')
    }

    getLogoutBtn() {
        return cy.get('[data-testid="logoutButton"]')
    }

}

export default HomePage;