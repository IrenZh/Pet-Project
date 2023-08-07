class cart {
    elements = {
        getCartDropdown: () => cy.get('#dropdown-cart'),
        getMessageOfCartDropdown: () => cy.get('#header-cart-content'),
        getCloseButton: () => cy.get('.fa-close')
    };

    items = {
        defaultMessageCart: 'Ваш кошик порожній!'
    };

    /**
     * Verifies if the default message in the dropdown cart matches the provided default message.
     * @param {string} defaultMessageCart - 'Ваш кошик порожній!'.
     */

    verifyDefaultMessageForDropdownCart(defaultMessageCart){
        this.elements.getCartDropdown().should('be.visible');
        this.elements.getMessageOfCartDropdown().then((result) => {
            expect(result.text().trim()).to.equal(defaultMessageCart);
        });
    }

    /**
     *  Closes the cart by clicking the close button.
     */

    closeCart(){
        this.elements.getCloseButton().click();
    }

    /**
     * Verifies that the cart dropdown is not visible.
     */

    verifyCartDropdownIsNotVisible(){
        this.elements.getCartDropdown().should('not.be.visible');
    }
}

export const cartPage = new cart();