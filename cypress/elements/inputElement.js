/**
 * Represents an input element on a web page.
 */

class InputElement {
    /**
     * Create a new InputElement instance.
     * @param {} selector - The CSS selector for the input element.
     */

    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Types the given text into the input element after clearing it.
     * @param {string} text - The text to type into the input element.
     */

    typeText(text) {
        this.clearInputField();
        cy.get(this.selector).type(text);
    }

    /**
     * Verifies that the input element's value or attributes contain the expected value.
     * @param {string} expectedValue - The expected value to be verified.
     */

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

    /**
     * Clicks on the input element.
     */

    clickOnField() {
        cy.get(this.selector).click();
    }

    /**
     * Simulates pressing the 'Enter' key on the input element.
     */

    clickEnter() { 
        cy.get(this.selector).type('{enter}');
    }

    /**
     * Clears the content of the input element.
     */

    clearInputField(){ 
        cy.get(this.selector).clear();
    }

    /**
     * Sets the given value to the input element.
     * @param {} value - The value to set in the input element.
     */

    setValueToInputField(value){ 
        cy.get(this.selector).type(value);
    }
}

export default InputElement;