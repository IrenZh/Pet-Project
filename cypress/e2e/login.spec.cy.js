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
        homePage.getUserIconButton.clickButton();
        homePage.getAuthButton.clickButton();
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.elements.getMainLogo().should('be.visible');
        homePage.getUserIconButton.clickButton();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });

    it('Log Out Test', { tags: ['@critical', '@login']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('login');
        homePage.getUserIconButton.clickButton();
        homePage.getAuthButton.clickButton();
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    
        homePage.getUserIconButton.clickButton();
        homePage.getUserIconButton.verifyTextButton(homePage.itemsName.userCabinet);

        homePage.getUserIconButton.clickButton();
        homePage.getLogOut.clickButton();
    
        homePage.getUserIconButton.clickButton();
        homePage.getAuthButton.verifyTextButton(homePage.itemsName.authorization);
    });

    it('Login with not registered email Test', { tags: ['@high', '@login']}, () =>{  
        cy.allure()
            .severity('normal')
            .tag('login');
        notRegisteredEmail.forEach(notRegisteredEmail => {
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.clickButton();
            loginPage.login(notRegisteredEmail,Cypress.env('PASSWORD'));

            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.verifyTextButton(homePage.itemsName.authorization);
            
        });
    }); 

    it('Login with invalid email Test', { tags: ['@high', '@login']}, () =>{  
        cy.allure()
            .severity('normal')
            .tag('login');
        invalidEmail.forEach(invalidEmail => { 
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.clickButton();
            loginPage.fillLoginInfo(invalidEmail,Cypress.env('PASSWORD'));
            loginPage.getLoginButton.clickButton();

            loginPage.elements.getErrorEmailField().should('contain', loginPage.errorName.emailError);
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.verifyTextButton(homePage.itemsName.authorization);

        });
    });
    
    it('Login with invalid password', { tags: ['@high', '@login']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('login');
        invalidPassword.forEach(invalidPassword => { 
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.clickButton();
            loginPage.login(Cypress.env('EMAIL'),invalidPassword);
   
            homePage.elements.getAlertLogIn().should('contain', loginPage.errorName.logInError);
            homePage.getUserIconButton.clickButton();
            homePage.getAuthButton.verifyTextButton(homePage.itemsName.authorization);
        });
    });

    it('Successful apiLogin Test', { tags: ['@critical', '@login']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('login');
        cy.loginViaApi(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        
        homePage.getUserIconButton.clickButton();
        homePage.elements.getUserCabinet().should('contain', homePage.itemsName.userCabinet);
    });
});