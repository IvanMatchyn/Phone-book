import * as constants from "../constants";
import LSideInnerBlock from "../LSideBlock/LSideBlock.js"
import ContactsBook from "../Module.js"

export default class CategoryMenu {
    constructor() {
    }

    onload() {
        let book = new ContactsBook();
        fetch('../Categories/createCategory.html')
            .then(response => {
                return response.text()
            })
            .then(html => {
                constants.MAIN_RSIDE_BLOCK.innerHTML = html;
            })
            .then(() => {
                book.mobileOpen();
                this.create();
            })
    }

    delete(parentElem) {
        let parentID = parentElem.parentElement.getAttribute('data-id');

        fetch(`http://phonebook.hillel.it/api/phonebook/${parentID}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.text())
            })
    }

    create() {
        const createButton = document.querySelector('.create-group__confirm');
        const createGroupValue = document.querySelector('.create-group__value');
        const createPar = document.querySelector('.create-group');
        const leftBlockOnload = new LSideInnerBlock;


        let newGroup = {};

        createButton.addEventListener('click', () => {
            newGroup.name = createGroupValue.value;

            let newGroupJSON = JSON.stringify(newGroup);


            fetch('http://phonebook.hillel.it/api/categories', {
                method: 'POST',
                body: newGroupJSON,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 500) {
                        createGroupValue.classList.add('wrong-info')
                        let errorMsg = document.createElement("p");
                        errorMsg.classList.add('wrong-text');
                        errorMsg.innerText = 'Group with this name already existed';
                        createPar.insertBefore(errorMsg, createButton);
                    }
                });

            leftBlockOnload.onload();
        })
    }

    createLink2() {
        const createButton2 = document.querySelector('.ls-inner__add-group__wrapper');

        createButton2.addEventListener('click', () => {
            this.onload();
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