import ContactsBook from "../Module.js"
import * as constants from "../Constants";
import CategoriesLoad from '../Categories/categoriesLoad.js'
import Session from "../Offline/Session";
import LoadPage, {PageType} from "../LoadPage/LoadPage";

export default class HomePage {
    constructor() {
    }

    onload() {
        const categories = new CategoriesLoad();

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
                categories.addCategories();
                addUserNameToHomePage();
                addEventLogOutButton();
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
            const book = new ContactsBook();
            const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

            logOutButton.addEventListener('click', () => {
                book.clearMainBlock();
                LoadPage.load(PageType.LOGIN_PAGE);

                if (document.documentElement.clientWidth <= 720) {
                    let title = document.querySelector('.ls__title');
                    title.style.display = 'block';
                }
            })
        }
    }
}
