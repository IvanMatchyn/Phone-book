export default class Registration {
    constructor() {

    }

    onload() {
        const regLink = document.querySelector('.login-registration');

        regLink.addEventListener('click', function (e) {
            e.preventDefault();

            fetch('./Registration/RegistrationForm.html')
                .then(function (response) {
                    return response.text().then(function (text) {
                        MAIN_RSIDE_BLOCK.innerHTML = text;
                    })
                })
        })
    }

    registrateNewUser() {
        const confirmRegistration = document.querySelector('.registration-confirm-button');
        const userEmail = document.querySelector('#registration-email');
        const userPassword = document.querySelector('#registration-password');
        const userFirstName = document.querySelector('#registration-name');
        const userSecondName = document.querySelector('#registration-surrname');
        let infoUserObject = {};

        confirmRegistration.addEventListener('click', obj => {
            let allDone = true;
            let infoArray = [userEmail, userPassword, userFirstName, userSecondName];
            let infoArrayTextField = [userFirstName, userSecondName];

            if (!RAGEXP_EMAIL.test(userEmail.value)) {
                userEmail.classList.add('wrong-info');
                userEmail.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                userEmail.classList.remove('wrong-info');
                userEmail.removeAttribute('placeholder', 'Incorrect');
            }

            if (!RAGEXP_PASS.test(userPassword.value)) {
                userPassword.classList.add('wrong-info');
                userPassword.setAttribute('placeholder', 'Incorrect');
                allDone = false;
            } else {
                userPassword.classList.remove('wrong-info');
                userPassword.removeAttribute('placeholder', 'Incorrect');
            }

            infoArrayTextField.forEach(elem => {
                if (!RAGEXP_TEXT.test(elem.value)) {
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

            console.log(allDone);

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

            console.log(infoToJSON);

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
        })
    }
}