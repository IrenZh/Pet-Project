class TitleElement {
    constructor(selector) {
        this.selector = selector;
    }

    verifyValueOfTitle(expectedValue) {
        cy.get(this.selector).then((element) => {
            if (element.val() === expectedValue) {
                cy.wrap(element).should('have.value', expectedValue);
            } else {
                cy.wrap(element).should('contain', expectedValue);
            }
        });
    }

    verifyTitlesOfSearchResults(searchQuery){
        cy.get(this.selector).each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }

    verifyDefaultMessage(defaultMessage) {
        cy.get(this.selector).invoke('text').then((messageText) => {
            cy.wrap(messageText.trim().toLowerCase()).should('contain', defaultMessage);
        });
    }

    verifyTitleIsNotExist(){
        cy.get(this.selector).should('have.length', 0);
    }

    verifyTitleIsVisible(){
        cy.get(this.selector).should('be.visible');
    }
}

export default TitleElement;