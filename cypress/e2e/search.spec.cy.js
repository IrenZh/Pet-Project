import { homePage } from '../pages/mainPage';
import { searchPage } from '../pages/searchPage';

let fullNameProduct;

describe('Search Test', () =>{
    before(() => {
        cy.fixture('searchQueries').then((searchQuery) => {
            fullNameProduct = searchQuery.fullNameProduct;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('Checking the default values in the search bar Test', () =>{
        homePage.verifyDefaultValuePlaceholder(homePage.itemsName.placeholder);
    });

    it.only('Searching with full name of item clicking the search button Test', () =>{
        fullNameProduct.forEach(fullNameProduct => {
            homePage.verifySearchResultsInDropDown(fullNameProduct);
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);
            homePage.clickOnSerchButton();
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);
            searchPage.verifyValueOfSearchInput(fullNameProduct);
            searchPage.verifyValueOfSearchTitle(fullNameProduct);
            searchPage.verifySearchResults(fullNameProduct);
        });
    });
});