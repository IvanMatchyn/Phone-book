import ContactsBook from "../Module.js"
import * as constants from "../Constants";
import Session from "../Offline/Session";

export default class NewContact {
    constructor() {
    }

    onload() {
        const book = new ContactsBook();

        book.clearMainBlock();
        fetch('./AddContact/AddContact.html')
            .then(response => {
                return response.text().then(function (text) {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(() => {
                book.mobileOpen();
                this.saveContact();
                this.cancelSavingInfo();
            })
    }

    saveContact() {
        const book = new ContactsBook();
        const saveButton = document.querySelector('.add-contact__buttons__save');
        let activeUser = Session.getInstance().getActiveUser();

        let nameVal = document.querySelector('#addContact-name');
        let surNameVal = document.querySelector('#addContact-surname');
        let descVal = document.querySelector('#addContact-desc');
        let phoneVal = document.querySelector('#addContact-phone');
        let emailVal = document.querySelector('#addContact-email');
        let birthdayVal = document.querySelector('#addContact-birthday');
        let infoVal = document.querySelector('#addContact-information');
        let facebookVal = document.querySelector('#addContact-facebook');
        let instagrammVal = document.querySelector('#addContact-instagramm');

        let dataArray = [nameVal, surNameVal, descVal, phoneVal, emailVal, birthdayVal, infoVal];

        let allDone = true;

        saveButton.addEventListener('click', function save() {
            let newContact = {};

            if(!constants.RAGEXP_TEXT.test(nameVal.value)){
                nameVal.classList.add('wrong-info');
                nameVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                nameVal.classList.remove('wrong-info');
                nameVal.removeAttribute('placeholder', 'Incorrect');
            }

            if(!constants.RAGEXP_TEXT.test(surNameVal.value)){
                surNameVal.classList.add('wrong-info');
                surNameVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                surNameVal.classList.remove('wrong-info');
                surNameVal.removeAttribute('placeholder', 'Incorrect');
            }

            if(!constants.RAGEXP_TEXT.test(descVal.value)){
                descVal.classList.add('wrong-info');
                descVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                descVal.classList.remove('wrong-info');
                descVal.removeAttribute('placeholder', 'Incorrect');
            }

            if(!constants.RAGEXP_TEXT.test(infoVal.value)){
                infoVal.classList.add('wrong-info');
                infoVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                infoVal.classList.remove('wrong-info');
                infoVal.removeAttribute('placeholder', 'Incorrect');
            }

            if (!constants.RAGEXP_EMAIL.test(emailVal.value)) {
                emailVal.classList.add('wrong-info');
                emailVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                emailVal.classList.remove('wrong-info');
                emailVal.removeAttribute('placeholder', 'Incorrect');
            }

            if (!constants.RAGEXP_BIRTHDAY.test(birthdayVal.value)) {
                birthdayVal.classList.add('wrong-info');
                birthdayVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                birthdayVal.classList.remove('wrong-info');
                birthdayVal.removeAttribute('placeholder', 'Incorrect');
            }

            if (!constants.RAGEXP_PHONE.test(phoneVal.value)) {
                phoneVal.classList.add('wrong-info');
                phoneVal.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                allDone = true;
                phoneVal.classList.remove('wrong-info');
                phoneVal.removeAttribute('placeholder', 'Incorrect');
            }

            if (allDone) {
                let mainBlock = document.querySelector('.add-contact');
                let maxContactID = Number(localStorage.getItem('maxContactID'));
                newContact.id = maxContactID + 1;

                newContact.name = nameVal.value;
                newContact.surname = surNameVal.value;
                newContact.position = descVal.value;
                newContact.email = emailVal.value;
                newContact.phone = phoneVal.value;
                newContact.bornDate = birthdayVal.value;
                newContact.information = infoVal.value;
                newContact.facebook = facebookVal.value;
                newContact.instagramm = instagrammVal.value;


                let updatedMaxContactID = newContact.id;
                localStorage.setItem('maxContactID', `${updatedMaxContactID}`);

                let activeUserContacts = activeUser.contacts;
                activeUserContacts.push(newContact);
                localStorage.setItem('Active User', JSON.stringify(activeUser));
                book.offlineSynchronization();

                dataArray.forEach(elem => {
                    elem.value = '';
                });

                let goodText = document.createElement('div')
                goodText.innerText = 'Contact was created';
                goodText.classList.add('good-text');
                goodText.style.fontSize = '18px';
                goodText.style.marginLeft = '20px';
                goodText.style.marginTop = '50px';

                mainBlock.appendChild(goodText)
            }
        })
    }

    cancelSavingInfo() {
        const cancelButton = document.querySelector('.add-contact__buttons__cancel');
        const book = new ContactsBook();
        let mainLeftBlock = document.querySelector('.main__left-side');

        cancelButton.addEventListener('click', () => {
            book.clearMainBlock();
            if (document.documentElement.clientWidth <= 720) {
                mainLeftBlock.style.display = 'block';
            }
        });
    }
}