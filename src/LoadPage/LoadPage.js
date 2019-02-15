import LoginPage from "../LoginPage/login.js";
import Registration from "../Registration/Registration.js";
import LSideInnerBlock from "../LSideBlock/LSideBlock.js";
import NewContact from "../AddContact/addContact.js";
import AllContacts from "../AllContacts/AllContacts.js";
import CategoryMenu from "../Categories/categoryMenu.js";


export default class LoadPage {
    constructor() {

    }

    static load(page, param) {
        let loginPage = new LoginPage();
        let reg = new Registration();
        let homePage = new LSideInnerBlock();
        let newContact = new NewContact();
        let allContacts = new AllContacts();
        let categoryMenu = new CategoryMenu();


        window.history.pushState(
            {},
            "?page=" + page,
            window.location.origin + "?page=" + page
        );

        switch (page) {
            case "login" :

                loginPage.onload();
                break;
            case "registration" :
                loginPage.onload();
                reg.onload();
                break;
            case "home" :
                homePage.onload();
                break;
            case "addContact" :
                homePage.onload();
                newContact.onload();
                break;
            case "allContacts" :
                homePage.onload();
                allContacts.loadAllContacts();
                break;
            case "createCategory" :
                homePage.onload();
                categoryMenu.onload();
                break;
        }
    }
}