import * as constants from "../constants";
import ContactMenu from "./contactMenu.js";

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
        let answer = JSON.parse(servAnswer);
        const categoriesBlock = document.querySelector('.ls-inner__categories');


        answer.forEach(obj => {
            let categoryName = document.createElement('p')
            categoryName.classList.add('ls-inner__categories__contacts__header');
            categoryName.innerText = obj.name;

            let categoryOptions = document.createElement('button');
            categoryOptions.classList.add('ls-inner__categories__contacts__option');

            let categoryWrapper = document.createElement('div');
            categoryWrapper.classList.add('ls-inner__categories__contacts-wrapper');

            categoryWrapper.appendChild(categoryName);
            categoryWrapper.appendChild(categoryOptions);

            let newCategory = document.createElement('div');
            newCategory.classList.add('ls-inner__categories__contacts');
            newCategory.dataset.id = obj._id;

            newCategory.appendChild(categoryWrapper);
            categoriesBlock.appendChild(newCategory);
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
                .then(()=>{
                    contactMenu.showMenu();
                    contactMenu.editMenu();
                    contactMenu.createGroup();
                    contactMenu.deleteContact();
                    contactMenu.addContactToGroup();
                })
        })
    }
}