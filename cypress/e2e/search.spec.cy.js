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
        homePage.getSearchBar.clickOnField();
        homePage.getSearchBar.verifyValueOfField(homePage.itemsName.placeholder);
    });

    it('Searching with name of item clicking the search button Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        productName.forEach(productName => {
            homePage.getSearchBar.typeText(productName);
            homePage.getSearchDropDown.verifyDropDownIsVisible();
            homePage.getSearchResulTitleOnDropDown.verifyTitlesOfSearchResults(productName);
            homePage.getSearchButton.clickButton();

            searchPage.getSearchInput.verifyValueOfField(productName);
            searchPage.getSearchTitle.verifyValueOfTitle(productName);
            searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productName);
        });
    });

    it('Searching with name of item clicking "Enter" Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.getSearchBar.typeText(productName[0]);
        homePage.getSearchDropDown.verifyDropDownIsVisible();
        homePage.getSearchResulTitleOnDropDown.verifyTitlesOfSearchResults(productName[0]);           
        homePage.getSearchBar.clickEnter();

        searchPage.getSearchInput.verifyValueOfField(productName[0]);
        searchPage.getSearchTitle.verifyValueOfTitle(productName[0]);
        searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productName[0]);
    });

    it('Verify pagination Test', { tags: ['@high', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.getSearchBar.typeText(productNameForPagination);
        homePage.getSearchDropDown.verifyDropDownIsVisible();
        homePage.getSearchResulTitleOnDropDown.verifyTitlesOfSearchResults(productNameForPagination);   
        homePage.getSearchBar.clickEnter();

        searchPage.getSearchInput.verifyValueOfField(productNameForPagination);
        searchPage.getSearchTitle.verifyValueOfTitle(productNameForPagination);
        searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productNameForPagination);

        searchPage.getPaginationSecondPage.clickButton();
        searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productNameForPagination);
    });

    it('Searching for an item, then changing the search word Test', { tags: ['@medium', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.getSearchBar.typeText(productName[3]);
        homePage.getSearchDropDown.verifyDropDownIsVisible();
        homePage.getSearchResulTitleOnDropDown.verifyTitlesOfSearchResults(productName[3]);
        homePage.getSearchBar.clickEnter();

        searchPage.getSearchInput.verifyValueOfField(productName[3]);
        searchPage.getSearchTitle.verifyValueOfTitle(productName[3]);
        searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productName[3]);

        searchPage.getSearchInput.typeText(productName[4]);
        searchPage.getSearchButton.clickButton();
        searchPage.getSearchInput.verifyValueOfField(productName[4]);
        searchPage.getSearchTitle.verifyValueOfTitle(productName[4]);
        searchPage.getSearchResultTitle.verifyTitlesOfSearchResults(productName[4]);
    });

    it('Searching with empty field Test', { tags: ['@medium', '@search']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('search');
        homePage.getSearchBar.typeText(productName[1]);
        homePage.getSearchDropDown.verifyDropDownIsVisible();
        homePage.getSearchResulTitleOnDropDown.verifyTitlesOfSearchResults(productName[1]);
        homePage.getSearchBar.clickEnter();

        searchPage.getSearchInput.verifyValueOfField(productName[1]);
        searchPage.getSearchTitle.verifyValueOfTitle('Пошук - ' + productName[1]);
        searchPage.getSearchTitle.verifyTitlesOfSearchResults(productName[1]);

        searchPage.getSearchInput.clearInputField();
        searchPage.getSearchInput.verifyValueOfField(searchPage.itemsName.placeholder);
        searchPage.getSearchInput.clickEnter();
        searchPage.getSearchResultTitle.verifyTitleIsNotExist();
        searchPage.verifyMessage();
    });
});