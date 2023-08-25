class ButtonElement {
    constructor(selector) {
        this.selector = selector;
    }
  
    clickButton() {
        cy.get(this.selector).click();
    }
  
    verifyTextButton(expectedText) {
        cy.get(this.selector).should('contain', expectedText);
    }
}
  
export default ButtonElement;