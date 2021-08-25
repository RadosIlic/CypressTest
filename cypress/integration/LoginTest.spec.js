/// <reference types="Cypress" />
import LoginPage from "./pageObjects/LoginPage";
import HomePage from "./pageObjects/HomePage";
import LogoutPage from "./pageObjects/LogoutPage";


const loginPage = new LoginPage();
const homePage = new HomePage();
const logoutPage = new LogoutPage();
 
const availablefixtures = [
    {
        "name": "testData_TC001",
        "context": "1"
    },
    {
        "name": "testData_TC002",
        "context": "2"
    }
    
]
 
describe('Login test suite', () => {
    //loop through the fixtues 
    availablefixtures.forEach((afixture) => {

    describe(afixture.context, () => {
            before(function(){ 
            cy.fixture(afixture.name).then(function(data) {
                this.data=data
        })   
    })

    beforeEach('Basic setup', function() {
        
        cy.visit(Cypress.config('baseUrl'))
        
        loginPage.getEmail().clear()
        loginPage.getEmail().type(this.data.email)

        loginPage.getPassword().clear()
        loginPage.getPassword().type(this.data.password)
        
        loginPage.getLoginBtn().click();
    })

    it('Login test TC_001 & TC_002 - Login verification with valid email and password', function() {

        //Verify page title
        cy.title().should('be.equal', 'Suitest - Test Editor')
  
        //Verify Welcome to Suitest
        homePage.getWelcomeToSuitestMessage().should('contain', 'Welcome to Suitest')
                        
        //Clicking personal account dropdown
        homePage.getPesonalAccountDropdown().click()

        //clicking logout button
        homePage.getLogoutBtn().click()

        cy.wait(2)

        //verify logout message
        logoutPage.getLogoutMessage().should('contain', 'You have been logged out')

        //verify logout url
        cy.url().should('eq', 'https://the.suite.st/login?logout=true')

    })


    })
})

    describe('Login Test Cases 003 - 011', () => {
        
        beforeEach('Setup', () => {
            cy.visit(Cypress.config('baseUrl'))

            //Clearing input fields
            loginPage.getEmail().clear()
            loginPage.getPassword().clear()
        })

        it('Login test TC_003 - Login verification with invalid email and valid password', () => {

            cy.loginTestCase('radosbsc@', 'Pass123!')

            //Verify "We don't have an account with these credentials" message
            loginPage.getInvalidCredentialsMessage().should('contain', 'We don\'t have an account')
        })

        it('Login test TC_004 - Login verification with valid email and invalid password', () => {

            cy.loginTestCase('radosbsc@', 'Pass!@#')

            //Verify "We don't have an account with these credentials" message
            loginPage.getInvalidCredentialsMessage().should('contain', 'We don\'t have an account')
        })

        it('Login test TC_005 - Login verification with invalid email (shorted form) and valid password', () => {

            cy.loginTestCase('radosbsc@', 'Pass123!')

            //Verify "This doesn't look like a valid e-mail address" message
            loginPage.getInvalidEmailAddressMessage().should('contain', 'This doesn\'t look like a valid')
        })

        it('Login test TC_006 - Login with 200 character invalid email and 200 character invalid password entered', () => {
            
            cy.fixture('testData_TC006').then(function(data){
                
                loginPage.getEmail().type(data.email)
                loginPage.getPassword().type(data.password)

            })
            
          
            //loginPage.getEmail().type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ')
            //loginPage.getPassword().type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ')
            //loginPage.getLoginBtn().click()

            //cy.loginTestCase('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ')

            //Verify "This doesn't look like a valid e-mail address" message
            loginPage.getInvalidEmailAddressMessage().should('contain', 'This doesn\'t look like a valid')
        })

        it('Login test TC_007 - Login verification with no email and password entered', () => {

            loginPage.getLoginBtn().click()

            //Verify "E-mail is required" message
            loginPage.getEmailRequiredMessage().should('contain', 'E-mail is required')

            //Verify "Password is required" message
            loginPage.getPasswordRequiredMessage().should('contain', 'Password is required')

            //Verify "We don't have an account with these credentials" message
            loginPage.getInvalidCredentialsMessage().should('contain', 'We don\'t have an account with these credentials')
        })

        it('Login test TC_008 - Login verification with valid email and no password entered', () => {

            loginPage.getEmail().type('radosbsc@')
            loginPage.getLoginBtn().click()

            //Verify "Password is required" message
            loginPage.getPasswordRequiredMessage().should('contain', 'Password is required')
      
        })

        it('Login test TC_009 - Login verification with no email entered and valid password entered', () => {

            loginPage.getPassword().type('Pass123!')
            loginPage.getLoginBtn().click()

            //Verify "E-mail is required" message
            loginPage.getEmailRequiredMessage().should('contain', 'E-mail is required')
      
        })

        it('Login test TC_010 - Login verification with invalid email (shorted form) and blank “Your password” field', () => {

            loginPage.getEmail().type('radosbsc@')
            loginPage.getLoginBtn().click()

            //Verify "This doesn't look like a valid e-mail address" message
            loginPage.getInvalidEmailAddressMessage().should('contain', 'This doesn\'t look like a valid')

            //Verify "Password is required" message
            loginPage.getPasswordRequiredMessage().should('contain', 'Password is required')
      
        })

        it('Login test TC_011 - Login verification with valid email in capital letters and valid password and “Enter” key pressed', () => {

            loginPage.getEmail().type('RADOSBSC@')
            loginPage.getPassword().type('Pass123!' + '{enter}')

            //Verify page title
            cy.title().should('be.equal', 'Suitest - Test Editor')

            //Verify Welcome to Suitest
            homePage.getWelcomeToSuitestMessage().should('contain', 'Welcome to Suitest')
                
            //Clicking personal account dropdown
            homePage.getPesonalAccountDropdown().click()

            //clicking logout button
            homePage.getLogoutBtn().click()

            cy.wait(2)

            //verify logout message
            logoutPage.getLogoutMessage().should('contain', 'You have been logged out')

            //verify logout url
            cy.url().should('eq', 'https://the.suite.st/login?logout=true')
      
        })
       
    })
   
})