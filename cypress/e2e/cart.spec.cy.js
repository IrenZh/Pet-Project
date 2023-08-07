import { cartPage } from '../pages/cartPage';
import { homePage } from '../pages/mainPage';

let productName;
describe('Cart Tests', () =>{
    before(() => {
        cy.fixture('searchQueries').then((searchQuery) => {
            productName = searchQuery.productName;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('Checking the default values in the cart Test', () =>{
        homePage.verifyDefaultValueOfCartIcon();
        homePage.verifyDefaultValueOfCartTotal();
        homePage.clickCartButton();
        cartPage.verifyDefaultMessageForDropdownCart(cartPage.items.defaultMessageCart);
    });

    it('Closing the cart Test', () =>{
        homePage.clickCartButton();
        cartPage.closeCart();
        cartPage.verifyCartDropdownIsNotVisible();
    });
});