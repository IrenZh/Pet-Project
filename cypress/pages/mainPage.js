class home {
    elements = {
        getAuthButton: () => cy.get('div.SignForm-content>span[data-dropdown=\'header-login-form\']'),
        getUserIconButton: () => cy.get('div.SignForm'),
        getUserCabinet: () => cy.get('a.HeaderTop-link.SignForm-link:nth-child(1)'),
        getLogOut: () => cy.get('a.HeaderTop-link.HeaderTop-link_withSeparator.SignForm-link'),
        getMainLogo: () => cy.get('.HeaderMain-logo'),
        getAlertLogIn: () => cy.get('.Alert'),
        getSearchBar: () => cy.get('input.HeaderMain-searchForm'),
        getSearchButton: () => cy.get('.fa-search'),
        getSearchResultsDropDown: () => cy.get('.HeaderSearchResult'),
        getSearchResulTitle: () => cy.get('.SearchResultProduct-name'),
        getCartButton: () => cy.get('#header-cart-open-count'),
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
     * Clicks on the search button.
     */

    clickOnSerchButton(){ 
        this.elements.getSearchButton().click();
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
     * Clicks on the cart button.
     */

    clickCartButton(){ 
        this.elements.getCartButton().click();
    }

    /**
     * Verifies the default products value of the cart icon.
     */

    verifyDefaultValueOfCartIcon(){ 
        this.elements.getCartButton().should('have.text', '0');
    }

    /**
     * Verifies the default value of the cart total.
     */

    verifyDefaultValueOfCartTotal(){ 
        this.elements.getCartTotal().should('have.text', '0 грн.');
    }

}

export const homePage = new home();
