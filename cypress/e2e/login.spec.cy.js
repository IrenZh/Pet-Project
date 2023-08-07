import { loginPage } from '../pages/loginPage';
import { homePage } from '../pages/mainPage';

let invalidEmail;
let notRegisteredEmail;
let invalidPassword;

describe('Login Test', () =>{
    before(() => {
        cy.fixture('invalidCredentials').then((credentialsList) => {
            invalidEmail = credentialsList.invalidEmails;
            notRegisteredEmail = credentialsList.notRegisteredEmails;
            invalidPassword = credentialsList.invalidEmails;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });
    
    it('Successful Login Test', { tags: '@critical'}, () =>{
        homePage.elements.getUserIconButton().click();
        homePage.elements.getAuthButton().click();
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.elements.getMainLogo().should('be.visible');
        homePage.elements.getUserIconButton().click();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });

    it('Log Out Test', { tags: '@critical'}, () =>{
        homePage.elements.getUserIconButton().click();
        homePage.elements.getAuthButton().click();
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    
        homePage.elements.getUserIconButton().click();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);

        homePage.elements.getUserIconButton().click();
        homePage.elements.getLogOut().click();
    
        homePage.elements.getUserIconButton().click();
        homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);
    });

    it('Login with not registered email Test', () =>{  
        notRegisteredEmail.forEach(notRegisteredEmail => {
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().click();
            loginPage.login(notRegisteredEmail,Cypress.env('PASSWORD'));

            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);
            
        });
    }); 

    it.only('Login with invalid email Test', () =>{  
        invalidEmail.forEach(invalidEmail => { 
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().click();
            loginPage.fillLoginInfo(invalidEmail,Cypress.env('PASSWORD'));
            loginPage.elements.getLoginButton().click();

            loginPage.elements.getErrorEmailField().should('contain', loginPage.errorName.emailError);
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);

        });
    });
    
    it('Login with invalid password', () =>{
        invalidPassword.forEach(invalidPassword => { 
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().click();
            loginPage.login(Cypress.env('EMAIL'),invalidPassword);
   
            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);
        });
    });

    it('Successful apiLogin Test', () =>{
        cy.loginViaApi(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.elements.getUserIconButton().click();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });
});