import * as constants from "../constants";
import LSideInnerBlock from "../LSideBlock/LSideBlock.js"

export default class GroupMenu {
    constructor() {
    }

    onload() {
        fetch('../AllContacts/createGroup.html')
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

        fetch(`http://phonebook.hillel.it/api/categories/${parentID}`, {
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
}