import ButtonElement from '../elements/buttonElement';

class home {
    constructor() {
        this.getCartButton = new ButtonElement('#header-cart-open-count');
        this.getAuthButton = new ButtonElement('div.SignForm-content>span[data-dropdown=\'header-login-form\']');
        this.getUserIconButton = new ButtonElement('div.SignForm');
        this.getLogOut = new ButtonElement('a.HeaderTop-link.HeaderTop-link_withSeparator.SignForm-link');
        this.getSearchButton = new ButtonElement('.fa-search');
        this.getCartButton = new ButtonElement('#header-cart-open-count');

    }
    elements = {
        getUserCabinet: () => cy.get('a.HeaderTop-link.SignForm-link:nth-child(1)'),
        getMainLogo: () => cy.get('.HeaderMain-logo'),
        getAlertLogIn: () => cy.get('.Alert'),
        getSearchBar: () => cy.get('input.HeaderMain-searchForm'),
        getSearchResultsDropDown: () => cy.get('.HeaderSearchResult'),
        getSearchResulTitle: () => cy.get('.SearchResultProduct-name'),
        getCartTotal: () => cy.get('.HeaderCartLink-price')
    };

    itemsName = {
        userCabinet: 'Особистий кабінет',
        authorization: 'Авторизація',
        placeholder: 'Найти..'
    };

    /**
     * Verifies the default value of the placeholder in the search bar
     * @param {*} placeholder - The expected placeholder value for the search bar('Найти..').
     */

    verifyDefaultValuePlaceholder(placeholder){ 
        this.elements.getSearchBar().click().should('have.attr', 'placeholder', placeholder);
    }

    /**
     * Types a search query in the search bar and verifies the visibility of search results dropdown.
     * @param {*} searchQuery - The search query to be typed.
     */

    typeSearchQuery(searchQuery){ 
        this.elements.getSearchBar().click().clear().type(searchQuery);
        this.elements.getSearchResultsDropDown().should('be.visible');
    }

    /**
     * Simulates pressing the 'Enter' key for searching in the search bar.
     */

    clickEnterForSearching(){ 
        this.elements.getSearchBar().type('{enter}');
    }

    /**
     * Verifies search results in the dropdown contain the provided search query.
     * @param {*} searchQuery - The search query to be included in the search results.
     */

    verifySearchResultsInDropDown(searchQuery){
        this.typeSearchQuery(searchQuery); 
        this.elements.getSearchResulTitle().each((result) => {      
            expect(result.text().toLowerCase()).to.include(searchQuery);           
        });
    }

    /**
     * Verifies the default value of the cart total.
     */

    verifyDefaultValueOfCartTotal(){ 
        this.elements.getCartTotal().should('have.text', '0 грн.');
    }

}

export const homePage = new home();
