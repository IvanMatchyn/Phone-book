import LoginPage from "./LoginPage/login.js";
import * as constants from './constants.js'

export default class ContactsBook {
    constructor() {
    }

    onload() {
        if (constants.ONLOAD_PAGE === 'login') {
            let login = new LoginPage;
            login.onload();
        }
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

            closeButton.classList.add('create-group__close-button')

            header.appendChild(closeButton);

            closeButton.addEventListener('click', button => {
                mainLeftBlock.style.display = 'block';
                this.clearMainBlock();
            })
        }
    }

    location(){
        let location = new Location();
        console.log(location);
    }
}