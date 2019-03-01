import * as constants from "../Constants";
import ContactFunctions from "./ContactFunctions.js";
import ContactBook from "../Module.js"
import Session from "../Offline/Session";
import EditContact from '../EditContact/EditContact.js'

export default class ContactHtmlBuilder {
    loadAllContacts() {
        let contactsArray = Session.getInstance().getActiveUser().contacts;
        this.showAllContacts(contactsArray);
    }

    showAllContacts(array) {
        fetch('./AllContacts/AllContacts.html')
            .then(response => {
                return response.text().then(function (text) {
                    constants.mainRightSideBlock.innerHTML = text;
                })
            })
            .then(() => {
                const allContactBLock = document.querySelector('.all-contacts');
                ContactBook.mobileOpen();
                array.forEach(elem => {
                    ContactHtmlBuilder.createContactElements(allContactBLock, elem.name, elem.surname, elem.position, elem.id);
                })
            });

    }

    static createContactElements(link, name, surname, description, id, forCategories) {
        const contactMenu = new ContactFunctions();
        const thisClass = new ContactHtmlBuilder();
        const editMenu = new EditContact();
        const categoryArray = Session.getInstance().getActiveUser().categories;
        const newContact = createItemsFields(id);

        addEventShowContactInfo(newContact);

        function createItemsFields(id) {
            let contactItemElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items');
            let contactPhotoElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items-photo');
            let contactDescWrapperElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items-desc');
            let contactNameElem = ContactHtmlBuilder.createElementWithClass('div', name + ' ' + surname, 'all-contacts__items-desc__name');
            let contactDescriptionElem = ContactHtmlBuilder.createElementWithClass('div', description, 'all-contacts__items-desc__text');
            let contactOptionButtonElem = ContactHtmlBuilder.createElementWithClass('button', null, 'all-contacts__items-options');

            contactDescWrapperElem.appendChild(contactNameElem);
            contactDescWrapperElem.appendChild(contactDescriptionElem);

            contactItemElem.appendChild(contactPhotoElem);
            contactItemElem.appendChild(contactDescWrapperElem);
            contactItemElem.appendChild(contactOptionButtonElem);

            contactOptionButtonElem.addEventListener('click', (e) => {
                e.stopPropagation();
                let childrenArray = [...contactItemElem.children];
                let dropDownMenuFind = childrenArray.find(menu =>
                    menu.classList.contains('all-contacts__items-options__menu')
                );

                if (!dropDownMenuFind) {
                    contactItemElem.appendChild(createDropDownMenu(contactItemElem));
                }
            });

            contactItemElem.dataset.id = id;

            return contactItemElem
        }

        function createDropDownMenu(parentElement) {
            let contactOptionMenuElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items-options__menu');

            let editContactLinkElem = ContactHtmlBuilder.createElementWithClass('div', 'Edit Contact', 'all-contacts__items-options__menu-items', 'edit-contact-func');
            let deleteContactLinkElem = ContactHtmlBuilder.createElementWithClass('div', 'Delete', 'all-contacts__items-options__menu-items', 'delete-contact-func');
            let createGroupLinkElementElem = ContactHtmlBuilder.createElementWithClass('div', 'Create Group', 'all-contacts__items-options__menu-items', 'create-group-func');
            let addToGroupElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items-options__menu-items', 'addToGroup-func');

            let addToGroupNameElem = ContactHtmlBuilder.createElementWithClass('p', 'Add To Group', 'all-contacts__items-options__menu-items-p');
            let addToGroupArrowElem = ContactHtmlBuilder.createElementWithClass('img', null, 'all-contacts__items-options__menu-items-img');

            contactOptionMenuElem.appendChild(editContactLinkElem);
            contactOptionMenuElem.appendChild(deleteContactLinkElem);
            contactOptionMenuElem.appendChild(createGroupLinkElementElem);
            contactOptionMenuElem.appendChild(addToGroupElem);

            addToGroupArrowElem.setAttribute('src', constants.ARROW_IMG_PATH);

            addToGroupElem.appendChild(addToGroupNameElem);
            addToGroupElem.appendChild(addToGroupArrowElem);


            addEventsToDropDownMenuItems(editContactLinkElem, createGroupLinkElementElem, deleteContactLinkElem, addToGroupElem, parentElement);
            deleteDropDownMenu(contactOptionMenuElem);
            addRemoveFromCategoryLink(forCategories, contactOptionMenuElem, addToGroupElem);

            return contactOptionMenuElem;
        }

        function addEventsToDropDownMenuItems(editLink, createCategoryLink, deleteLink, addToGroupLink, parentElement) {
            contactMenu.addCategoryGroupEvent(createCategoryLink);
            contactMenu.addEventDeleteContact(deleteLink, id);

            editLink.addEventListener('click', (e) => {
                e.stopPropagation();
                editMenu.onload(editLink, id);
            });

            addToGroupLink.addEventListener('click', (e) => {
                e.stopPropagation();
                createAddContactToCategoryMenu(addToGroupLink, parentElement, forCategories)
            })
        }

        function deleteDropDownMenu(dropDownMenu) {
            const main = document.querySelector('.main');

            main.addEventListener('click', (ev) => {
                ev.stopPropagation();
                dropDownMenu.remove();
            });
        }

        function createAddContactToCategoryMenu(addToCategoryLink, parentElement, forCategories) {
            let addToGroupMenuElem = ContactHtmlBuilder.createElementWithClass('div', null, 'all-contacts__items-options__menu-addToGroup');

            categoryArray.forEach(category => {
                let addToGroupMenuItems = ContactHtmlBuilder.createElementWithClass('div', category.name, 'all-contacts__items-options__menu-items');
                addToGroupMenuItems.dataset.id = category.id;
                addToGroupMenuElem.appendChild(addToGroupMenuItems);

                addToGroupMenuItems.style.textTransform = 'capitalize';
                contactMenu.addEventMoveContactToGroup(addToCategoryLink, addToGroupMenuElem, addToGroupMenuItems, parentElement);
            });

            let childrenArray = [...parentElement.children];
            let dropDownMenuFind = childrenArray.find(menu =>
                menu.classList.contains('all-contacts__items-options__menu-addToGroup')
            );

            if (!dropDownMenuFind) {
                parentElement.appendChild(addToGroupMenuElem);
            }

            if (forCategories) {
                addToGroupMenuElem.style.top = '178px';
            }

            deleteDropDownMenu(addToGroupMenuElem);
        }

        function addEventShowContactInfo(contact) {
            contact.addEventListener('click', (e) => {
                e.stopPropagation();
                thisClass.showSingleContactInfo(contact, id);
            });
        }

        function addRemoveFromCategoryLink(forCategories, dropDownMenu, prevElem) {
            if (forCategories) {
                let remove = ContactHtmlBuilder.createElementWithClass('div', 'Remove from Category', 'all-contacts__items-options__menu-items', 'remove-contact-func');
                dropDownMenu.insertBefore(remove, prevElem);

                remove.addEventListener('click', ev => {
                    ev.stopPropagation();
                    contactMenu.addEventRemoveFromCategory(id, dropDownMenu.parentElement)
                })
            }
        }

        link.appendChild(newContact);
    }

    static createElementWithClass(elementType, innerText, ...classNameList) {
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
                    constants.mainRightSideBlock.innerHTML = text;
                })
            })
            .then(() => {
                ContactBook.mobileOpen();
                loadInfo(id);
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

            let searchContact = contactsArray.find(elem =>
                elem.id === id
            );

            if (searchContact) {
                name.innerText = `${searchContact.name} ${searchContact.surname}`;
                description.innerText = searchContact.position;
                phone.innerText = searchContact.phone;
                birthDate.innerText = searchContact.bornDate;
                email.innerText = searchContact.email;
                info.innerText = checkEmptyField(searchContact.information);
            }

            infoArray.forEach(elem => {
                if (elem.innerText === 'undefined') {
                    elem.innerText = '';
                }
            });

            function checkEmptyField(field) {
                if (field === undefined) {
                    return '';
                } else {
                    return field
                }
            }
        }
    }
}