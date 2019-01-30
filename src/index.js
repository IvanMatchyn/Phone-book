import './index.scss'
import './normalize.css'
import './fonts/fonts.css'
import './constants.js'
import  './Module.js'
import './constants.js'
import './LoginPage/login.js'
import './AddContact/addContact.js'
import './EditContact/editContact.js'
import  './LSideBlock/LSideBlock.js'

import ContactsBook from "./Module.js";

(function () {
    let book = new ContactsBook();
    book.onload();
    book.location();
})();

