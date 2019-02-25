import * as constants from '../Constants.js'
import ContactsBook from "../Module";

export default class Registration {
    onload() {
        const regClass = this;

        fetch('./Registration/RegistrationForm.html', {
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => {
                return response.text().then(text => {
                    constants.mainRightSideBlock.innerHTML = text;
                })
            })
            .then(() => {
                ContactsBook.mobileOpen();
                regClass.addEventRegistrationNewUser();
            });
    }

    addEventRegistrationNewUser() {
        const confirmRegistration = document.querySelector('.registration-confirm-button');
        const userEmail = document.querySelector('#registration-email');
        const userPassword = document.querySelector('#registration-password');
        const userFirstName = document.querySelector('#registration-name');
        const userSecondName = document.querySelector('#registration-surrname');

        confirmRegistration.addEventListener('click', () => {
            let infoArray = [userEmail, userPassword, userFirstName, userSecondName];

            if (Registration.validateUser(userEmail, userPassword, userFirstName, userSecondName)) {
                if (!this.checkIsUserAlreadyExist(userEmail)) {
                    Registration.createNewUser(userEmail, userPassword, userFirstName, userSecondName);
                    Registration.clearFieldsWarnings(infoArray);
                    Registration.successfulMessage();
                }
            }
        })
    }

    static clearFieldsWarnings(array) {
        array.forEach(elem => {
            elem.classList.remove('wrong-info');
            elem.removeAttribute('placeholder');
        });
    }

    static validateUser(email, pass, firstName, secondName) {
        let emailCheck = ContactsBook.regEXPCheck(constants.REGEXP_EMAIL, email);
        let passCheck = ContactsBook.regEXPCheck(constants.REGEXP_PASS, pass);
        let nameCheck = ContactsBook.regEXPCheck(constants.REGEXP_TEXT, firstName);
        let surnameCheck = ContactsBook.regEXPCheck(constants.REGEXP_TEXT, secondName);

        return emailCheck && passCheck && nameCheck && surnameCheck
    }

    checkIsUserAlreadyExist(email) {
        let usersArray = JSON.parse(localStorage.getItem(constants.ALL_USERS));

        let findUser = usersArray.find(element =>
            element.email === email.value
        );

        if (!findUser) {
            let errorMSG = document.querySelector('#wrong-email');
            errorMSG.style.display = 'none';
            return false;
        }

        let emailBlock = document.querySelector('#email-check');
        let errorMSG = document.querySelector('#wrong-email');
        errorMSG.style.display = 'block';
        emailBlock.appendChild(errorMSG);
        return true;
    }

    static createNewUser(email, pass, firstName, secondName) {
        let infoUserObject = {};
        let usersArray = JSON.parse(localStorage.getItem(constants.ALL_USERS));
        let userID = Number(localStorage.getItem(constants.MAX_USER_ID)) + 1;

        infoUserObject.ID = userID;
        localStorage.setItem(constants.MAX_USER_ID, `${userID}`);

        infoUserObject.email = email.value;
        infoUserObject.password = pass.value;
        infoUserObject.name = firstName.value;
        infoUserObject.surname = secondName.value;
        infoUserObject.categories = [];
        infoUserObject.contacts = [];
        infoUserObject.userInfo = [];

        usersArray.push(infoUserObject);

        let usersArrayToJSON = JSON.stringify(usersArray);
        localStorage.setItem(constants.ALL_USERS, usersArrayToJSON);
    }

    static successfulMessage() {
        const confirmRegistration = document.querySelector('.confirm-button');
        const regForm = document.querySelector('.registration-main');
        const message = document.createElement('div');
        const regFormChildren = [...regForm.children];

        message.classList.add('good-text');
        message.innerText = 'User was created successfully';
        message.style.marginTop = '20px';
        message.style.textAlign = 'right';
        message.style.fontSize = '16px';

        const msgCheck = regFormChildren.find(msg =>
            msg.classList.contains('good-text')
        );

        if (!msgCheck) {
            regForm.insertBefore(message, confirmRegistration);
        }
    }
}