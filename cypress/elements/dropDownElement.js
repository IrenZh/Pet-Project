class dropDownElement {
    constructor(selector) {
        this.selector = selector;
    }

    verifyDropDownIsVisible(){
        cy.get(this.selector).should('be.visible');
    }

    verifyDropDownIsNotVisible(){
        cy.get(this.selector).should('not.be.visible');
    }
}

export default dropDownElement;