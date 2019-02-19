import * as constants from "../Constants";
import Session from "../Offline/Session";
import ContactBook from "../Module.js"

export default class EditContact {
    constructor() {

    }

    onload(link, id) {
        fetch('../EditContact/EditContact.html')
            .then(response => {
                return response.text().then(text => {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
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

        this.loadOldInfo(editContactName, editContactSurName, editContactDescription, editContactPhone, editContactEmail, editContactBirthDate, editContactInfo, editContactInstagramm, editContactFacebook);

        saveButton.addEventListener('click', () => {
            try {
                EditContact.validateFields(editContactName, editContactSurName, editContactDescription, editContactPhone, editContactEmail, editContactBirthDate, editContactInfo, editContactInstagramm, editContactFacebook);
                EditContact.addUIvalueToObj(id, editContactName, editContactSurName, editContactDescription, editContactPhone, editContactEmail, editContactBirthDate, editContactInfo, editContactInstagramm, editContactFacebook);
            } catch (e) {
                console.log(e);
            }
        });
    }

    loadOldInfo(name, surname, description, phone, email, bornDate, information, instagramm, facebook) {
        let usersArray = Session.getInstance().getActiveUser().contacts;

        let currentElem = usersArray.find(elem => {
            if (elem.id === id) {
                return elem;
            }
        });

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
        let book = new ContactBook();

        let checkName = book.rageXPCheck(constants.RAGXP_TEXT, name);
        let checkSurname =  book.rageXPCheck(constants.RAGXP_TEXT, surname);
        let checkDesc = book.rageXPCheck(constants.RAGXP_TEXT, description);
        let checkInfo = book.rageXPCheck(constants.RAGXP_TEXT, information);
        let checkEmail = book.rageXPCheck(constants.RAGXP_EMAIL, email);
        let checkBornDate = book.rageXPCheck(constants.RAGXP_BIRTHDAY, bornDate);
        let checkPhone = book.rageXPCheck(constants.RAGXP_PHONE, phone);

        return checkName && checkSurname && checkDesc && checkInfo && checkEmail && checkBornDate && checkPhone
    }

    static addUIvalueToObj(id, name, surname, description, phone, email, borndate, information, instagramm, facebook) {
        let book = new ContactBook();
        let mainBlock = document.querySelector('.add-contact');
        let usersArray = Session.getInstance().getActiveUser().contacts;

        let currentContact = usersArray.find(elem => {
            if (elem.id === id){
                return elem;
            }
        });

        if(currentContact){
            currentContact.name = name.value;
            currentContact.surname = surname.value;
            currentContact.position = description.value;
            currentContact.phone = phone.value;
            currentContact.email = email.value;
            currentContact.bornDate = bornDate.value;
            currentContact.info = information.value;
            currentContact.instagramm = instagramm.value;
            currentContact.facebook = facebook.value;

            succesfulEdition();
        }

        function succesfulEdition() {
            let successfullyEdit = document.createElement('div')
            successfullyEdit.innerText = 'Contact was updated';
            successfullyEdit.classList.add('good-text');
            successfullyEdit.style.fontSize = '18px';
            mainBlock.appendChild(successfullyEdit);
            Session.getInstance().saveToStorage();
            book.offlineSynchronization();
        }
    }
}