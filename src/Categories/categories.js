import * as constants from "../constants";
import CategoryMenu from './categoryMenu.js'
import AllContact from "../AllContacts/AllContacts.js"
import Session from "../Offline/Session";
import ContactBook from "../Module";

export default class Categories {
    constructor() {

    }

    loadCategories() {
        let mode = constants.myStorage.getItem('mode');

        if (mode === 'online') {
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
        } else if (mode === 'offline') {
            this.addCategories()
        }

    }

    addCategories(servAnswer) {
        const categoriesBlock = document.querySelector('.ls-inner__categories__wrapper');
        let allCCategories = new CategoryMenu();
        let answer = '';
        let dropMenu = allCCategories.categoryDropDownMenu();
        let mode = constants.myStorage.getItem('mode');
        let activeUser = Session.getInstance().getActiveUser();

        if (mode === 'online') {
            answer = JSON.parse(servAnswer);
        } else if (mode === 'offline') {
            answer = activeUser.categories;
        }

        answer.forEach(obj => {
            let categoryName = document.createElement('p');
            categoryName.classList.add('ls-inner__categories__contacts__header');
            categoryName.innerText = obj.name;

            let categoryOptions = document.createElement('button');
            categoryOptions.classList.add('ls-inner__categories__contacts__option');

            let categoryWrapper = document.createElement('div');
            categoryWrapper.classList.add('ls-inner__categories__contacts-wrapper');

            if (mode === 'online') {
                categoryWrapper.dataset.id = obj._id;
            } else if (mode === 'offline') {
                categoryWrapper.dataset.id = obj.id
            }


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

            let categoryContactID = obj.contacts;

            this.showContactsInCategory(newCategory, categoryContactID, categoryName.innerText)
        });

        constants.MAIN.addEventListener('click', () => {
            dropMenu.classList.remove('show');
            dropMenu.classList.add('hidden')
        });


    }

    showContactsInCategory(category, contactsArrayID, header) {
        let book = new ContactBook();
        let allContactHTML = new AllContact();
        let activeUser = Session.getInstance().getActiveUser();

        let contacts = activeUser.contacts;

        category.addEventListener('click', () => {
            fetch('./AllContacts/AllContacts.html')
                .then(response => {
                    return response.text().then(function (text) {
                        constants.MAIN_RSIDE_BLOCK.innerHTML = text;

                    })
                })
                .then(() => {
                    let headerText = document.querySelector('.main__block-header__text__add-contact');
                    headerText.innerText = header;

                    book.mobileOpen();
                    contacts.forEach(elem => {
                        let contactInfo = elem;

                        contactsArrayID.forEach(number => {
                            if (contactInfo.id === number) {
                                const allContactsBlock = document.querySelector('.all-contacts');
                                allContactHTML.createElements(allContactsBlock, contactInfo.name, contactInfo.surname, contactInfo.position, contactInfo.id, true)
                                // this.removeFromCategory();
                            }
                        })
                    })
                })
        });
    }

    // removeFromCategory(){
    //     let removeButton = document.querySelector();
    // }
}