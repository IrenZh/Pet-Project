class AlertElement {
    constructor(selector) {
        this.selector = selector;
    }

    verifyAlertMessage(message){
        cy.get(this.selector).should('contain', message);
    }
}

export default AlertElement;