import CategoryFunctions from '../Categories/CategoryFunctions.js'
import ContactBook from "../Module.js"
import Session from "../Offline/Session";
import ContactsBook from "../Module";

export default class ContactMenu {
    constructor() {

    }

    showMenu(button, menu, hiddenMenu) {
        const main = document.querySelector('.main');

        button.addEventListener('click', (ev) => {
            menu.classList.remove('hidden');
            menu.classList.add('show');
            ev.stopPropagation();
        });

        main.addEventListener('click', (ev) => {
            ev.stopPropagation();
            menu.classList.remove('show');
            menu.classList.add('hidden');
            hiddenMenu.classList.remove('show');
            hiddenMenu.classList.add('hidden');
        });
    }

    addCreateGroupEvent(button) {
        const groupMenu = new CategoryFunctions();

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            groupMenu.onload();
        })
    }

    deleteContact(button, parentBlock) {
        let book = new ContactBook();
        let activeUser = Session.getInstance().getActiveUser();
        let usersArray = activeUser.contacts;

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