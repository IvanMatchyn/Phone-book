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
}