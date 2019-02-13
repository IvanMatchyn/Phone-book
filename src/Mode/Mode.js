import LoginPage from "../LoginPage/login.js";
import * as constants from '../constants.js'

export default class Mode {
    constructor() {

    }

    onload() {
        fetch('../Mode/Mode.html')
            .then(response => {
                return response.text();
            })
            .then(html => {
                constants.MAIN_LSIDE_BLOCK.innerHTML = html;
            })
            .then(() => {
                this.chooseMode();
            })
    }

    chooseMode() {
        let login = new LoginPage();
        let button = document.querySelector('.mode-choose-button');
        let onlineMode = document.querySelector('#online');
        let offlineMode = document.querySelector('#offline');

        button.addEventListener('click', () => {
            if (onlineMode.checked) {
                login.onload();
                constants.myStorage.setItem('mode', 'online')
            } else if (offlineMode.checked){
                login.onload();
                constants.myStorage.setItem('mode', 'offline')
                let maxUserID = localStorage.getItem('maxUserID');

                if(maxUserID == null){
                    localStorage.setItem('maxUserID', '0');
                }

                if(localStorage.getItem('Users') == null){
                    let newUsers = new Array();
                    let newUsersToJSON = JSON.stringify(newUsers);
                    localStorage.setItem('Users', newUsersToJSON);
                }
            }
        })
    }
}