/**
 * Represents an alert element on a web page.
 */

class AlertElement {
    /**
     * Create a new AlertElement instance.
     * @param {} selector - The CSS selector for the alert element.
     */

    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Verifies that the alert message contains the expected text.
     * @param {string} message - The expected message to be contained in the alert.
     */

    verifyAlertMessage(message){
        cy.get(this.selector).should('contain', message);
    }
}

export default AlertElement;