class InputElement {
    constructor(selector) {
        this.selector = selector;
    }

    typeText(text) {
        this.clearInputField();
        cy.get(this.selector).type(text);
    }

    verifyValueOfField(expectedValue) {
        cy.get(this.selector).then((element) => {
            if (element.val() === expectedValue) {
                cy.wrap(element).should('have.value', expectedValue);
            } else if (element.attr('placeholder') === expectedValue){
                cy.wrap(element).should('have.attr', 'placeholder', expectedValue);
            } else if (element.attr('data-value') == expectedValue){
                cy.wrap(element).should('have.attr', 'data-value', expectedValue);    
            } else {
                cy.wrap(element).should('contain', expectedValue);
            }
        });
    }

    clickOnField() {
        cy.get(this.selector).click();
    }

    /**
     * Simulates pressing the 'Enter' key.
     */

    clickEnter() { 
        cy.get(this.selector).type('{enter}');
    }

    clearInputField(){ 
        cy.get(this.selector).clear();
    }

    setValueToInputField(value){ 
        cy.get(this.selector).type(value);
    }

}

export default InputElement;