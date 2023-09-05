/**
 * Represents a button element on a web page.
 */

class ButtonElement {
    /**
     * Create a new ButtonElement instance.
     * @param {} selector - The CSS selector for the button element.
     */

    constructor(selector) {
        this.selector = selector;
    }
  
    /**
     * Clicks the button element.
     */

    clickButton() {
        cy.get(this.selector).click();
    }
  
    /**
     * Verifies that the button element contains the expected text.
     * @param {string} expectedText - The expected text to be contained in the button.
     */
    verifyTextButton(expectedText) {
        cy.get(this.selector).should('contain', expectedText);
    }
}
  
export default ButtonElement;