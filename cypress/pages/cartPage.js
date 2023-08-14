import { searchPage } from './searchPage';

class cart {
    elements = {
        getCart: () => cy.get('#dropdown-cart'),
        getMessageOfCart: () => cy.get('#header-cart-content'),
        getCloseButton: () => cy.get('.fa-close'),
        getProductTitle: () => cy.get('.ProductTable-productTitle'),
        getProductPrice: () => cy.get('.ProductTable-price'),
        getQuantityOfItems: () => cy.get('.ProductTable-quantity').find('[data-value]'),
        getDecreaseButton: () => cy.get('.ProductTable-quantity .product-counter__btn--decrease'),
        getIncreaseButton: () => cy.get('.ProductTable-quantity .product-counter__btn--increase'),
        getInputOfQuantity: () => cy.get('.ProductTable-quantity .product-counter__val'),
        getDeleteButton: () => cy.get('.fa-remove'),
        getOrderButton: () => cy.get('.HeaderCart-btn'),
    };

    items = {
        defaultMessageCart: 'кошик порожній!'
    };

    /**
     * Verifies if the default message in the dropdown cart matches the provided default message.
     * @param {string} defaultMessageCart - 'Ваш кошик порожній!'.
     */

    verifyDefaultMessageForCart(defaultMessageCart){
        this.elements.getCart().should('be.visible');
        this.elements.getMessageOfCart().then((result) => {
            expect(result.text().trim().toLowerCase()).to.contain(defaultMessageCart);
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

    verifyCartIsNotVisible(){
        this.elements.getCart().should('not.be.visible');
    }

    /**
     * Verifies that the title of the product in the cart matches the expected product name.
     * @param {*} productName 
     */

    verifyTitleOfProductOnCart(productName) {
        this.elements.getProductTitle().should('contain', productName);
    }

    /**
     * Calculates the total price of a product in the cart based on its price and quantity.
     * @param {*} productName The name of the product.
     * @param {number} numberOfItems The number of items of the product in the cart.
     * @returns The total price of the product in the cart
     */

    getPriceOnCart(productName, numberOfItems) {
        return searchPage.getPriceOfItemByName(productName).then(productPrice => {
            return parseFloat(productPrice) * numberOfItems;
        });
    }

    /**
     * Calculates the total price of a product in the cart based on its price and quantity.
     * Compares the product price from the card with the actual price in the cart.
     * @param {*} productName  The name of the product.
     */

    compareProductPriceWithPriceOnCart(productName) {
        this.getQuantityOfProducts().then(quantity => {
            this.getPriceOnCart(productName, quantity).then(expectedProductPrice => {
                this.elements.getProductPrice().should('include.text', expectedProductPrice);
            });
        });
    }

    /**
     * Retrieves the quantity of products from the cart.
     * @returns the quantity of products from the cart
     */

    getQuantityOfProducts() {
        return this.elements.getQuantityOfItems().invoke('attr', 'data-value');
    }

    /**
     * Verifies if the quantity of products matches the expected number.
     * @param {number} numberOfProducts The expected number of products.
     */

    verifyQuantityOfProducts(numberOfProducts){ 
        this.elements.getQuantityOfItems().should('have.attr', 'data-value', numberOfProducts);
    }

    /**
     * Sets a specific quantity value in the quantity input field.
     * @param {number} number The quantity value to set.
     */

    setValueToQuantityInput(number){ 
        this.elements.getInputOfQuantity().type(number, '{enter}');
    }

    /**
     * Clicks the delete button for a product from the cart
     */

    clickDeleteButton(){ 
        this.elements.getDeleteButton().click();
    }

    /**
     * Clicks the order button to initiate the order process.
     */

    clickOrderButton(){ 
        this.elements.getOrderButton().click();
    }

}

export const cartPage = new cart();