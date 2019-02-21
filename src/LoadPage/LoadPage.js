import LoginPage from "../LoginPage/LoginPage.js";
import Registration from "../Registration/Registration.js";
import HomePage from "../HomePage/HomePage.js";
import NewContact from "../AddContact/AddContact.js";
import ContactHtmlBuilder from "../AllContacts/ContactHtmlBuilder.js";
import CategoryFunctions from "../Categories/CategoryFunctions.js";
import Session from "../Offline/Session";

export const PageType = {
    LOGIN_PAGE: 'login',
    REGISTRATION_PAGE: 'registration',
    HOME_PAGE: 'home',
    ADD_CONTACT_PAGE: 'addContact',
    ALL_CONTACT_PAGE: 'allContact',
    CREATE_CATEGORY_PAGE: 'createCategory',
    CREATE_CONTACT_PAGE: 'createContact',
};

export default class LoadPage {
    constructor() {

    }

    static load(page) {
        let loginPage = new LoginPage();
        let reg = new Registration();
        let homePage = new HomePage();
        let newContact = new NewContact();
        let allContacts = new ContactHtmlBuilder();
        let categoryMenu = new CategoryFunctions();

        window.history.pushState(
            {},
            "?page=" + page,
            window.location.origin + "?page=" + page
        );

        switch (page) {
            case PageType.LOGIN_PAGE :
                Session.getInstance().loadActiveUser();
                loginPage.onload();
                break;
            case PageType.REGISTRATION_PAGE :
                loginPage.onload();
                reg.onload();
                break;
            case PageType.HOME_PAGE :
                Session.getInstance().loadActiveUser();
                homePage.onload();
                break;
            case PageType.CREATE_CONTACT_PAGE :
                Session.getInstance().loadActiveUser();
                homePage.onload();
                newContact.onload();
                break;
            case PageType.ALL_CONTACT_PAGE :
                Session.getInstance().loadActiveUser();
                homePage.onload();
                allContacts.loadAllContacts();
                break;
            case PageType.CREATE_CATEGORY_PAGE :
                Session.getInstance().loadActiveUser();
                homePage.onload();
                categoryMenu.onload();
                break;
        }
    }
}