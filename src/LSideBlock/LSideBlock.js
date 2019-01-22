import ContactsBook from "../Module.js"
import * as constants from "../constants";
import NewContact from "../addContact/addContact.js"
import AllContact from "../AllContacts/AllContacts.js"
import ContactInformation from '../ContactInfo/contactInfo.js'
import GroupMenu from "../AllContacts/groupsMenu";

export default class LSideInnerBlock {
    constructor() {
    }

    onload() {
        const allContacts = new AllContact();
        const inner = new LSideInnerBlock();
        const book = new ContactsBook();
        const newContact = new NewContact();
        const contactInfo = new ContactInformation();
        const groupMenu = new GroupMenu();

        fetch('./LSideBlock/LSideBlock.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                    book.clearMainBlock();
                })
            })

            .then(() => {
                let button = document.querySelector('.ls-inner__account__option');

                book.clearMainBlock();
                newContact.onload();
                inner.logOut();
                contactInfo.showContactIinfo(button);
                allContacts.showContacts();
                allContacts.loadCategories();
                groupMenu.createLink2();
            })
    }

    logOut(){
        const book = new ContactsBook();
        const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

        logOutButton.addEventListener('click', () => {
            book.clearMainBlock();
            book.onload();
        })
    }
}
