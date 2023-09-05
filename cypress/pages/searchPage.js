import AlertElement from '../elements/alertElement';
import ButtonElement from '../elements/buttonElement';
import InputElement from '../elements/inputElement';
import TextElement from '../elements/textElement';

class search {
    constructor() {
        this.getSearchButton = new ButtonElement('#button-search');
        this.getBuyButton = new ButtonElement('.Button_primary');
        this.getPaginationSecondPage = new ButtonElement('ul.pagination li:nth-child(2)');

        this.getSearchInput = new InputElement('input[name="search"]');

        this.getSearchTitle = new TextElement('h1.SearchFilter-title');
        this.getSearchResultTitle = new TextElement('.ProductListItem-title');

        this.getSuccessMessage = new AlertElement('.Alert_success');
    }
    elements = {
        getSearchResultTitle: () => cy.get('.ProductListItem-title'),
    };

    itemsName = {
        placeholder: 'Ключові слова'
    };

    /**
     * Verifies the presence of a specific message if there are no products matching the search query.
     */

    verifyMessage(){ 
        cy.contains('p', 'Немає товарів, які відповідають критеріям пошука.');
    }

    /**
     * Get the price of a product by its name.
     *
     * @param {string} productName - The name of the product to search for.
     * @returns The price of the matching product.
     *
     */

    getPriceOfItemByName(productName){
        return this.elements.getSearchResultTitle().contains(productName).closest('.ProductListItem')
            .find('.ProductListInfo-price:first').invoke('text');
    }

    /**
     * Clicks Buy of a product with the given name.
     * @param {} productName The name of the product to search for and click Buy.
     */

    clickBuyButtonOfProductByName(productName) {
        this.elements.getSearchResultTitle().contains(productName).closest('.ProductListItem').find('.Button_primary').click();
    }

    /**
     * Verifies success message with product name after click on Buy button.
     * @param {*} productName The name of the product to click Buy
     */

    verifySuccessMessage(productName){
        this.elements.getSearchResultTitle().contains(productName).invoke('text').as('productTitle');
        cy.get('@productTitle').then(productTitle => {
            this.getSuccessMessage.verifyAlertMessage(`${productTitle} додано у кошик!`);
        });
    }

    /**
     * Verifies that the title of search results contain the search query.
     * @param {string} searchQuery - The search query to be checked in texts.
     */

    verifyTitlesOfSearchResults(searchQuery){
        this.elements.getSearchResultTitle().each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }
}

export const searchPage = new search();
