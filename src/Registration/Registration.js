import * as constants from '../constants.js'

export default class Registration {
    constructor() {

    }

    onload() {
        const regClass = this;
        const regLink = document.querySelector('.login-registration');

        regLink.addEventListener('click', function (e) {
            e.preventDefault();

            // window.history.pushState(
            //     {},
            //     'registration',
            //     window.location.origin + '/registration');

            fetch('./Registration/RegistrationForm.html', {
                headers: {
                    'Content-Type': 'text/html'
                }
            })
                .then(response => {
                    return response.text()

                })

                .then(text => {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                })

                .then(() => {
                    regClass.registrationNewUser();
                })
        });
    }

    registrationNewUser() {
        const confirmRegistration = document.querySelector('.registration-confirm-button');
        const userEmail = document.querySelector('#registration-email');
        const userPassword = document.querySelector('#registration-password');
        const userFirstName = document.querySelector('#registration-name');
        const userSecondName = document.querySelector('#registration-surrname');
        let mode = constants.myStorage.getItem('mode');
        let infoUserObject = {};

        confirmRegistration.addEventListener('click', () => {
            let allDone = true;
            let infoArray = [userEmail, userPassword, userFirstName, userSecondName];
            let infoArrayTextField = [userFirstName, userSecondName];

            if (!constants.RAGEXP_EMAIL.test(userEmail.value)) {
                userEmail.classList.add('wrong-info');
                userEmail.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                userEmail.classList.remove('wrong-info');
                userEmail.removeAttribute('placeholder', 'Incorrect');
            }

            if (!constants.RAGEXP_PASS.test(userPassword.value)) {
                userPassword.classList.add('wrong-info');
                userPassword.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                userPassword.classList.remove('wrong-info');
                userPassword.removeAttribute('placeholder', 'Incorrect');
            }

            infoArrayTextField.forEach(elem => {
                if (!constants.RAGEXP_TEXT.test(elem.value)) {
                    elem.classList.add('wrong-info');
                    elem.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    elem.classList.remove('wrong-info');
                    elem.removeAttribute('placeholder', 'Incorrect');
                }
            });

            infoArray.forEach(elem => {
                if (elem.value.length === 0) {
                    elem.classList.add('wrong-info');
                    elem.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                }
            });

            if (mode === 'online') {
                if (allDone) {
                    infoUserObject.email = userEmail.value;
                    infoUserObject.password = userPassword.value;
                    infoUserObject.name = userFirstName.value;
                    infoUserObject.surname = userSecondName.value;

                    infoArray.forEach(elem => {
                        elem.classList.remove('wrong-info');
                        elem.removeAttribute('placeholder', 'Incorrect');

                    })
                }

                let infoToJSON = JSON.stringify(infoUserObject);

                fetch('http://phonebook.hillel.it/api/users/register', {
                    method: 'POST',
                    body: infoToJSON,
                    headers: {'Content-Type': 'application/json'}
                })

                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else if (mode === 'offline') {
                function createUser() {
                    let usersArray = JSON.parse(localStorage.getItem('Users'));
                    let userID = Number(localStorage.getItem('maxUserID')) + 1;

                    infoUserObject.ID = userID;
                    localStorage.setItem('maxUserID', `${userID}`);

                    infoUserObject.email = userEmail.value;
                    infoUserObject.password = userPassword.value;
                    infoUserObject.name = userFirstName.value;
                    infoUserObject.surname = userSecondName.value;
                    infoUserObject.categories = [];
                    infoUserObject.contacts = [];
                    infoUserObject.userInfo = [];

                    usersArray.push(infoUserObject);

                    let usersArrayToJSON = JSON.stringify(usersArray);

                    localStorage.setItem('Users', usersArrayToJSON);
                }

                if (allDone) {
                    let usersArray = JSON.parse(localStorage.getItem('Users'));

                    if (usersArray.length === 0) {
                        createUser()

                    } else {
                        usersArray.forEach(elem => {
                            if (elem.email !== userEmail.value) {
                                createUser();
                                let errorMSG = document.querySelector('#wrong-email');
                                errorMSG.style.display = 'none';

                            } else {
                                let emailBlock = document.querySelector('#email-check')
                                let errorMSG = document.querySelector('#wrong-email');
                                errorMSG.style.display = 'block';
                                emailBlock.appendChild(errorMSG);
                            }
                        });
                    }

                    infoArray.forEach(elem => {
                        elem.classList.remove('wrong-info');
                        elem.removeAttribute('placeholder', 'Incorrect');
                    })
                }
            }
        })
    }

    regLinkMobile() {
        const mainLeft = document.querySelector('.main__left-side');
        const regLink = document.querySelector('.login-registration');

        if (document.documentElement.clientWidth <= 720) {
            regLink.addEventListener('click', () => {
                mainLeft.classList.add('hidden');
                constants.MAIN_RSIDE_BLOCK.style.display = 'block';

                fetch('./Registration/RegistrationForm.html')
                    .then(response => {
                        return response.text()
                    })

                    .then(text => {
                        constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                        this.registrationNewUser();

                        let closeButton = document.createElement('button');
                        closeButton.classList.add('registration-close-button');

                        let header = document.querySelector('.main__block-header');
                        header.appendChild(closeButton);

                        let leftBlock = document.querySelector('.main__left-side');

                        closeButton.addEventListener('click', () => {
                            constants.MAIN_RSIDE_BLOCK.style.display = 'none';
                            leftBlock.classList.remove('hidden');
                        });
                    });
            });
        } else {
            this.onload();
        }
    }
}