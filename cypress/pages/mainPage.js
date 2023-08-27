import AlertElement from '../elements/alertElement';
import ButtonElement from '../elements/buttonElement';
import dropDownElement from '../elements/dropDownElement';
import InputElement from '../elements/inputElement';
import TitleElement from '../elements/titleElement';

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

        this.getSearchResulTitleOnDropDown = new TitleElement('.SearchResultProduct-name');    
        this.getCartTotal = new TitleElement('.HeaderCartLink-price');
        this.getMainLogo = new TitleElement('.HeaderMain-logo');

    }

    itemsName = {
        userCabinet: 'Особистий кабінет',
        authorization: 'Авторизація',
        placeholder: 'Найти..',
        defaultValueOfCartTotal: '0 грн.'
    };
}

export const homePage = new home();
