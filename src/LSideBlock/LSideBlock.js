import ContactsBook from "../Module.js"
import * as constants from "../constants";
import NewContact from "../AddContact/addContact.js"
import AllContact from "../AllContacts/AllContacts.js"
import Categories from '../Categories/categories.js'
import ContactInformation from '../ContactInfo/contactInfo.js'
import CategoryMenu from "../Categories/categoryMenu";

export default class LSideInnerBlock {
    constructor() {
    }

    onload() {
        const categories = new Categories();
        const allContacts = new AllContact();
        const inner = new LSideInnerBlock();
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
                let button = document.querySelector('.ls-inner__account__option');
                newContact.onload();
                inner.logOut();
                contactInfo.showContactIinfo(button);
                allContacts.showContactsMenu();
                categories.loadCategories();
                groupMenu.createLink2();
            })
    }

    logOut(){
        const book = new ContactsBook();
        const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

        logOutButton.addEventListener('click', () => {
            book.clearMainBlock();
            book.onload();
            this.logOutMobile();
        })
    }

    logOutMobile(){
        if(document.documentElement.clientWidth <= 720){
            let title = document.querySelector('.ls__title');
            title.style.display = 'block'
        }
    }
}
