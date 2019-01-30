import * as constants from "../constants";

export default class EditContact {
    constructor(){

    }

    onload(){
        fetch('../EditContact/EditContact.html')
            .then(response => {
                return response.text()
            })
            .then(html => {
                constants.MAIN_RSIDE_BLOCK.innerHTML = html;
            })
    }
}