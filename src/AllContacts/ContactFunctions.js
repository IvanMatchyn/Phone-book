import CategoryFunctions from '../Categories/CategoryFunctions.js'
import ContactBook from "../Module.js"
import Session from "../Offline/Session";

export default class ContactFunctions {
    constructor() {

    }

    addCreateGroupEvent(button) {
        const groupMenu = new CategoryFunctions();

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            groupMenu.onload();
        })
    }

    addEventDeleteContact(button, id) {
        let activeUser = Session.getInstance().getActiveUser();
        let contactArray = activeUser.contacts;

        button.addEventListener('click', function (ev) {
            ev.stopPropagation();


            let searchElem = contactArray.find(elem =>
                elem.id === id
            );

            let searchIndex = contactArray.indexOf(searchElem);

            activeUser.categories.forEach(elem => {
                if (elem.contacts.includes(id)) {
                    let indexSearchedID = elem.contacts.indexOf(id);
                    elem.contacts.splice(indexSearchedID, 1);
                }
            });

            contactArray.splice(searchIndex, 1);
            Session.getInstance().saveToStorage();
            ContactBook.offlineSynchronization();
            button.parentElement.parentElement.remove();
        })
    }

    addEventMoveContactToGroup(link, menu, groupLinks, contact) {
        let contactID = Number(contact.getAttribute('data-id'));

        groupLinks.addEventListener('click', (ev) => {
            ev.stopPropagation();
            let id = Number(groupLinks.getAttribute('data-id'));

            let category = Session.getInstance().getActiveUser().categories.find(elem =>
                id === elem.id
            );

            if (category !== undefined) {
                let contact = category.contacts.find(number =>
                    number === contactID
                );

                if (contact === undefined) {
                    category.contacts.push(contactID);
                    localStorage.setItem('Active User', JSON.stringify(Session.getInstance().getActiveUser()));
                    ContactBook.offlineSynchronization();
                }
            }

            let mainMenu = menu.previousSibling;
            menu.remove();
            mainMenu.remove();
        });
    }

    addEventRemoveFromCategory(contactID, parent) {
        let categoryName = document.querySelector('.main__block-header__text__add-contact');
        let activeUser = Session.getInstance().getActiveUser();
        let categoryArray = activeUser.categories;

        let searchedCategory = categoryArray.find(category =>
            category.name === categoryName.innerText
        );

        let searchedContactID = searchedCategory.contacts.indexOf(contactID);

        searchedCategory.contacts.splice(searchedContactID, 1);

        Session.getInstance().saveToStorage();
        ContactBook.offlineSynchronization();

        parent.remove();
    }
}