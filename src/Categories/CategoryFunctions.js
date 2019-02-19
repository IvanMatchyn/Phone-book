import * as constants from "../Constants";
import HomePage from "../HomePage/HomePage.js"
import ContactsBook from "../Module.js"
import Session from "../Offline/Session";


export default class CategoryFunctions {
    constructor() {
    }

    onload() {
        fetch('../Categories/createCategory.html')
            .then(response => {
                return response.text()
            })
            .then(html => {
                constants.MAIN_RSIDE_BLOCK.innerHTML = html;
            })
            .then(() => {
                ContactsBook.mobileOpen();
                this.create();
            })
    }

    delete(parentElem) {
        const parentID = parentElem.parentElement.getAttribute('data-id');
        const leftBlock = new HomePage;

        let activeUser = Session.getInstance().getActiveUser();
        let categoriesArray = activeUser.categories;

        categoriesArray.forEach((elem, i) => {
            if (elem.id === Number(parentID)) {
                categoriesArray.splice(i, 1);
            }
        });

        Session.getInstance().saveToStorage();
        ContactsBook.offlineSynchronization();
        leftBlock.onload();
    }

    create() {
        const createButton = document.querySelector('.create-group__confirm');
        const createGroupValue = document.querySelector('.create-group__value');
        const leftBlock = new HomePage;
        const result = document.querySelector('.create-group__result');
        const createInput = document.querySelector('.create-group__value');
        const activeUser = Session.getInstance().getActiveUser();

        createButton.addEventListener('click', () => {
            let groupAlreadyExist = activeUser.categories.find(elem => {
                return elem.name === createGroupValue.value
            });

            if (groupAlreadyExist) {
                createGroupValue.classList.add('wrong-info');
                result.innerText = 'Category with this name already existed';
                result.classList.add('wrong-text');
                result.classList.remove('good-text');
                result.style.display = 'block';
            } else {
                let maxCategoryID = localStorage.getItem('maxCategoryID');

                let newCategory = {
                    id: Number(maxCategoryID) + 1,
                    name: createGroupValue.value,
                    contacts: []
                };
                successfulCreation(newCategory);
            }

            function successfulCreation(category) {
                result.innerText = 'Category "' + category.name + '" was created';
                result.classList.remove('wrong-text');
                result.classList.add('good-text');
                createInput.classList.remove('wrong-info');
                result.style.display = 'block';

                let updatedMaxCategoryID = category.id;

                localStorage.setItem('maxCategoryID', `${updatedMaxCategoryID}`);
                activeUser.categories.push(category);
                Session.getInstance().saveToStorage();
                ContactsBook.offlineSynchronization();
                createGroupValue.value = '';
                leftBlock.onload();
            }
        })
    }
}