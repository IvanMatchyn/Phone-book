import ContactsBook from "../Module.js"
import * as constants from "../constants";
import Session from "../Offline/Session";

export default class NewContact {
    constructor() {
    }

    onload() {
        const book = new ContactsBook();
        const addContactFunc = this;
        const addButton = document.querySelector('.ls-inner__add-contact__wrapper');

        addButton.addEventListener('click', () => {
            book.clearMainBlock();
            fetch('./AddContact/AddContact.html')
                .then(response => {
                    return response.text().then(function (text) {
                        constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                    })
                })
                .then(function () {
                    book.mobileOpen();
                    addContactFunc.saveContact();
                    addContactFunc.cancelSavingInfo();
                })
        })
    }

    saveContact() {
        const addContacts = new NewContact();
        const book = new ContactsBook();
        const saveButton = document.querySelector('.add-contact__buttons__save');
        let mode = constants.myStorage.getItem('mode');
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

        let emptyCheck = true;

        saveButton.addEventListener('click', function save() {
            let newContact = {};
            dataArray.forEach(elem => {
                elem.classList.remove('wrong-info');
                if (elem.value.length === 0) {
                    emptyCheck = false;
                    elem.classList.add('wrong-info');
                }
            });


            if (emptyCheck) {
                if (mode === 'online') {
                    newContact.name = nameVal.value;
                    newContact.surname = surNameVal.value;
                    newContact.position = descVal.value;
                    newContact.email = [`${emailVal.value}`];
                    newContact.phone = [{
                        category: "mobile",
                        value: phoneVal.value
                    }];
                    newContact.bornDate = `${birthdayVal.value}`;
                    newContact.information = `${infoVal.value}`;

                    let JSONcontact = JSON.stringify(newContact);

                    if (JSONcontact.length != 0) {
                        fetch('http://phonebook.hillel.it/api/phonebook', {
                            method: 'POST',
                            body: JSONcontact,
                            credentials: "include",
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                console.log(response)
                                console.log(response.text())
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    addContacts.onload();

                } else if (mode === 'offline') {
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
                }
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