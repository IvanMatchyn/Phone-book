import * as constants from "../constants";
import EditContact from '../editContact/editContact.js'
import GroupMenu from './groupsMenu.js'

export default class ContactMenu {
    constructor() {

    }

    showMenu() {
        const dotButton = document.querySelector('.all-contacts__items-options');
        const menu = document.querySelector('.all-contacts__items-options__menu');

        dotButton.addEventListener('click', () => {
            menu.classList.add('show');
        })

    }

    editMenu(){
        const editContact = new EditContact();
        const editButton = document.querySelector('#edit-contact');


        editButton.addEventListener('click', elem =>{
            editContact.onload();
        });
    }

    createGroup(){
        const groupMenu = new GroupMenu();
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

        addToGroup.addEventListener('click', function () {
            hiddenMenu.classList.add('show')
        });

    }
}