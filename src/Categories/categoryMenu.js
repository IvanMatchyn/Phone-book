import * as constants from "../constants";
import LSideInnerBlock from "../LSideBlock/LSideBlock.js"
import ContactsBook from "../Module.js"
import Session from "../Offline/Session";

export default class CategoryMenu {
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
                this.create();
            })
    }

    delete(parentElem) {
        let parentID = parentElem.parentElement.getAttribute('data-id');
        const book = new ContactsBook;
        const leftBlock = new LSideInnerBlock;

        let activeUser = Session.getInstance().getActiveUser();
        let categoriesArray = activeUser.categories;

        categoriesArray.forEach((elem, i) => {
            if (elem.id === Number(parentID)) {
                categoriesArray.splice(i, 1);
            }
        });

        localStorage.setItem('Active User', JSON.stringify(activeUser));
        book.offlineSynchronization();
        leftBlock.onload();
    }

    create() {
        const createButton = document.querySelector('.create-group__confirm');
        const createGroupValue = document.querySelector('.create-group__value');
        const leftBlock = new LSideInnerBlock;
        const book = new ContactsBook;
        let result = document.querySelector('.create-group__result');
        let createInput = document.querySelector('.create-group__value');
        let activeUser = Session.getInstance().getActiveUser();

        createButton.addEventListener('click', () => {
            let maxCategoryID = localStorage.getItem('maxCategoryID');

            let newCategory = {
                id: Number(maxCategoryID) + 1,
                name: createGroupValue.value,
                contacts: []
            };

            let groupAlreadyExist = false;

            activeUser.categories.forEach(elem => {
                if (elem.name === createGroupValue.value) {
                    groupAlreadyExist = true;
                }
            });

            if (groupAlreadyExist) {
                createGroupValue.classList.add('wrong-info');
                result.innerText = 'Category with this name already existed';
                result.classList.add('wrong-text');
                result.classList.remove('good-text');
                result.style.display = 'block';
            } else {
                successfulCreation();
            }


            function successfulCreation() {
                result.innerText = 'Category "' + newCategory.name + '" was created';
                result.classList.remove('wrong-text');
                result.classList.add('good-text');
                createInput.classList.remove('wrong-info');
                result.style.display = 'block';

                let updatedMaxCategoryID = newCategory.id;
                localStorage.setItem('maxCategoryID', `${updatedMaxCategoryID}`);

                activeUser.categories.push(newCategory);
                Session.getInstance().saveToStorage();
                book.offlineSynchronization();

                createGroupValue.value = '';

                leftBlock.onload();
            }
        })
    }

    categoryDropDownMenu() {
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
            this.delete(dropDownMenu);
            event.stopPropagation();
        });

        return dropDownMenu;
    }
}