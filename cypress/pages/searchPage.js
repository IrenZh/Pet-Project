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

    verifyValueOfSearchInput(searchQuery){ 
        this.elements.getSearchInput().should('have.value', searchQuery);
    }

    verifyValueOfSearchTitle(searchQuery){ 
        this.elements.getSearchTitle().should('have.text', 'Пошук - ' + searchQuery);
    }

    verifySearchResults(searchQuery){
        this.elements.getSearchResultTitle().each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }
}

export const searchPage = new search();
