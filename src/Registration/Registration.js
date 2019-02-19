import * as constants from '../Constants.js'
import ContactsBook from "../Module";

export default class Registration {
    constructor() {

    }

    onload() {
        const regClass = this;

        fetch('./Registration/RegistrationForm.html', {
            headers: {
                'Content-Type': 'text/html'
            }
        })
            .then(response => {
                return response.text().then(text => {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
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

    static clearFieldsWarnings(array){
        array.forEach(elem => {
            elem.classList.remove('wrong-info');

            elem.removeAttribute('placeholder');
        });
    }

    static validateUser(email, pass, firstName, secondName) {
        const book = new ContactsBook();

        let infoArray = [email, pass, firstName, secondName];

        let emailCheck = book.rageXPCheck(constants.RAGXP_EMAIL, email, infoArray);
        let passCheck = book.rageXPCheck(constants.RAGXP_PASS, pass, infoArray);
        let nameCheck = book.rageXPCheck(constants.RAGXP_TEXT, firstName, infoArray);
        let surnameCheck = book.rageXPCheck(constants.RAGXP_TEXT, secondName, infoArray);

        return emailCheck && passCheck && nameCheck && surnameCheck
    }

    checkIsUserAlreadyExist(email) {
        let usersArray = JSON.parse(localStorage.getItem('Users'));

        let findUser = usersArray.find(element => {
            return element.email === email.value
        });

        if (findUser) {
            let emailBlock = document.querySelector('#email-check');
            let errorMSG = document.querySelector('#wrong-email');
            errorMSG.style.display = 'block';
            emailBlock.appendChild(errorMSG);
            return true;
        } else {
            let errorMSG = document.querySelector('#wrong-email');
            errorMSG.style.display = 'none';
            return false;
        }

    }

    static createNewUser(email, pass, firstName, secondName) {
        let infoUserObject = {};
        let usersArray = JSON.parse(localStorage.getItem('Users'));
        let userID = Number(localStorage.getItem('maxUserID')) + 1;

        infoUserObject.ID = userID;
        localStorage.setItem('maxUserID', `${userID}`);

        infoUserObject.email = email.value;
        infoUserObject.password = pass.value;
        infoUserObject.name = firstName.value;
        infoUserObject.surname = secondName.value;
        infoUserObject.categories = [];
        infoUserObject.contacts = [];
        infoUserObject.userInfo = [];

        usersArray.push(infoUserObject);

        let usersArrayToJSON = JSON.stringify(usersArray);
        localStorage.setItem('Users', usersArrayToJSON);
    }

    static successfulMessage() {
        const confirmRegistration = document.querySelector('.confirm-button');
        const regForm = document.querySelector('.registration-main');
        let message = document.createElement('div');
        message.classList.add('good-text');
        message.innerText = 'User was created successfully';
        regForm.insertBefore(message, confirmRegistration);
    }
}