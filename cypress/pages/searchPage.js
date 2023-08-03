class search {
    elements = {
        getSearchInput: () => cy.get('input[name="search"]'),
        getSearchTitle: () => cy.get('h1.SearchFilter-title'),
        getSearchButton: () => cy.get('#button-search'),
        getSearchResultTitle: () => cy.get('.ProductListItem-title')

    };

    searchItem(searchQuery){ 
        this.elements.getSearchInput().click().clear().type(searchQuery);
        this.elements.getSearchButton().click();
    }

    verifyVelueOfSearchInput(searchQuery){ 
        this.elements.getSearchInput().should('have.value', searchQuery);
    }

    verifyVelueOfSearchTitle(searchQuery){ 
        this.elements.getSearchTitle().should('have.text', 'Пошук - ' + searchQuery);
    }

    verifySearchResults(searchQuery){
        this.elements.getSearchResultTitle().each((result) => {          
            cy.wrap(result).invoke('text').then((text) => {
                expect(text).to.include(searchQuery);
            });
        });
    }
}

export const searchPage = new search();
