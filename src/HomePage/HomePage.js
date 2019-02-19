import ContactsBook from "../Module.js"
import * as constants from "../Constants";
import CategoriesLoad from '../Categories/CategoriesLoad.js'
import Session from "../Offline/Session";
import LoadPage, {PageType} from "../LoadPage/LoadPage";
import ContactHtmlBuilder from "../AllContacts/ContactHtmlBuilder";

export default class HomePage {
    constructor() {
    }

    onload() {
        fetch('./HomePage/HomePage.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })

            .then(() => {
                addEventShowAllContactsPage();
                addEventCreateContactPage();
                addEventCreateCategoryPage();
                CategoriesLoad.addCategories();
                addUserNameToHomePage();
                addEventLogOutButton();
                addSearchEvent();
                addBirthdayReminder();
            });

        function addEventCreateCategoryPage() {
            const createButton2 = document.querySelector('.ls-inner__add-group__wrapper');

            createButton2.addEventListener('click', () => {
                LoadPage.load(PageType.CREATE_CATEGORY_PAGE);
            })
        }

        function addEventShowAllContactsPage() {
            const allContactsButton = document.querySelector('#all-contacts-button');

            allContactsButton.addEventListener('click', () => {
                LoadPage.load(PageType.ALL_CONTACT_PAGE);
            })
        }

        function addEventCreateContactPage() {
            const addButton = document.querySelector('.ls-inner__add-contact__wrapper');

            addButton.addEventListener('click', () => {
                LoadPage.load(PageType.CREATE_CONTACT_PAGE);
            })
        }

        function addUserNameToHomePage() {
            let userFullName = document.querySelector('.ls-inner__account__name-text');
            let activeUser = Session.getInstance().getActiveUser();
            userFullName.innerText = activeUser.name + ' ' + activeUser.surname
        }

        function addEventLogOutButton() {
            const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

            logOutButton.addEventListener('click', () => {
                ContactsBook.clearMainBlock();
                LoadPage.load(PageType.LOGIN_PAGE);
                ContactsBook.isMobileDevice();
            })
        }

        function addSearchEvent() {
            const allContacts = new ContactHtmlBuilder();
            const search = document.querySelector('.ls-inner__search-menu-input');

            search.addEventListener('click', () => {
                allContacts.loadAllContacts();
            });

            search.addEventListener('keyup', (e) => {
                const search = document.querySelector('.ls-inner__search-menu-input');
                let filter = search.value.toUpperCase();
                const fullName = document.querySelectorAll('.all-contacts__items-desc__name');
                const filteredItems = document.querySelectorAll('.all-contacts__items');

                filteredItems.forEach((elem, i) => {
                    if (fullName[i].innerText.split(' ')[0].toUpperCase().indexOf(filter) > -1) {
                        elem.style.display = ''
                    } else {
                        elem.style.display = 'none'
                    }
                })
            })
        }

        function addBirthdayReminder() {
            let htmlBuilder = new ContactHtmlBuilder()
            let contactsArray = Session.getInstance().getActiveUser().contacts;
            let birthdayBlock = document.querySelector('.ls-inner__birthday-reminder');
            let today = new Date();
            let year = today.getFullYear();

            let wrapper = htmlBuilder.createElementWithClass('div', null, 'ls-inner__birthday-reminder-items__wrapper');
            birthdayBlock.appendChild(wrapper);

            contactsArray.forEach(elem => {
                let bornDate = Number(elem.bornDate.split('.')[2]);

                let age = year - bornDate;

                let newDateBlock = htmlBuilder.createElementWithClass('div', null, 'ls-inner__birthday-reminder-items');
                let bornInfo = htmlBuilder.createElementWithClass('div', null, 'ls-inner__birthday-reminder-items__bornInfo');
                let dateBlock = htmlBuilder.createElementWithClass('div', elem.bornDate, 'ls-inner__birthday-reminder-items__date');
                let name = htmlBuilder.createElementWithClass('div', elem.name + ' ' + elem.surname, 'ls-inner__birthday-reminder-items__name');
                let ageBlock = htmlBuilder.createElementWithClass('div', `${age} years old`, 'ls-inner__birthday-reminder-items__age');

                wrapper.appendChild(newDateBlock);

                newDateBlock.appendChild(bornInfo);
                newDateBlock.appendChild(ageBlock);

                bornInfo.appendChild(name);
                bornInfo.appendChild(dateBlock)
            });
        }
    }
}

