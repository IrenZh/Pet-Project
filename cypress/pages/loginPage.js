import { links } from '../e2e/static';

class login {
    elements = {
        getLoginInput: () => cy.get('input#login-form-email'),
        getPasswordInput: () => cy.get('input#login-form-password'),
        getLoginButton: () => cy.get('button#header-login-form-btn'),
        getErrorEmailField: () => cy.get('.FormGroup-error'),
    };
    errorName = {
        logInError: 'Неправильно заполнены поле E-Mail и/или пароль!',
        emailError: 'Некоректний email',

    };

    /**
     * Performs a login operation with the provided login name and password using fillLoginInfo method, veryfing API response.
     * @param {string} loginName 
     * @param {string} password 
     */
   
    login(loginName, password){
        cy.intercept('POST', links.loginUrl).as('loginCall');
        this.fillLoginInfo(loginName, password);
        this.elements.getLoginButton().click();
        return cy.wait('@loginCall').then(response => 
            expect(response.response.statusCode).to.eq(200));
    }

    /**
     * Fills the login fields.
     * @param {string} loginName - The login name for logging in.
     * @param {string} password - The password for logging in.
     */

    fillLoginInfo(loginName, password){
        this.elements.getLoginInput().clear().type(loginName);
        this.elements.getPasswordInput().clear().type(password);
    }
}
export const loginPage = new login();