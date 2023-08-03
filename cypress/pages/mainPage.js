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
    };

    itemsName = {
        userCabinet: 'Особистий кабінет',
        authorization: 'Авторизація',
        placeholder: 'Найти..'
    };

    verifyDefaultValuePlaceholder(placeholder){ 
        this.elements.getSearchBar().click().should('have.attr', 'placeholder', placeholder);
    }

    typeSearchQuery(searchQuery){ 
        this.elements.getSearchBar().click().clear().type(searchQuery);
        this.elements.getSearchResultsDropDown().should('be.visible');
    }

    clickOnSerchButton(){ 
        this.elements.getSearchButton().click();
    }

    verifySearchResultsInDropDown(searchQuery){
        this.typeSearchQuery(searchQuery); 
        this.elements.getSearchResulTitle().each((result) => {      
            expect(result.text()).to.include(searchQuery);           
        });
    }
}

export const homePage = new home();
