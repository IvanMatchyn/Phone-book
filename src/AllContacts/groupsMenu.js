import * as constants from "../constants";

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
            .then(()=>{
                this.create();
            })
    }

    delete() {

    }

    create() {
        const createButton = document.querySelector('.create-group__confirm');
        const createGroupValue = document.querySelector('.create-group__value');

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
                .then(response =>{
                    console.log(response)
                })
                .catch(err =>{
                    console.log(err);
                })
        })
    }

    createLink2(){
        const createButton2 = document.querySelector('.ls-inner__add-group__wrapper');

        createButton2.addEventListener('click', ()=>{
            this.onload();
        })
    }
}