import * as constants from '../constants.js'
import ContactsBook from '../Module.js'
import Session from "../Offline/Session";
import LoadPage from "../LoadPage/LoadPage";

export default class LoginPage {
    constructor() {
    }

    onload() {
        const loginClass = new LoginPage();

        fetch('./LoginPage/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.MAIN_LSIDE_BLOCK.innerHTML = text;
                })
            })
            .then(function () {
                Session.getInstance().loadActiveUser();
                loginClass.enterIntoSystem();
                regLink();

                let maxUserID = localStorage.getItem('maxUserID');

                if(maxUserID == null){
                    localStorage.setItem('maxUserID', '0');
                }

                if(localStorage.getItem('Users') == null){
                    let newUsers = [];
                    let newUsersToJSON = JSON.stringify(newUsers);
                    localStorage.setItem('Users', newUsersToJSON);
                }
            });

        function regLink() {
            const regLink = document.querySelector('.login-registration');
            regLink.addEventListener('click', event => {
                event.stopPropagation();
                LoadPage.load("registration")
            })

        }
    }

    enterIntoSystem() {
        const login = document.querySelector('#login');
        const logPassword = document.querySelector('#log-password');
        const enterButton = document.querySelector('.reg-form-submit');
        const book = new ContactsBook();

        enterButton.addEventListener('click', () => {
            book.clearMainBlock();

            let usersInfo = JSON.parse(localStorage.getItem('Users'));

            usersInfo.forEach(elem => {
                if (login.value === elem.email && logPassword.value === elem.password) {
                    LoadPage.load("home")

                    if (document.documentElement.clientWidth <= 414) {
                        let title = document.querySelector('.ls__title');
                        title.style.display = 'none';
                    }

                    localStorage.setItem('Active User', JSON.stringify(elem));

                    let maxCatIDarray = elem.categories;
                    let maxContactArray = elem.contacts;

                    if (maxCatIDarray.length < 1) {
                        localStorage.setItem('maxCategoryID', '0')

                    } else if (maxContactArray.length < 1) {
                        localStorage.setItem('maxContactID', '0')

                    } else {
                        let maxCurrentID = maxID(maxCatIDarray);
                        let maxCurrentContactID = maxID(maxContactArray);

                        localStorage.setItem('maxCategoryID', `${maxCurrentID}`);
                        localStorage.setItem('maxContactID', `${maxCurrentContactID}`);
                    }

                    function maxID(array) {
                        let arrayNumber = [];

                        array.forEach(elem => {
                            arrayNumber.push(elem.id)
                        });

                        return Math.max.apply(null, arrayNumber)
                    }
                }
            });
        });
    }
}



