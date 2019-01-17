import Registration from "../Registration/Registration.js";

export default class LoginPage {
    constructor(){

    }

    onload(){
        const registrationForm = new Registration;

        fetch('./LoginPage/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(registrationForm.onload)
            .then(registrationForm.registrateNewUser)
            .then(this.enterIntoSystem);
    }

    enterIntoSystem(){
        const login = document.querySelector('#login');
        const logPassword = document.querySelector('#log-password');
        const enterButton = document.querySelector('.reg-form-submit');

        let userInfoObj = {};

        enterButton.addEventListener('click', () => {
            userInfoObj.email = login.value;
            userInfoObj.password = logPassword.value;

            let userInfoObjJSON = JSON.stringify(userInfoObj);

            fetch('http://phonebook.hillel.it/api/users/login', {
                method: 'POST',
                body: userInfoObjJSON,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .then(response => {
                    const leftSideBlock = document.querySelector('.ls__content-wrapper');


                    fetch('./LSideBlock/LSideBlock.html')
                        .then(function (response) {
                            return response.text().then(function (text) {
                                leftSideBlock.innerHTML = text;
                                contactBook.clearMainBlock();
                            })
                        })

                        .then(() => {
                            contactBook.clearMainBlock();
                            this.logOutFromSystem();
                            this.addNewContact();
                        })
                })

                .catch(err => {
                    console.log(err);
                })

        });
    }
}



