import { links } from '../e2e/static';
import AlertElement from '../elements/alertElement';
import ButtonElement from '../elements/buttonElement';
import InputElement from '../elements/inputElement';

class login {
    constructor() {
        this.getLoginButton = new ButtonElement('button#header-login-form-btn');

        this.getLoginInput = new InputElement('input#login-form-email');
        this.getPasswordInput = new InputElement('input#login-form-password');
        
        this.getErrorEmailField = new AlertElement('.FormGroup-error');

    }

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
        this.getLoginButton.clickButton();
        return cy.wait('@loginCall').then(response => 
            expect(response.response.statusCode).to.eq(200));
    }

    /**
     * Fills the login fields.
     * @param {string} loginName - The login name for logging in.
     * @param {string} password - The password for logging in.
     */

    fillLoginInfo(loginName, password){
        this.getLoginInput.typeText(loginName);
        this.getPasswordInput.typeText(password);
    }
}
export const loginPage = new login();