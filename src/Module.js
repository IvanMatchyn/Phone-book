import Mode from './Mode/Mode.js'
import Session from "./Offline/Session";

export default class ContactsBook {
    constructor() {
    }

    onload() {
        let mode = new Mode();
        mode.onload();
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
            if(activeUser.ID = elem.ID){
              usersArray[i] = activeUser;
            }
        });

        localStorage.setItem('Users', JSON.stringify(usersArray))
    }

    historyLoad(){
        let mode = new Mode();
        let routes = {
            '/': mode.onload()
            '/?page=login': login
        }
    }
}