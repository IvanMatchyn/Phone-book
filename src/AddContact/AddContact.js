import ContactsBook from "../Module.js"
import * as constants from "../Constants";
import Session from "../Offline/Session";

export default class NewContact {
    onload() {

        ContactsBook.clearMainBlock();
        fetch('./AddContact/AddContact.html')
            .then(response => {
                return response.text().then(function (text) {
                    constants.mainRightSideBlock.innerHTML = text;
                })
            })
            .then(() => {
                ContactsBook.mobileOpen();
                this.addEventSaveContact();
                this.AddEventCancelSavingInfo();
            })
    }

    addEventSaveContact() {
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

        let instagramVal = document.querySelector('#addContact-instagramm');

        let dataArray = [nameVal, surNameVal, descVal, phoneVal, emailVal, birthdayVal, infoVal];

        saveButton.addEventListener('click', function save() {
            let newContact = {};

            let nameCheck = ContactsBook.regEXPCheck(constants.REGEXP_TEXT, nameVal);
            let surnameCheck = ContactsBook.regEXPCheck(constants.REGEXP_TEXT, surNameVal);
            let descriptionCheck = ContactsBook.regEXPCheck(constants.REGEXP_TEXT, descVal);
            let emailCheck = ContactsBook.regEXPCheck(constants.REGEXP_EMAIL, emailVal);
            let bornDateCheck = ContactsBook.regEXPCheck(constants.REGEXP_BIRTHDAY, birthdayVal);
            let phoneCheck = ContactsBook.regEXPCheck(constants.REGEXP_PHONE, phoneVal);

            if (nameCheck && surnameCheck && descriptionCheck && infoCheck && emailCheck && bornDateCheck
                && phoneCheck) {
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
                newContact.instagramm = instagramVal.value;


                let updatedMaxContactID = newContact.id;
                localStorage.setItem('maxContactID', `${updatedMaxContactID}`);

                let activeUserContacts = activeUser.contacts;
                activeUserContacts.push(newContact);
                localStorage.setItem('Active User', JSON.stringify(activeUser));
                ContactsBook.offlineSynchronization();

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

    AddEventCancelSavingInfo() {
        const cancelButton = document.querySelector('.add-contact__buttons__cancel');
        cancelButton.addEventListener('click', () => {
            ContactsBook.clearMainBlock();
            ContactsBook.isMobileDevice();
        });
    }
}