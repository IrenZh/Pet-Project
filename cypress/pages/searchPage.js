class search {
    elements = {
        getSearchInput: () => cy.get('input[name="search"]'),
        getSearchTitle: () => cy.get('h1.SearchFilter-title'),
        getSearchButton: () => cy.get('#button-search'),
        getSearchResultTitle: () => cy.get('.ProductListItem-title'),
        getPaginationSecondPage: () => cy.get('ul.pagination li:nth-child(2)')

    };

    searchItem(searchQuery){ 
        this.elements.getSearchInput().click().clear().type(searchQuery);
        this.elements.getSearchButton().click();
    }

    clearSearchInput(){ 
        this.elements.getSearchInput().click().clear();
    }

    clickEnterForSearching(){ 
        this.elements.getSearchInput().type('{enter}');
    }

    verifyDefaultValueOfSearchInput(){ 
        this.elements.getSearchInput().should('have.attr', 'placeholder', 'Ключові слова');
    }

    verifyValueOfSearchInput(searchQuery){ 
        this.elements.getSearchInput().should('have.value', searchQuery);
    }

    verifyValueOfSearchTitle(searchQuery){ 
        this.elements.getSearchTitle().should('have.text', 'Пошук - ' + searchQuery);
    }

    verifySearchResultsIsNotExist(){
        this.elements.getSearchResultTitle().should('have.length', 0);
        
    }

    verifySearchResults(searchQuery){
        this.elements.getSearchResultTitle().each((result) => {          
            expect(result.text().toLowerCase()).to.include(searchQuery); 
        });
    }

    clickToSecondPage(){ 
        this.elements.getPaginationSecondPage().click();
    }

    verifyMessage(){ 
        cy.contains('p', 'Немає товарів, які відповідають критеріям пошука.');
    }
}

export const searchPage = new search();
