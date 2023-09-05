import AlertElement from '../elements/alertElement';
import ButtonElement from '../elements/buttonElement';
import dropDownElement from '../elements/dropDownElement';
import InputElement from '../elements/inputElement';
import TextElement from '../elements/textElement';

class home {
    constructor() {
        this.getCartButton = new ButtonElement('#header-cart-open-count');
        this.getAuthButton = new ButtonElement('div.SignForm-content>span[data-dropdown=\'header-login-form\']');
        this.getUserIconButton = new ButtonElement('div.SignForm');
        this.getLogOut = new ButtonElement('a.HeaderTop-link.HeaderTop-link_withSeparator.SignForm-link');
        this.getSearchButton = new ButtonElement('.fa-search');
        this.getCartButton = new ButtonElement('#header-cart-open-count');
        this.getUserCabinet = new ButtonElement('a.HeaderTop-link.SignForm-link:nth-child(1)');

        this.getSearchBar = new InputElement('input.HeaderMain-searchForm');

        this.getSearchDropDown = new dropDownElement('.HeaderSearchResult');
        
        this.getAlertLogIn = new AlertElement('.Alert');

        this.getSearchResulTitleOnDropDown = new TextElement('.SearchResultProduct-name');    
        this.getCartTotal = new TextElement('.HeaderCartLink-price');
        this.getMainLogo = new TextElement('.HeaderMain-logo');

    }

    elements = {
        getSearchResulTitleOnDropDown: () => cy.get('.SearchResultProduct-name'),
    };

    itemsName = {
        userCabinet: 'Особистий кабінет',
        authorization: 'Авторизація',
        placeholder: 'Найти..',
        defaultValueOfCartTotal: '0 грн.'
    };

    /**
     * Verifies search results in the dropdown contain the provided search query.
     * @param {*} searchQuery - The search query to be included in the search results.
     */

    verifySearchResultsInDropDown(searchQuery){
        this.getSearchBar.typeText(searchQuery); 
        this.elements.getSearchResulTitleOnDropDown().each((result) => {      
            expect(result.text().toLowerCase()).to.include(searchQuery);           
        });
    }
}

export const homePage = new home();
