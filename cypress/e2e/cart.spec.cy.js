import { cartPage } from '../pages/cartPage';
import { homePage } from '../pages/mainPage';
import { searchPage } from '../pages/searchPage';

let productNameForCart;

describe('Cart Tests', () =>{
    before(() => {
        cy.fixture('searchQueries').then((searchQuery) => {
            productNameForCart = searchQuery.productNameForCart;
        });
    });

    beforeEach(() => {
        cy.allure().suite('Cart Tests');
        cy.visit('/');
    });

    it('Checking the default values in the cart Test', { tags: ['@medium', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.getCartButton.verifyTextButton(0);
        homePage.verifyDefaultValueOfCartTotal();
        homePage.getCartButton.clickButton();
        cartPage.verifyDefaultMessageForCart(cartPage.items.defaultMessageCart);
    });

    it('Closing the cart Test', { tags: ['@medium', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.getCartButton.clickButton();
        cartPage.getCloseButton.clickButton();
        cartPage.verifyCartIsNotVisible();
    });

    it('Adding a item to the cart Test', { tags: ['@critical', '@cart']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[0]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[0]);
        searchPage.verifySuccessMessage(productNameForCart[0]);
        homePage.getCartButton.verifyTextButton(1);
        homePage.getCartButton.clickButton();
        cartPage.verifyTitleOfProductOnCart(productNameForCart[0]);
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[0], 1);
    });

    it('Adding two items by double clicking to the cart Test', { tags: ['@high', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[1]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[1]);
        searchPage.clickBuyButtonOfProductByName(productNameForCart[1]);
        homePage.getCartButton.verifyTextButton(2);
        homePage.getCartButton.clickButton();
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[1]);
        cartPage.verifyQuantityOfProducts(2);
    });

    it('Changing the quantity of items in the cart by  "+" and "-" button  Test', { tags: ['@high', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[2]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[2]);
        searchPage.verifySuccessMessage(productNameForCart[2]);
        homePage.getCartButton.clickButton();
        cartPage.getIncreaseButton.clickButton();
        cartPage.getIncreaseButton.clickButton();
        cartPage.verifyQuantityOfProducts(3);
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[2]);
        cartPage.getDecreaseButton.clickButton();
        cartPage.verifyQuantityOfProducts(2);
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[2]);
    });

    it('Reducing the quantity of items to zero in the cart Test', { tags: ['@medium', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[3]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[3]);
        homePage.getCartButton.clickButton();
        cartPage.getDecreaseButton.clickButton();
        cartPage.verifyQuantityOfProducts(1);
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[3]);
    });

    it('Changing the quantity of items in the cart manually Test', { tags: ['@medium', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[4]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[4]);
        homePage.getCartButton.clickButton();
        cartPage.verifyTitleOfProductOnCart(productNameForCart[4]);
        cartPage.verifyQuantityOfProducts(1);
        cartPage.setValueToQuantityInput(5);
        cartPage.verifyQuantityOfProducts(5);
        cartPage.compareProductPriceWithPriceOnCart(productNameForCart[4]);
    });

    it('Removing items from the cart Test', { tags: ['@medium', '@cart']}, () =>{
        cy.allure()
            .severity('normal')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[5]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[5]);
        homePage.getCartButton.clickButton();
        cartPage.getDeleteButton.clickButton();
        cartPage.getCloseButton.clickButton();
        homePage.getCartButton.clickButton();
        cartPage.verifyDefaultMessageForCart(cartPage.items.defaultMessageCart);
    });

    it('Opening the ordering page from the cart Test', { tags: ['@critical', '@cart']}, () =>{
        cy.allure()
            .severity('critical')
            .tag('cart');
        homePage.typeSearchQuery(productNameForCart[6]);
        homePage.getSearchButton.clickButton();
        searchPage.clickBuyButtonOfProductByName(productNameForCart[6]);
        homePage.getCartButton.clickButton();
        cartPage.getOrderButton.clickButton();
        cy.url().should('include', 'checkout/#checkout-f'); 
    });
});