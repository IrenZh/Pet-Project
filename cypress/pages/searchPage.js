class search {
    elements = {
        getSearchInput: () => cy.get('input[name="search"]'),
        getSearchTitle: () => cy.get('h1.SearchFilter-title'),
        getSearchButton: () => cy.get('#button-search'),
        getSearchResultTitle: () => cy.get('.ProductListItem-title'),
        getPaginationSecondPage: () => cy.get('ul.pagination li:nth-child(2)')

    };

    /**
     * Performs a search operation with the provided search query.
     * @param {*} searchQuery - The search query to be used.
     */

    searchItem(searchQuery){ 
        this.elements.getSearchInput().click().clear().type(searchQuery);
        this.elements.getSearchButton().click();
    }

    /**
     * Clears the search input field.
     */

    clearSearchInput(){ 
        this.elements.getSearchInput().click().clear();
    }

    /**
     * Simulates pressing the 'Enter' key for searching.
     */

    clickEnterForSearching(){ 
        this.elements.getSearchInput().type('{enter}');
    }

    /**
     * Verifies that the search input field has the default placeholder value.
     */

    verifyDefaultValueOfSearchInput(){ 
        this.elements.getSearchInput().should('have.attr', 'placeholder', 'Ключові слова');
    }

    /**
     * Verifies that the search input field contains the specified search query.
     * @param {*} searchQuery - The search query to be checked against the input value.
     */

    verifyValueOfSearchInput(searchQuery){ 
        this.elements.getSearchInput().should('have.value', searchQuery);
    }

    /**
     * Verifies that the search title reflects default value and the provided search query.
     * @param {*} searchQuery - The search query to be included in the search title.
     */

    verifyValueOfSearchTitle(searchQuery){ 
        this.elements.getSearchTitle().should('have.text', 'Пошук - ' + searchQuery);
    }

    /**
     * Verifies that no search results are present
     */

    verifySearchResultsIsNotExist(){
        this.elements.getSearchResultTitle().should('have.length', 0);
        
    }

    /**
     * Verifies that search results contain the provided search query in their titles.
     * @param {*} searchQuery - The search query to be included in the search results.
     */
    verifySearchResults(searchQuery){
        this.elements.getSearchResultTitle().each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }

    /**
     * Simulates clicking on the button to navigate to the second page of search results.
     */

    clickToSecondPage(){ 
        this.elements.getPaginationSecondPage().click();
    }

    /**
     * Verifies the presence of a specific message if there are no products matching the search query.
     */

    verifyMessage(){ 
        cy.contains('p', 'Немає товарів, які відповідають критеріям пошука.');
    }
}

export const searchPage = new search();
