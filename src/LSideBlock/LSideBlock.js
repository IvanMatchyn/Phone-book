import ContactsBook from "../Module.js"
import * as constants from "../constants";
import NewContact from "../AddContact/addContact.js"
import AllContact from "../AllContacts/AllContacts.js"
import Categories from '../Categories/categories.js'
import ContactInformation from '../ContactInfo/contactInfo.js'
import CategoryMenu from "../Categories/categoryMenu";
import LoginPage from "../LoginPage/login";
import Session from "../Offline/Session";


export default class LSideInnerBlock {
    constructor() {
    }

    onload() {
        const categories = new Categories();
        const allContacts = new AllContact();
        const newContact = new NewContact();
        const contactInfo = new ContactInformation();
        const groupMenu = new CategoryMenu();

        fetch('./LSideBlock/LSideBlock.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })

            .then(() => {
                let mode = localStorage.getItem('mode');

                if (mode === 'online') {
                    newContact.onload();
                    this.logOut();
                    allContacts.loadAllContacts();
                    categories.loadCategories();
                    groupMenu.createLink2();

                } else if (mode === 'offline') {
                    allContacts.loadAllContacts();
                    newContact.onload();
                    groupMenu.createLink2();
                    categories.loadCategories();
                    this.userInfoOffline();
                    this.logOut();
                }
            })
    }

    logOut() {
        const loginPage = new LoginPage();
        const book = new ContactsBook();
        const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

        logOutButton.addEventListener('click', () => {
            book.clearMainBlock();
            loginPage.onload();
            this.logOutMobile();
        })
    }

    logOutMobile() {
        if (document.documentElement.clientWidth <= 720) {
            let title = document.querySelector('.ls__title');
            title.style.display = 'block'
        }
    }

    userInfoOffline() {
        let userFullName = document.querySelector('.ls-inner__account__name-text');
        let activeUser = Session.getInstance().getActiveUser();
        userFullName.innerText = activeUser.name + ' ' + activeUser.surname
    }
}
