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
        cy.allure().suite('Login Tests');
        cy.visit('/');
    });
    
    it('Successful Login Test', { tags: ['@critical', '@login']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('login');
        homePage.elements.getUserIconButton().click();
        homePage.elements.getAuthButton().click();
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.elements.getMainLogo().should('be.visible');
        homePage.elements.getUserIconButton().click();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });

    it('Log Out Test', { tags: ['@critical', '@login']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('login');
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

    it('Login with not registered email Test', { tags: ['@high', '@login']}, () =>{  
        cy.allure()
            .severity('normal')
            .tag('login');
        notRegisteredEmail.forEach(notRegisteredEmail => {
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().click();
            loginPage.login(notRegisteredEmail,Cypress.env('PASSWORD'));

            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);
            
        });
    }); 

    it('Login with invalid email Test', { tags: ['@high', '@login']}, () =>{  
        cy.allure()
            .severity('normal')
            .tag('login');
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
    
    it('Login with invalid password', { tags: ['@high', '@login']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('login');
        invalidPassword.forEach(invalidPassword => { 
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().click();
            loginPage.login(Cypress.env('EMAIL'),invalidPassword);
   
            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.elements.getUserIconButton().click();
            homePage.elements.getAuthButton().should('contain', homePage.itemsName.authorization);
        });
    });

    it('Successful apiLogin Test', { tags: ['@critical', '@login']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('login');
        cy.loginViaApi(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.elements.getUserIconButton().click();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });
});