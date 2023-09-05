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
        
        homePage.getMainLogo.verifyTextIsVisible();
        homePage.getUserIconButton.clickButton();
        homePage.getUserCabinet.verifyTextButton(homePage.itemsName.userCabinet);
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

            homePage.getAlertLogIn.verifyAlertMessage(loginPage.errorName.logInError);
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
            loginPage.getLoginInput.typeText(invalidEmail);
            loginPage.getPasswordInput.typeText(Cypress.env('PASSWORD'));
            loginPage.getLoginButton.clickButton();

            loginPage.getErrorEmailField.verifyAlertMessage(loginPage.errorName.emailError);
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
            loginPage.getLoginInput.typeText(Cypress.env('EMAIL'));
            loginPage.getPasswordInput.typeText(invalidPassword);
            loginPage.getLoginButton.clickButton();
   
            homePage.getAlertLogIn.verifyAlertMessage(loginPage.errorName.logInError);
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
        homePage.getUserCabinet.verifyTextButton(homePage.itemsName.userCabinet);
    });
});