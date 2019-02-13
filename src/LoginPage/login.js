import Registration from "../Registration/Registration.js";
import * as constants from '../constants.js'
import LSideInnerBlock from "../LSideBlock/LSideBlock.js"
import ContactsBook from '../Module.js'
import Session from "../Offline/Session";

export default class LoginPage {
    constructor() {
    }

    onload() {
        const loginClass = new LoginPage();
        const registrationForm = new Registration;

        window.history.pushState(
            {},
            '/Login',
            window.location.origin + '?page=login'
        );

        fetch('./LoginPage/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(function () {
                Session.getInstance().loadActiveUser();
                loginClass.enterIntoSystem();
                registrationForm.regLinkMobile();
            })
    }

    enterIntoSystem() {
        const lsInner = new LSideInnerBlock();
        const login = document.querySelector('#login');
        const logPassword = document.querySelector('#log-password');
        const enterButton = document.querySelector('.reg-form-submit');
        const book = new ContactsBook();
        let mode = constants.myStorage.getItem('mode');

        let userInfoObj = {};

        enterButton.addEventListener('click', () => {
            book.clearMainBlock();

            if (mode === 'online') {
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

            } else if (mode === 'offline') {
                let usersInfo = JSON.parse(localStorage.getItem('Users'));

                usersInfo.forEach(elem => {
                    if (login.value === elem.email && logPassword.value === elem.password) {
                        lsInner.onload();
                        this.mobileLogin();
                        localStorage.setItem('Active User', JSON.stringify(elem));

                        let maxCatIDarray = elem.categories;
                        let maxContactArray = elem.contacts;


                        if (maxCatIDarray.length < 1) {
                            localStorage.setItem('maxCategoryID', '0')

                        } else if(maxContactArray.length < 1) {
                            localStorage.setItem('maxContactID', '0')

                        } else {
                            let maxCurrentID = maxID(maxCatIDarray);
                            let maxCurrentContactID = maxID(maxContactArray);

                            localStorage.setItem('maxCategoryID', `${maxCurrentID}`);
                            localStorage.setItem('maxContactID', `${maxCurrentContactID}`);
                        }

                        function maxID(array) {
                            let arrayNumber = [];

                            array.forEach(elem =>{
                                arrayNumber.push(elem.id)
                            });

                            return Math.max.apply(null, arrayNumber)
                        }
                    }
                });
            }
        });
    }

    mobileLogin() {
        if (document.documentElement.clientWidth <= 414) {
            let title = document.querySelector('.ls__title');
            title.style.display = 'none';
        }
    }
}



