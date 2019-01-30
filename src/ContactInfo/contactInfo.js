import * as constants from "../constants"
import ContactBook from "../Module.js"

export default class ContactInformation {
    constructor() {

    }

    showContactIinfo(elem) {
        const book = new ContactBook();

        elem.addEventListener('click', function () {
            fetch('./ContactInfo/ContactInfo.html')
                .then(response => {
                    return response.text();
                })
                .then(html => {
                    constants.MAIN_RSIDE_BLOCK.innerHTML = html;
                })
                .then(() => {
                    book.mobileOpen();
                })
        })
    }
}