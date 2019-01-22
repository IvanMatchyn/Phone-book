import * as constants from "../constants"

export default class ContactInformation {
    constructor(){

    }

    showContactIinfo (elem){
        elem.addEventListener('click', function () {
            fetch('./ContactInfo/ContactInfo.html')
                .then(response =>{
                    return response.text();
                })
                .then(html=>{
                    constants.MAIN_RSIDE_BLOCK.innerHTML = html;
                })
        })
    }
}