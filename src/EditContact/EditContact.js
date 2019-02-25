import * as constants from "../Constants";
import Session from "../Offline/Session";
import ContactBook from "../Module.js"

export default class EditContact {
    onload(link, id) {
        fetch('../EditContact/EditContact.html')
            .then(response => {
                return response.text().then(text => {
                    constants.mainRightSideBlock.innerHTML = text;
                })
            })
            .then(() => {
                this.addEventEditContact(link, id);
            });
    }

    addEventEditContact(link, id) {
        let saveButton = document.querySelector('.add-contact__buttons__text');
        let header = document.querySelector('.main__block-header__text__add-contact');

        header.innerText = 'Edit Contact';

        let editContactName = document.querySelector('#addContact-name');
        let editContactSurName = document.querySelector('#addContact-surname');
        let editContactDescription = document.querySelector('.add-contact__initials__desc__textarea');
        let editContactPhone = document.querySelector('#addContact-phone');
        let editContactEmail = document.querySelector('#addContact-email');
        let editContactBirthDate = document.querySelector('#addContact-birthDate');
        let editContactInfo = document.querySelector('#addContact-info');
        let editContactInstagram = document.querySelector('#addContact-instagramm');
        let editContactFacebook = document.querySelector('#addContact-facebook');

        this.loadOldInfo(id, editContactName, editContactSurName, editContactDescription, editContactPhone, editContactEmail,
            editContactBirthDate, editContactInfo, editContactInstagram, editContactFacebook);

        saveButton.addEventListener('click', () => {
            EditContact.validateFields(editContactName, editContactSurName, editContactDescription, editContactPhone,
                editContactEmail, editContactBirthDate, editContactInfo, editContactInstagram, editContactFacebook);

            EditContact.addUIValueToObj(id, editContactName, editContactSurName, editContactDescription, editContactPhone,
                editContactEmail, editContactBirthDate, editContactInfo, editContactInstagram, editContactFacebook);
        });
    }

    loadOldInfo(id, name, surname, description, phone, email, bornDate, information, instagram, facebook) {
        let usersArray = Session.getInstance().getActiveUser().contacts;

        let currentElem = usersArray.find(elem =>
            elem.id === id
        );

        if (currentElem) {
            name.value = currentElem.name;
            surname.value = currentElem.surname;
            description.innerText = currentElem.position;
            phone.value = currentElem.phone;
            email.value = currentElem.email;
            bornDate.value = currentElem.bornDate;
            information.innerText = currentElem.information;
            instagram.value = currentElem.instagramm;
            facebook.value = currentElem.facebook;
        }
    }

    static validateFields(name, surname, description, phone, email, bornDate, information) {
        let checkName = ContactBook.regEXPCheck(constants.REGEXP_TEXT, name);
        let checkSurname = ContactBook.regEXPCheck(constants.REGEXP_TEXT, surname);
        let checkDesc = ContactBook.regEXPCheck(constants.REGEXP_TEXT, description);
        let checkInfo = ContactBook.regEXPCheck(constants.REGEXP_TEXT, information);
        let checkEmail = ContactBook.regEXPCheck(constants.REGEXP_EMAIL, email);
        let checkBornDate = ContactBook.regEXPCheck(constants.REGEXP_BIRTHDAY, bornDate);
        let checkPhone = ContactBook.regEXPCheck(constants.REGEXP_PHONE, phone);

        return checkName && checkSurname && checkDesc && checkInfo && checkEmail && checkBornDate && checkPhone
    }

    static addUIValueToObj(id, name, surname, description, phone, email, bornDate, information, instagramm, facebook) {
        let mainBlock = document.querySelector('.add-contact');
        let contactArray = Session.getInstance().getActiveUser().contacts;

        let currentContact = contactArray.find(elem => {
            return elem.id === id
        });

        if (currentContact) {
            currentContact.name = name.value;
            currentContact.surname = surname.value;
            currentContact.position = description.value;
            currentContact.phone = phone.value;
            currentContact.email = email.value;
            currentContact.bornDate = bornDate.value;
            currentContact.info = information.value;
            currentContact.instagramm = instagramm.value;
            currentContact.facebook = facebook.value;

            successfulEdition();
        }

        function successfulEdition() {
            let successfullyEdit = document.createElement('div');
            successfullyEdit.innerText = 'Contact was updated';
            successfullyEdit.classList.add('good-text');
            successfullyEdit.style.fontSize = '18px';
            mainBlock.appendChild(successfullyEdit);
            Session.getInstance().saveToStorage();
            ContactBook.offlineSynchronization();
        }
    }
}