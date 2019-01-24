import * as constants from "../constants";
import ContactMenu from "./contactMenu.js";
import GroupMenu from './groupsMenu.js'

export default class AllContacts {
    constructor() {
    }

    loadCategories() {
        fetch('http://phonebook.hillel.it/api/categories?', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.text();

            })

            .then(array => {
                this.addCategories(array)

            })

            .catch(err => {
                console.log(err);
            })
    }

    addCategories(servAnswer) {
        let allContacts = this;
        let answer = JSON.parse(servAnswer);
        let dropMenu = allContacts.groupsDropDownMenu();
        const categoriesBlock = document.querySelector('.ls-inner__categories__wrapper');


        answer.forEach(obj => {
            let categoryName = document.createElement('p');
            categoryName.classList.add('ls-inner__categories__contacts__header');
            categoryName.innerText = obj.name;

            let categoryOptions = document.createElement('button');
            categoryOptions.classList.add('ls-inner__categories__contacts__option');

            let categoryWrapper = document.createElement('div');
            categoryWrapper.classList.add('ls-inner__categories__contacts-wrapper');
            categoryWrapper.dataset.id = obj._id;

            categoryWrapper.appendChild(categoryName);
            categoryWrapper.appendChild(categoryOptions);

            let newCategory = document.createElement('div');
            newCategory.classList.add('ls-inner__categories__contacts');


            newCategory.appendChild(categoryWrapper);
            categoriesBlock.appendChild(newCategory);

            categoryOptions.addEventListener('click', function (e) {
                e.stopPropagation();
                categoryWrapper.appendChild(dropMenu);
                dropMenu.classList.remove('hidden')
            });
        });

        constants.MAIN.addEventListener('click', () => {
            dropMenu.classList.remove('show');
            dropMenu.classList.add('hidden')
        })


    }

    showContacts() {
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
                    contactMenu.showMenu();
                    contactMenu.editMenu();
                    contactMenu.createGroup();
                    contactMenu.deleteContact();
                    contactMenu.addContactToGroup();
                })
        })
    }

    groupsDropDownMenu() {
        let groupFunctions = new GroupMenu();
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
            groupFunctions.delete(dropDownMenu);
            event.stopPropagation();
        });

        return dropDownMenu;
    }
}