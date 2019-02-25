import * as constants from "../Constants";
import Session from "../Offline/Session";
import ContactBook from "../Module";
import CategoryFunctions from "./CategoryFunctions";
import ContactHtmlBuilder from "../AllContacts/ContactHtmlBuilder";

export default class CategoriesLoad {
    static addCategories() {
        CategoriesLoad.printCategories();
    }

    static printCategories() {
        let categoriesBlock = document.querySelector('.ls-inner__categories__wrapper');
        let activeUser = Session.getInstance().getActiveUser();
        let dropMenu = CategoriesLoad.categoryDropDownMenu();

        activeUser.categories.forEach(category => {
            let categoryName = CategoriesLoad.createHTMLForEachContactInCategory('p', 'ls-inner__categories__contacts__header');
            let categoryOptions = CategoriesLoad.createHTMLForEachContactInCategory('button', 'ls-inner__categories__contacts__option');
            let categoryWrapper = CategoriesLoad.createHTMLForEachContactInCategory('div', 'ls-inner__categories__contacts-wrapper');
            let newCategory = CategoriesLoad.createHTMLForEachContactInCategory('div', 'ls-inner__categories__contacts');

            categoryName.innerText = category.name;
            categoryWrapper.dataset.id = category.id;

            categoryWrapper.appendChild(categoryName);
            categoryWrapper.appendChild(categoryOptions);

            newCategory.appendChild(categoryWrapper);
            categoriesBlock.appendChild(newCategory);

            categoryOptions.addEventListener('click', function (e) {
                e.stopPropagation();
                categoryWrapper.appendChild(dropMenu);

                dropMenu.classList.remove('hidden')
            });

            let categoryContactID = category.contacts;

            CategoriesLoad.showAllContactsOnClick(newCategory, categoryContactID, categoryName.innerText)
        });
    }

    static showAllContactsOnClick(category, contactsArrayID, header) {
        let activeUser = Session.getInstance().getActiveUser();
        let contacts = activeUser.contacts;

        category.addEventListener('click', () => {
            fetch('./AllContacts/AllContacts.html')
                .then(response => {
                    return response.text().then(function (text) {
                        constants.mainRightSideBlock.innerHTML = text;
                    })
                })
                .then(() => {
                    let headerText = document.querySelector('.main__block-header__text__add-contact');
                    headerText.innerText = header;

                    ContactBook.mobileOpen();
                    contacts.forEach(elem => {
                        let contactInfo = elem;

                        let currentContact = contactsArrayID.find(element =>
                            contactInfo.id === element
                        );

                        if (currentContact) {
                            const allContactsBlock = document.querySelector('.all-contacts');
                            ContactHtmlBuilder.createContactElements(allContactsBlock, contactInfo.name, contactInfo.surname, contactInfo.position, contactInfo.id, true)
                        }
                    })
                })
        });
    }

    static createHTMLForEachContactInCategory(tagName, className) {
        let newHTML = document.createElement(tagName);
        newHTML.classList.add(className);
        return newHTML;
    }

    static categoryDropDownMenu() {
        let categoryFunctions = new CategoryFunctions();
        let dropDownMenu = document.createElement('div');
        let dropDownMenuItem = document.createElement('div');
        let dropDownMenuItemText = document.createElement('p');

        dropDownMenu.classList.add('show');
        dropDownMenu.classList.add('drop-down');
        dropDownMenuItem.classList.add('drop-down__items');
        dropDownMenuItemText.classList.add('drop-down__items-p');
        dropDownMenuItemText.innerText = 'Delete';

        dropDownMenuItem.appendChild(dropDownMenuItemText);
        dropDownMenu.appendChild(dropDownMenuItem);

        dropDownMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        dropDownMenuItem.addEventListener('click', event => {
            categoryFunctions.delete(dropDownMenu);
            event.stopPropagation();
        });

        constants.main.addEventListener('click', () => {
            dropDownMenu.classList.remove('show');
            dropDownMenu.classList.add('hidden')
        });

        return dropDownMenu;
    };
}