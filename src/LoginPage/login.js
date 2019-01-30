import Registration from "../Registration/Registration.js";
import * as constants from '../constants.js'
import LSideInnerBlock from "../LSideBlock/LSideBlock.js"
import ContactsBook from '../Module.js'

export default class LoginPage {
    constructor() {
    }

    onload() {
        const loginClass = new LoginPage();
        const registrationForm = new Registration;

        fetch('./LoginPage/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(function () {
                registrationForm.regLinkMobile();
            })
            .then(function () {
                loginClass.enterIntoSystem();
            })

    }

    enterIntoSystem() {
        const lsInner = new LSideInnerBlock();
        const login = document.querySelector('#login');
        const logPassword = document.querySelector('#log-password');
        const enterButton = document.querySelector('.reg-form-submit');
        const book = new ContactsBook();

        let userInfoObj = {};

        enterButton.addEventListener('click', () => {
            book.clearMainBlock();

            userInfoObj.email = login.value;
            userInfoObj.password = logPassword.value;

            let userInfoObjJSON = JSON.stringify(userInfoObj);

            fetch('http://phonebook.hillel.it/api/users/login', {
                method: 'POST',
                body: userInfoObjJSON,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .then(response => {
                    lsInner.onload();
                    this.mobileLogin();
                })

                .catch(err => {
                    console.log(err);
                })
        });
    }

    mobileLogin(){
        if(document.documentElement.clientWidth <= 414){
            let title = document.querySelector('.ls__title');
            title.style.display = 'none';
        }
    }
}



