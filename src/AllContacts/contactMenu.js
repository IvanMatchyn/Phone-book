import CategoryMenu from '../Categories/categoryMenu.js'
import ContactBook from "../Module.js"
import Session from "../Offline/Session";

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
            menu.classList.remove('show');
            menu.classList.add('hidden');
            hiddenMenu.classList.remove('show');
            hiddenMenu.classList.add('hidden');
        });
    }

    createGroup(button) {
        const groupMenu = new CategoryMenu();

        button.addEventListener('click', () => {
            groupMenu.onload();
        })
    }

    deleteContact(button, parentBlock) {
        let book = new ContactBook();
        let activeUser = Session.getInstance().getActiveUser();
        let usersArray = activeUser.contacts;

        button.addEventListener('click', function deleteContact() {
            let id = Number(parentBlock.getAttribute('data-id'));

            usersArray.forEach((elem, i) => {
                if (elem.id === id) {
                    usersArray.splice(i, 1);
                }
            });

            localStorage.setItem('Active User', JSON.stringify(activeUser));
            book.offlineSynchronization();
            parentBlock.remove();
        })
    }

    addContactToGroup(link, menu, groupLinks, contact) {
        let book = new ContactBook();
        let contactID = Number(contact.getAttribute('data-id'));

        link.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.add('show')
        });

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
                }
            }

            localStorage.setItem('Active User', JSON.stringify(Session.getInstance().getActiveUser()));
            book.offlineSynchronization();
            menu.classList.remove('show');
            menu.classList.add('hidden');
        });

    }
}