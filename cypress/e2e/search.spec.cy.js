import { homePage } from '../pages/mainPage';
import { searchPage } from '../pages/searchPage';

let productName;
let productNameForPagination;

describe('Search Test', () =>{
    before(() => {
        cy.fixture('searchQueries').then((searchQuery) => {
            productName = searchQuery.productName;
            productNameForPagination = searchQuery.productNameForPagination;
        });
    });

    beforeEach(() => {
        cy.allure().suite('Search Tests');
        cy.visit('/');
    });

    it('Checking the default values in the search bar Test', { tags: ['@low', '@search']}, () =>{    
        cy.allure().severity('minor');
        homePage.verifyDefaultValuePlaceholder(homePage.itemsName.placeholder);
    });

    it('Searching with name of item clicking the search button Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        productName.forEach(productName => {
            homePage.verifySearchResultsInDropDown(productName);
            homePage.clickOnSerchButton();
            searchPage.verifyValueOfSearchInput(productName);
            searchPage.verifyValueOfSearchTitle(productName);
            searchPage.verifySearchResults(productName);
        });
    });

    it('Searching with name of item clicking "Enter" Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.verifySearchResultsInDropDown(productName[0]);
        homePage.clickEnterForSearching();
        searchPage.verifyValueOfSearchInput(productName[0]);
        searchPage.verifyValueOfSearchTitle(productName[0]);
        searchPage.verifySearchResults(productName[0]);
    });

    it('Verify pagination Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.verifySearchResultsInDropDown(productNameForPagination);
        homePage.clickEnterForSearching();
        searchPage.verifyValueOfSearchInput(productNameForPagination);
        searchPage.verifyValueOfSearchTitle(productNameForPagination);
        searchPage.verifySearchResults(productNameForPagination);
        searchPage.clickToSecondPage();
        searchPage.verifySearchResults(productNameForPagination);
    });

    it('Searching for an item, then changing the search word Test', { tags: ['@medium', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.verifySearchResultsInDropDown(productName[3]);
        homePage.clickEnterForSearching();
        searchPage.verifyValueOfSearchInput(productName[3]);
        searchPage.verifyValueOfSearchTitle(productName[3]);
        searchPage.verifySearchResults(productName[3]);
        searchPage.searchItem(productName[4]);
        searchPage.verifyValueOfSearchInput(productName[4]);
        searchPage.verifyValueOfSearchTitle(productName[4]);
        searchPage.verifySearchResults(productName[4]);
    });

    it('Searching with empty field Test', { tags: ['@medium', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.verifySearchResultsInDropDown(productName[1]);
        homePage.clickEnterForSearching();
        searchPage.verifyValueOfSearchInput(productName[1]);
        searchPage.verifyValueOfSearchTitle(productName[1]);
        searchPage.verifySearchResults(productName[1]);
        searchPage.clearSearchInput();
        searchPage.verifyDefaultValueOfSearchInput();
        searchPage.clickEnterForSearching();
        searchPage.verifySearchResultsIsNotExist();
        searchPage.verifyMessage();
    });
});