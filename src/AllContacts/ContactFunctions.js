import CategoryFunctions from '../Categories/CategoryFunctions.js'
import ContactBook from "../Module.js"
import Session from "../Offline/Session";
import ContactsBook from "../Module";

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

            let searchIndex = contactArray.indexOf(elem => {
                return elem.id === id
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

            let category = Session.getInstance().getActiveUser().categories.find(function (elem) {
                return id === elem.id;
            });

            if (category !== undefined) {
                let contact = category.contacts.find(function (number) {
                    return number === contactID
                });

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
}