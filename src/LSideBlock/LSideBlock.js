import ContactsBook from "../Module.js"
import * as constants from "../constants";
import Categories from '../Categories/categories.js'
import Session from "../Offline/Session";
import LoadPage from "../LoadPage/LoadPage";


export default class LSideInnerBlock {
    constructor() {
    }

    onload() {
        const categories = new Categories();

        fetch('./LSideBlock/LSideBlock.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })

            .then(() => {
                showAllContact();
                addContactLink();
                createCategory();
                categories.addCategories();
                addName();
                logOut();
            });

        function createCategory() {
            const createButton2 = document.querySelector('.ls-inner__add-group__wrapper');

            createButton2.addEventListener('click', () => {
                LoadPage.load("createCategory");
            })
        }

        function showAllContact() {
            const allContactsButton = document.querySelector('#all-contacts-button');

            allContactsButton.addEventListener('click', () => {
                LoadPage.load("allContacts");
            })
        }

        function addContactLink() {
            const addButton = document.querySelector('.ls-inner__add-contact__wrapper');

            addButton.addEventListener('click', () => {
                LoadPage.load("addContact");
            })
        }

        function addName() {
            let userFullName = document.querySelector('.ls-inner__account__name-text');
            let activeUser = Session.getInstance().getActiveUser();
            userFullName.innerText = activeUser.name + ' ' + activeUser.surname
        }

        function logOut() {
            const book = new ContactsBook();
            const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

            logOutButton.addEventListener('click', () => {
                book.clearMainBlock();
                LoadPage.load("login");

                if (document.documentElement.clientWidth <= 720) {
                    let title = document.querySelector('.ls__title');
                    title.style.display = 'block';
                }
            })
        }
    }
}
