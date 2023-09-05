/**
 * Represents a dropdown element on a web page.
 */

class dropDownElement {
    /**
     * Create a new DropDownElement instance.
     * @param {} selector - The CSS selector for the dropdown element.
     */

    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Verifies that the dropdown element is visible on the page.
     */

    verifyDropDownIsVisible(){
        cy.get(this.selector).should('be.visible');
    }

    /**
     * Verifies that the dropdown element is not visible on the page.
     */

    verifyDropDownIsNotVisible(){
        cy.get(this.selector).should('not.be.visible');
    }
}

export default dropDownElement;