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
                this.addEventCancelSavingInfo();
            })
    }

    addEventSaveContact() {
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

            if (nameCheck && surnameCheck && descriptionCheck && emailCheck && bornDateCheck
                && phoneCheck) {
                let mainBlockWrapper = document.querySelector('.add-contact__inner-wrapper');
                let maxContactID = Number(localStorage.getItem(constants.MAX_CONTACT_ID));
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
                localStorage.setItem(constants.MAX_CONTACT_ID, `${updatedMaxContactID}`);

                let activeUserContacts = activeUser.contacts;
                activeUserContacts.push(newContact);
                Session.getInstance().saveToStorage();
                ContactsBook.offlineSynchronization();

                dataArray.forEach(elem => {
                    elem.value = '';
                });

                successfulMsg();

                function successfulMsg() {
                    let goodText = document.createElement('div');
                    goodText.innerText = 'Contact was created';
                    goodText.classList.add('good-text');
                    goodText.style.fontSize = '18px';
                    goodText.style.marginLeft = '20px';
                    goodText.style.marginTop = '10px';
                    goodText.style.textAlign = 'right';

                    let mainBlockChildren = [...mainBlockWrapper.children];

                    let checkMsg = mainBlockChildren.find(msg =>
                        msg.classList.contains('good-text')
                    );

                    if (!checkMsg) {
                        mainBlockWrapper.appendChild(goodText)
                    }
                }
            }
        })
    }

    addEventCancelSavingInfo() {
        const cancelButton = document.querySelector('.add-contact__buttons__cancel');
        cancelButton.addEventListener('click', () => {
            let mainLeftBlock = document.querySelector('.main__left-side');

            ContactsBook.clearMainBlock();
            ContactsBook.isMobileDevice();

            mainLeftBlock.style.display = 'block';
        });
    }
}