import ButtonElement from '../elements/buttonElement';
import dropDownElement from '../elements/dropDownElement';
import InputElement from '../elements/inputElement';
import TitleElement from '../elements/titleElement';
import { searchPage } from './searchPage';

class cart {
    constructor() {
        this.getCloseButton = new ButtonElement('.fa-close');
        this.getDecreaseButton = new ButtonElement('.ProductTable-quantity .product-counter__btn--decrease');
        this.getIncreaseButton = new ButtonElement('.ProductTable-quantity .product-counter__btn--increase');
        this.getDeleteButton = new ButtonElement('.fa-remove');
        this.getOrderButton = new ButtonElement('.HeaderCart-btn');

        this.getCart = new dropDownElement('#dropdown-cart');

        this.getMessageOfCart = new TitleElement('.HeaderCart-content_empty');
        this.getProductTitle = new TitleElement('.ProductTable-productTitle');
        this.getProductPrice = new TitleElement('.ProductTable-price');

        this.getQuantityOfItems = new InputElement('.ProductTable-quantity div[data-value]');       
    }
    elements = {
        getQuantityOfItems: () => cy.get('.ProductTable-quantity div[data-value]'),
        
    };
    
    items = {
        defaultMessageCart: 'кошик порожній!'
    };

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
                this.getProductPrice.verifyValueOfTitle(expectedProductPrice);
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

}

export const cartPage = new cart();