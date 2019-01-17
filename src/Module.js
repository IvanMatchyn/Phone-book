import LoginPage from "./LoginPage/login.js";


export default class ContactsBook {
    constructor() {

    }

    onload() {
        if (ONLOAD_PAGE === 'login') {
            let login = new LoginPage;
            login.onload();
        }
    }

    startPage() {
        const mainBlock = document.querySelector('.ls__content-wrapper');
        const contact = this;

        fetch('./Registration/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    mainBlock.innerHTML = text;
                }).then(function () {
                    const regLink = document.querySelector('.login-registration');

                    regLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        const mainBlock = document.querySelector('.main__article');

                        fetch('./Registration/RegistrationForm.html')
                            .then(function (response) {
                                return response.text().then(function (text) {
                                    mainBlock.innerHTML = text;
                                })
                            })

                            .then(function () {
                                contact.registerNewUser();
                            })
                    });
                    contact.logIntoSystem();
                })
            });
    }

    registerNewUser() {
        const confirmRegistration = document.querySelector('.registration-confirm-button');
        const userEmail = document.querySelector('#registration-email');
        const userPassword = document.querySelector('#registration-password');
        const userFirstName = document.querySelector('#registration-name');
        const userSecondName = document.querySelector('#registration-surrname');
        let infoUserObject = {};
        let ragexpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
        let ragexpText = /^[A-Za-z-]/i;
        let ragexpPass = /^[A-Za-z0-9]/i;

        confirmRegistration.addEventListener('click', obj => {
                let allDone = true;
                let infoArray = [userEmail, userPassword, userFirstName, userSecondName];
                let infoArrayTextField = [userFirstName, userSecondName];

                if (!ragexpEmail.test(userEmail.value)) {
                    userEmail.classList.add('wrong-info');
                    userEmail.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    userEmail.classList.remove('wrong-info');
                    userEmail.removeAttribute('placeholder', 'Incorrect');
                }

                if (!ragexpPass.test(userPassword.value)) {
                    userPassword.classList.add('wrong-info');
                    userPassword.setAttribute('placeholder', 'Incorrect');
                    allDone = false;
                } else {
                    userPassword.classList.remove('wrong-info');
                    userPassword.removeAttribute('placeholder', 'Incorrect');
                }

                infoArrayTextField.forEach(elem => {
                    if (!ragexpText.test(elem.value)) {
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

                console.log(allDone)

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

                console.log(infoToJSON)

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
            }
        )
    }

    logIntoSystem() {
        const contactBook = this;
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

    logOutFromSystem() {
        const logOutButton = document.querySelector('.ls-inner__account__name-logOut-button');

        logOutButton.addEventListener('click', () => {
            this.clearMainBlock();
            this.startPage();
        })
    }

    clearMainBlock() {
        const mainBlock = document.querySelector('.main__article');
        const mainBlockChilds = mainBlock.childNodes;

        mainBlockChilds.forEach(elem => {
            mainBlock.removeChild(elem);
        })
    }

    addNewContact() {
        const addButton = document.querySelector('.ls-inner__add-contact__wrapper');
        const mainBlock = document.querySelector('.main__article');

        addButton.addEventListener('click', () => {
            this.clearMainBlock();
            fetch('./addContact/addContact.html')
                .then(response => {
                    return response.text().then(function (text) {
                        mainBlock.innerHTML = text;
                    })
                })
        })
    }
}