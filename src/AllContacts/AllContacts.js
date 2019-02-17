import * as constants from "../Constants";
import ContactMenu from "./contactMenu.js";
import ContactBook from "../Module.js"
import Session from "../Offline/Session";
import EditContact from '../EditContact/editContact.js'

//rename to ContactHtmlBuilder
export default class AllContacts {
    constructor() {
    }

    loadAllContacts() {
        let contactsArray = Session.getInstance().getActiveUser().contacts;
        this.showAllContacts(contactsArray);
    }

    showAllContacts(array) {
        let book = new ContactBook();

        fetch('./AllContacts/AllContacts.html')
            .then(response => {
                return response.text().then(function (text) {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(() => {
                const allContactBLock = document.querySelector('.all-contacts');
                //Create units class like validate class (use static function or singleton )
                book.mobileOpen();
                array.forEach(elem => {
                    this.createContactElements(allContactBLock, elem.name, elem.surname, elem.position, elem.id);
                })
            });

    }

    createContactElements(link, name, surname, description, id, forCategories) {
        const contactMenu = new ContactMenu();
        const editMenu = new EditContact();

        let categoryArray = Session.getInstance().getActiveUser().categories;

        let contactItemElem = this.createElementWithClass('div', null, 'all-contacts__items');
        let contactPhotoElem = this.createElementWithClass('div', null, 'all-contacts__items-photo');
        let contactDescWrapperElem = this.createElementWithClass('div', null, 'all-contacts__items-desc');
        let contactNameElem = this.createElementWithClass('div', name + ' ' + surname, 'all-contacts__items-desc__name');
        let contactDescriptionElem = this.createElementWithClass('div', description, 'all-contacts__items-desc__text');
        let contactOptionsWrapperElem = this.createElementWithClass('div', null, 'all-contacts__items-options__wrapper');
        let contactOptionButtonElem = this.createElementWithClass('button', null, 'all-contacts__items-options');
        let contactOptionMenuElem = this.createElementWithClass('div', null, 'all-contacts__items-options__menu');
        let editContactLinkElem = this.createElementWithClass('div', 'Edit Contact', 'all-contacts__items-options__menu-items', 'edit-contact-func');
        let deleteContactLinkElem = this.createElementWithClass('div', 'Delete', 'all-contacts__items-options__menu-items', 'delete-contact-func');
        let createGroupLinkElementElem = this.createElementWithClass('div', 'Create Group', 'all-contacts__items-options__menu-items', 'create-group-func');
        let addToGroupElem = this.createElementWithClass('div', 'all-contacts__items-options__menu-items', 'addToGroup-func');
        let addToGroupNameElem = this.createElementWithClass('p', 'Add To Group', 'all-contacts__items-options__menu-items-p');
        let addToGroupArrowElem = this.createElementWithClass('img', 'all-contacts__items-options__menu-items-img');
        let addToGroupMenuElem = this.createElementWithClass('div', 'all-contacts__items-options__menu-addToGroup');

        contactItemElem.dataset.id = id;

        contactItemElem.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSingleContactInfo(contactItemElem, id);
        });

        contactMenu.showMenu(contactOptionButtonElem, contactOptionMenuElem, addToGroupMenuElem);
        contactMenu.addCreateGroupEvent(createGroupLinkElementElem);
        contactMenu.deleteContact(deleteContactLinkElem, contactItemElem);

        contactDescWrapperElem.appendChild(contactNameElem);
        contactDescWrapperElem.appendChild(contactDescriptionElem);

        contactOptionsWrapperElem.appendChild(contactOptionButtonElem);

        editContactLinkElem.addEventListener('click', (e) => {
            e.stopPropagation();
            editMenu.onload(editContactLinkElem, id);
        });

        addToGroupArrowElem.setAttribute('src', '../img/addToGroup.png');

        addToGroupElem.appendChild(addToGroupNameElem);
        addToGroupElem.appendChild(addToGroupArrowElem);

        contactOptionMenuElem.appendChild(editContactLinkElem);
        contactOptionMenuElem.appendChild(deleteContactLinkElem);
        contactOptionMenuElem.appendChild(createGroupLinkElementElem);
        contactOptionMenuElem.appendChild(addToGroupElem);

        categoryArray.forEach(category => {
            let addToGroupMenuItems = this.createElementWithClass('div', category.name, 'all-contacts__items-options__menu-items');
            addToGroupMenuItems.dataset.id = category.id;
            addToGroupMenuElem.appendChild(addToGroupMenuItems);
            contactMenu.addContactToGroup(addToGroupElem, addToGroupMenuElem, addToGroupMenuItems, contactItemElem);
        });

        contactItemElem.appendChild(contactPhotoElem);
        contactItemElem.appendChild(contactDescWrapperElem);
        contactItemElem.appendChild(contactOptionsWrapperElem);
        contactItemElem.appendChild(contactOptionMenuElem);
        contactItemElem.appendChild(addToGroupMenuElem);

        if (forCategories) {
            //move to method createRemoveButton ....
            let remove = this.createElementWithClass('div', 'Remove from Category', 'all-contacts__items-options__menu-items', 'remove-contact-func');
            contactOptionMenuElem.insertBefore(remove, addToGroupElem);
            addToGroupMenuElem.style.top = '178px';

            remove.addEventListener('click', ev => {
                ev.stopPropagation();
                console.log(id)
            })
        }

        link.appendChild(contactItemElem);
    }

    createElementWithClass(elementType, innerText, ...classNameList) {
        let element = document.createElement(elementType);

        if (innerText !== null) {
            element.innerText = innerText;
        }

        classNameList.forEach(className => {
            element.classList.add(className)
        });

        return element;
    }

    showSingleContactInfo(contact, id) {
        fetch('../ContactInfo/ContactInfo.html')
            .then(response => {
                return response.text().then(function (text) {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(() => {
                let contactID;
                contactID = id;
                loadInfo(contactID);
            });

        function loadInfo(id) {
            let activeUser = Session.getInstance().getActiveUser();
            let contactsArray = activeUser.contacts;

            let name = document.querySelector('.contact-info__header-desc__initials-h1');
            let description = document.querySelector('.contact-info__header-desc__information-text');
            let phone = document.querySelector('#contact-info-phone');
            let email = document.querySelector('#contact-info-email');
            let birthDate = document.querySelector('#contact-info-birthDate');
            let info = document.querySelector('#contact-info-info');

            let infoArray = [name, description, phone, email, birthDate, info];

            contactsArray.forEach(elem => {
                if (elem.id === id) {
                    name.innerText = `${elem.name} ${elem.surname}`;
                    description.innerText = elem.position;
                    phone.innerText = elem.phone;
                    birthDate.innerText = elem.bornDate;
                    email.innerText = elem.email;
                    info.innerText = elem.information;
                }
            });

            infoArray.forEach(elem => {
                if (elem.innerText === 'undefined') {
                    elem.innerText = '';
                }
            })
        }
    }
}