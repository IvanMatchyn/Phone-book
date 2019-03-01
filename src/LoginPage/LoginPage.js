import * as constants from '../Constants.js'
import ContactsBook from '../Module.js'
import Session from "../Offline/Session";
import Route, {PageType} from "../LoadPage/Route";

export default class LoginPage {
    onload() {
        const thisClass = new LoginPage();

        fetch('./LoginPage/login.html')
            .then(function (response) {
                return response.text().then(function (text) {
                    constants.mainLeftSideBlock.innerHTML = text;
                })
            })
            .then(function () {
                thisClass.addEventToEnterButton();
                addEventOnRegistrationButtonLink();
            });


        function addEventOnRegistrationButtonLink() {
            const regLink = document.querySelector('.login-registration');
            regLink.addEventListener('click', event => {
                event.stopPropagation();
                Route.load(PageType.REGISTRATION_PAGE)
            })
        }
    }

    addEventToEnterButton() {
        const login = document.querySelector('#login');
        const password = document.querySelector('#log-password');
        const enterButton = document.querySelector('.reg-form-submit');

        enterButton.addEventListener('click', () => {
            ContactsBook.clearMainBlock();
            let usersInfo = JSON.parse(localStorage.getItem(constants.ALL_USERS));
            let currUser = this.validateUserInfo(usersInfo, login, password);

            if (currUser) {
                Route.load(PageType.HOME_PAGE);
                LoginPage.removeTitleIfMobileDevice();
                Session.createActiveUser(currUser);
                this.createMaxID();
            }
        });
    }

    validateUserInfo(array, login, password) {
        return array.find(element =>
            login.value === element.email && password.value === element.password
        )
    }

    static removeTitleIfMobileDevice() {
        if (document.documentElement.clientWidth <= 414) {
            let title = document.querySelector('.ls__title');
            title.style.display = 'none';
        }
    }

    createMaxID() {
        Session.getInstance().loadActiveUser();
        let user = Session.getInstance().getActiveUser();

        let maxCatIDArray = user.categories;
        let maxContactArray = user.contacts;

        if (maxCatIDArray.length < 1) {
            localStorage.setItem(constants.MAX_CATEGORY_ID, '0')

        } else if (maxContactArray.length < 1) {
            localStorage.setItem(constants.MAX_CONTACT_ID, '0')

        } else {
            let maxCurrentID = maxID(maxCatIDArray);
            let maxCurrentContactID = maxID(maxContactArray);

            localStorage.setItem(constants.MAX_CATEGORY_ID, `${maxCurrentID}`);
            localStorage.setItem(constants.MAX_CONTACT_ID, `${maxCurrentContactID}`);
        }

        function maxID(array) {
            let arrayNumber = [];

            array.forEach(elem =>
                arrayNumber.push(elem.id)
            );

            return Math.max.apply(null, arrayNumber)
        }
    }
}



