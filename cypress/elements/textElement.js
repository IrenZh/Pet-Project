/**
 * Represents a text element on a web page.
 */

class TextElement {
    /**
     * Create a new TextElement instance.
     * @param {} selector - The CSS selector for the text element.
     */

    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Verifies that the value or content of the text element matches the expected value.
     * @param {string} expectedValue - The expected value to be verified.
     */

    verifyValueOfText(expectedValue) {
        cy.get(this.selector).then((element) => {
            if (element.val() === expectedValue) {
                cy.wrap(element).should('have.value', expectedValue);
            } else {
                cy.wrap(element).should('contain', expectedValue);
            }
        });
    }

    /**
     * Verifies that text elements are not exist on the page.
     */

    verifyTextIsNotExist(){
        cy.get(this.selector).should('have.length', 0);
    }

    /**
     * Verifies that the text element is visible on the page.
     */

    verifyTextIsVisible(){
        cy.get(this.selector).should('be.visible');
    }
}

export default TextElement;