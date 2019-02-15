import Session from "./Offline/Session";
import LoadPage from "./LoadPage/LoadPage";

export default class ContactsBook {
    constructor() {
    }

    onload() {
        let maxUserID = localStorage.getItem('maxUserID');

        if (maxUserID == null) {
            localStorage.setItem('maxUserID', '0');
        }

        if (localStorage.getItem('Users') == null) {
            let newUsers = [];
            let newUsersToJSON = JSON.stringify(newUsers);
            localStorage.setItem('Users', newUsersToJSON);
        }

        let url = new URLSearchParams(window.location.search.substring(1));
        let page = url.get("page");

        if (page === null) {
            page = "login";
        }
        LoadPage.load(page);
    }

    clearMainBlock() {
        const mainBlock = document.querySelector('.main__article');
        const mainBlockChilds = mainBlock.childNodes;

        mainBlockChilds.forEach(elem => {
            mainBlock.removeChild(elem);
        })
    }

    mobileOpen() {
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

    offlineSynchronization() {
        let activeUser = Session.getInstance().getActiveUser();
        let usersArray = JSON.parse(localStorage.getItem('Users'));

        usersArray.forEach((elem, i) => {
            if (activeUser.ID = elem.ID) {
                usersArray[i] = activeUser;
            }
        });

        localStorage.setItem('Users', JSON.stringify(usersArray))
    }
}