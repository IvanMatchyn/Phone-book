import * as constants from "../constants";
import ContactMenu from "./contactMenu.js";
import ContactBook from "../Module.js"


export default class AllContacts {
    constructor() {
    }

    loadAllContacts() {
        let book = new ContactBook();
        fetch('http://phonebook.hillel.it/api/phonebook?', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                return response.text();
            })
            .then(array => {
                let contactArray = JSON.parse(array);
                book.mobileOpen();
                this.showContactsHTML(contactArray);
            })
    }

    showContactsMenu() {
        const contactMenu = new ContactMenu();
        const allContactsButton = document.querySelector('#all-contacts-button');

        allContactsButton.addEventListener('click', () => {
            fetch('../AllContacts/AllContacts.html')
                .then(response => {
                    return response.text()
                })
                .then(html => {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = html;
                })
                .then(() => {
                    this.loadAllContacts();
                    contactMenu.showMenu();
                    contactMenu.editMenu();
                    contactMenu.createGroup();
                    contactMenu.deleteContact();
                    contactMenu.addContactToGroup();
                    this.deleteContact();
                })
        })
    }

    showContactsHTML(contactsArray) {
        let parentBlock = document.querySelector('.all-contacts');

        contactsArray.forEach(contact => {
            let newItem = document.createElement('div');

            newItem.classList.add('.all-contacts__items')
            parentBlock.appendChild(newItem);
            this.informationAboutCurrentContact(contact._id)
        })
    }

    informationAboutCurrentContact(contact) {
        fetch(`http://phonebook.hillel.it/api/phonebook/${contact}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => {
                return response.text();
            })

            .then(array => {
                console.log(array)
            })
    }

    deleteContact() {
        let deleteButton = document.querySelector('#delete-contact');

        deleteButton.addEventListener('click', function () {
            fetch('http://phonebook.hillel.it/api/phonebook/5c49e22ccea6322f734b1263', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response)
                })
        })
    }
}