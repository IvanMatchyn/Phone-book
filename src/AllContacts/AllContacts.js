import * as constants from "../Constants";
import ContactMenu from "./contactMenu.js";
import ContactBook from "../Module.js"
import Session from "../Offline/Session";
import EditContact from '../EditContact/editContact.js'


export default class AllContacts {
    constructor() {
    }

    loadAllContacts() {
        Session.getInstance().loadActiveUser();
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
                book.mobileOpen();
                array.forEach(elem => {
                    this.createContactElements(allContactBLock, elem.name, elem.surname, elem.position, elem.id);
                })
            });

    }

    createElements(link, name, surname, description, id, forCategories) {
        const contactMenu = new ContactMenu();
        const editMenu = new EditContact();

        let activeUser = Session.getInstance().getActiveUser();
        let categoryArray = activeUser.categories;

        let contactItem = document.createElement('div');
        let contactPhoto = document.createElement('div');
        let contactDescWrapper = document.createElement('div');
        let contactName = document.createElement('div');
        let contactDesc = document.createElement('div');
        let contactOptionsWrapper = document.createElement('div');
        let contactOptionButton = document.createElement('button');
        let contactOptionMenu = document.createElement('div');
        let editContactLink = document.createElement('div');
        let deleteContactLink = document.createElement('div');
        let createGroupLink = document.createElement('div');
        let addToGroup = document.createElement('div');
        let addToGroupName = document.createElement('p');
        let addToGroupArrow = document.createElement('img');
        let addToGroupMenu = document.createElement('div');


        contactItem.classList.add('all-contacts__items');
        contactItem.dataset.id = id;

        contactItemElem.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSingleContactInfo(contactItemElem, id);
        });

        contactMenu.showMenu(contactOptionButton, contactOptionMenu, addToGroupMenu);
        contactMenu.createGroup(createGroupLink);
        contactMenu.deleteContact(deleteContactLink, contactItem);

        contactPhoto.classList.add('all-contacts__items-photo');

        contactDescWrapper.classList.add('all-contacts__items-desc');
        contactName.classList.add('all-contacts__items-desc__name');
        contactDesc.classList.add('all-contacts__items-desc__text');

        contactName.innerText = name + ' ' + surname;
        contactDesc.innerText = description;

        contactDescWrapperElem.appendChild(contactNameElem);
        contactDescWrapperElem.appendChild(contactDescriptionElem);

        contactOptionsWrapper.classList.add('all-contacts__items-options__wrapper');
        contactOptionButton.classList.add('all-contacts__items-options');

        contactOptionsWrapper.appendChild(contactOptionButton);

        contactOptionMenu.classList.add('all-contacts__items-options__menu');

        editContactLink.classList.add('all-contacts__items-options__menu-items');
        editContactLink.classList.add('edit-contact-func');
        editContactLink.innerText = 'Edit Contact';

        editContactLinkElem.addEventListener('click', (e) => {
            e.stopPropagation();
            editMenu.onload(editContactLinkElem, id);
        });

        deleteContactLink.classList.add('all-contacts__items-options__menu-items');
        deleteContactLink.classList.add('delete-contact-func');
        deleteContactLink.innerText = 'Delete';

        createGroupLink.classList.add('all-contacts__items-options__menu-items');
        createGroupLink.classList.add('create-group-func');
        createGroupLink.innerText = 'Create Group';

        addToGroup.classList.add('all-contacts__items-options__menu-items');
        addToGroup.classList.add('addToGroup-func');

        addToGroupName.classList.add('all-contacts__items-options__menu-items-p');
        addToGroupName.innerText = 'Add To Group';
        addToGroupArrow.classList.add('all-contacts__items-options__menu-items-img');
        addToGroupArrow.setAttribute('src', '../img/addToGroup.png');

        addToGroupElem.appendChild(addToGroupNameElem);
        addToGroupElem.appendChild(addToGroupArrowElem);

        contactOptionMenuElem.appendChild(editContactLinkElem);
        contactOptionMenuElem.appendChild(deleteContactLinkElem);
        contactOptionMenuElem.appendChild(createGroupLinkElementElem);
        contactOptionMenuElem.appendChild(addToGroupElem);

        addToGroupMenu.classList.add('all-contacts__items-options__menu-addToGroup');

        categoryArray.forEach(category => {
            let addToGroupMenuItems = document.createElement('div');
            addToGroupMenuItems.classList.add('all-contacts__items-options__menu-items');
            addToGroupMenuItems.innerText = category.name;
            addToGroupMenuItems.dataset.id = category.id;
            addToGroupMenuElem.appendChild(addToGroupMenuItems);
            contactMenu.addContactToGroup(addToGroupElem, addToGroupMenuElem, addToGroupMenuItems, contactItemElem);
        });

        contactItemElem.appendChild(contactPhotoElem);
        contactItemElem.appendChild(contactDescWrapperElem);
        contactItemElem.appendChild(contactOptionsWrapperElem);
        contactItemElem.appendChild(contactOptionMenuElem);
        contactItemElem.appendChild(addToGroupMenuElem);

        if (forCategories === true) {
            let remove = document.createElement('div');
            remove.classList.add('all-contacts__items-options__menu-items');
            remove.classList.add('remove-contact-func');
            remove.innerText = 'Remove from Category';
            contactOptionMenu.insertBefore(remove, addToGroup);
            addToGroupMenu.style.top = '178px';

            remove.addEventListener('click', ev => {
                ev.stopPropagation();
                console.log(id)
            })
        }

        link.appendChild(contactItemElem);
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