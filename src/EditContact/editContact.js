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
                editContats(link, id)
            });

        function editContats(link, id) {
            let book = new ContactBook();
            let activeUser = Session.getInstance().getActiveUser();
            let usersArray = activeUser.contacts;
            let saveButton = document.querySelector('.add-contact__buttons__text');
            let header = document.querySelector('.main__block-header__text__add-contact');
            let mainBlock = document.querySelector('.add-contact');

            let allDone = true;

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
                if(!constants.RAGEXP_TEXT.test(editContactName.value)){
                    editContactName.classList.add('wrong-info');
                    editContactName.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactName.classList.remove('wrong-info');
                    editContactName.removeAttribute('placeholder', 'Incorrect');
                }

                if(!constants.RAGEXP_TEXT.test(editContactSurName.value)){
                    editContactSurName.classList.add('wrong-info');
                    editContactSurName.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactSurName.classList.remove('wrong-info');
                    editContactSurName.removeAttribute('placeholder', 'Incorrect');
                }

                if(!constants.RAGEXP_TEXT.test(editContactDescription.value)){
                    editContactDescription.classList.add('wrong-info');
                    editContactDescription.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactDescription.classList.remove('wrong-info');
                    editContactDescription.removeAttribute('placeholder', 'Incorrect');
                }

                if(!constants.RAGEXP_TEXT.test(editContactInfo.value)){
                    editContactInfo.classList.add('wrong-info');
                    editContactInfo.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactInfo.classList.remove('wrong-info');
                    editContactInfo.removeAttribute('placeholder', 'Incorrect');
                }

                if (!constants.RAGEXP_EMAIL.test(editContactEmail.value)) {
                    editContactEmail.classList.add('wrong-info');
                    editContactEmail.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactEmail.classList.remove('wrong-info');
                    editContactEmail.removeAttribute('placeholder', 'Incorrect');
                }

                if (!constants.RAGEXP_BIRTHDAY.test(editContactBirthDate.value)) {
                    editContactBirthDate.classList.add('wrong-info');
                    editContactBirthDate.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    allDone = true;
                    editContactBirthDate.classList.remove('wrong-info');
                    editContactBirthDate.removeAttribute('placeholder', 'Incorrect');
                }

                if (!constants.RAGEXP_PHONE.test(editContactPhone.value)) {
                    editContactPhone.classList.add('wrong-info');
                    editContactPhone.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    editContactPhone.classList.remove('wrong-info');
                    editContactPhone.removeAttribute('placeholder', 'Incorrect');
                }

                if(allDone){
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

                    let goodText = document.createElement('div')
                    goodText.innerText = 'Contact was updated';
                    goodText.classList.add('good-text');
                    goodText.style.fontSize = '18px';

                    mainBlock.appendChild(goodText)
                }

                Session.getInstance().saveToStorage();
                book.offlineSynchronization();
            });
        }
    }
}