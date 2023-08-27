/**
 * Represents a title element on a web page.
 */

class TitleElement {
    /**
     * Create a new TitleElement instance.
     * @param {} selector - The CSS selector for the title element.
     */

    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Verifies that the value or content of the title element matches the expected value.
     * @param {string} expectedValue - The expected value to be verified.
     */

    verifyValueOfTitle(expectedValue) {
        cy.get(this.selector).then((element) => {
            if (element.val() === expectedValue) {
                cy.wrap(element).should('have.value', expectedValue);
            } else {
                cy.wrap(element).should('contain', expectedValue);
            }
        });
    }

    /**
     * Verifies that the titles of search results contain the search query.
     * @param {string} searchQuery - The search query to be checked in titles.
     */

    verifyTitlesOfSearchResults(searchQuery){
        cy.get(this.selector).each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }

    /**
     * Verifies that the default message content matches the expected default message.
     * @param {string} defaultMessage - The expected default message to be verified.
     */

    verifyDefaultMessage(defaultMessage) {
        cy.get(this.selector).invoke('text').then((messageText) => {
            cy.wrap(messageText.trim().toLowerCase()).should('contain', defaultMessage);
        });
    }

    /**
     * Verifies that title elements are not exist on the page.
     */

    verifyTitleIsNotExist(){
        cy.get(this.selector).should('have.length', 0);
    }

    /**
     * Verifies that the title element is visible on the page.
     */

    verifyTitleIsVisible(){
        cy.get(this.selector).should('be.visible');
    }
}

export default TitleElement;