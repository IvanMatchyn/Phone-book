import * as constants from "../constants";
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
                let editLink = link;
                editContats(editLink, id)
            })

        function editContats(link, id) {
            let book = new ContactBook();
            let activeUser = Session.getInstance().getActiveUser();
            let usersArray = activeUser.contacts;
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
            let editContactInstagramm = document.querySelector('#addContact-instagramm');
            let editContactFacebook = document.querySelector('#addContact-facebook');



            usersArray.forEach(elem => {
                if (elem.id === id) {
                    editContactName.value = elem.name;
                    editContactSurName.value = elem.surname;
                    editContactDescription.innerText = elem.position;
                    editContactPhone.value = elem.phone;
                    editContactEmail.value = elem.email;
                    editContactBirthDate.value = elem.bornDate;
                    editContactInfo.innerText = elem.information;
                    editContactInstagramm.value = elem.instagramm;
                    editContactFacebook.value = elem.facebook;
                }
            });

            saveButton.addEventListener('click', () => {
                usersArray.forEach(elem => {
                    if (elem.id === id) {
                        elem.name = editContactName.value;
                        elem.surname = editContactSurName.value;
                        elem.position = editContactDescription.value;
                        elem.phone = editContactPhone.value;
                        elem.email = editContactEmail.value;
                        elem.bornDate = editContactBirthDate.value;
                        elem.info = editContactInfo.value;
                        elem.instagramm = editContactInstagramm.value;
                        elem.facebook = editContactFacebook.value;
                    }
                });

                Session.getInstance().saveToStorage();
                book.offlineSynchronization();
            });

        }
    }
}