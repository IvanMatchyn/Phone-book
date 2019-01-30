import * as constants from "../constants";
import EditContact from '../EditContact/editContact.js'
import CategoryMenu from '../Categories/categoryMenu.js'

export default class ContactMenu {
    constructor() {

    }

    showMenu() {
        const dotButton = document.querySelector('.all-contacts__items-options');
        const menu = document.querySelector('.all-contacts__items-options__menu');
        const hiddenMenu = document.querySelector('.all-contacts__items-options__menu-addToGroup');
        const main = document.querySelector('.main');

        dotButton.addEventListener('click', (ev) => {
            menu.classList.add('show');
            ev.stopPropagation();
        });

        main.addEventListener('click', (ev)=>{
            menu.classList.remove('show');
            menu.classList.add('hidden');
            hiddenMenu.classList.remove('show');
            hiddenMenu.classList.add('hidden');
        });
    }

    editMenu(){
        const editContact = new EditContact();
        const editButton = document.querySelector('#edit-contact');


        editButton.addEventListener('click', elem =>{
            editContact.onload();
        });
    }

    createGroup(){
        const groupMenu = new CategoryMenu();
        const createGroupLink = document.querySelector('#create-group');

        createGroupLink.addEventListener('click', elem => {
            groupMenu.onload();
        })
    }

    deleteContact(){

    }

    addContactToGroup(){
        const addToGroup = document.querySelector('#addToGroup');
        const hiddenMenu = document.querySelector('.all-contacts__items-options__menu-addToGroup');

        addToGroup.addEventListener('click', function (e) {
            e.stopPropagation();
            hiddenMenu.classList.add('show')
        });
    }
}