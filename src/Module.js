import Session from "./Offline/Session";
import Route, {PageType} from "./LoadPage/Route";
import * as constants from './Constants.js'

export default class ContactsBook {
    static onload() {
        let maxUserID = localStorage.getItem('maxUserID');

        if (maxUserID == null) {
            localStorage.setItem('maxUserID', '0');
        }

        if (localStorage.getItem(constants.ALL_USERS) == null) {
            let newUsers = [];
            let newUsersToJSON = JSON.stringify(newUsers);
            localStorage.setItem(constants.ALL_USERS, newUsersToJSON);
        }

        let url = new URLSearchParams(window.location.search.substring(1));

        let page = url.get("page");

        if (page === null) {
            page = PageType.LOGIN_PAGE;
        }

        Route.load(page);
    }

    static clearMainBlock() {
        const mainBlock = document.querySelector('.main__article');
        const mainBlockChildren = mainBlock.childNodes;

        mainBlockChildren.forEach(elem =>
            mainBlock.removeChild(elem)
        )
    }

    static mobileOpen() {
        if (document.documentElement.clientWidth <= 720) {
            let mainLeftBlock = document.querySelector('.main__left-side');
            let mainRightBlock = document.querySelector('.main__article');

            mainLeftBlock.style.display = 'none';
            mainRightBlock.style.display = 'block';

            let closeButton = document.createElement('button');
            let header = document.querySelector('.main__block-header');

            closeButton.classList.add('create-group__close-button');

            header.appendChild(closeButton);

            closeButton.addEventListener('click', () => {
                mainLeftBlock.style.display = 'block';
                this.clearMainBlock();
            })
        }
    }

    static offlineSynchronization() {
        let activeUser = Session.getInstance().getActiveUser();
        let usersArray = JSON.parse(localStorage.getItem(constants.ALL_USERS));

        usersArray.forEach((elem, i) => {
            if (activeUser.ID === elem.ID) {
                usersArray[i] = activeUser;
            }
        });

        localStorage.setItem(constants.ALL_USERS, JSON.stringify(usersArray))
    }

    static regEXPCheck(rageXP, element) {
        if (!rageXP.test(element.value)) {
            element.classList.add('wrong-info');
            element.setAttribute('placeholder', 'Incorrect');
            return false;
        }

        element.classList.remove('wrong-info');
        element.removeAttribute('placeholder');

        return true;
    }

    static isMobileDevice() {
        if (document.documentElement.clientWidth <= 720) {
            let title = document.querySelector('.ls__title');
            title.style.display = 'block';
        }
    }
}