import './index.scss'
import './normalize.css'
import './fonts/fonts.css'
import './constants.js'
import  './Module.js'
import './constants.js'
import './LoginPage/login.js'
import  './addContact/addContact.js'
import  './editContact/editContact.js'
import  './LSideBlock/LSideBlock.js'

import ContactsBook from "./Module.js";

(function () {
    let book = new ContactsBook();
    book.onload();
})();

