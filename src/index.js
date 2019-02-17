import './index.scss'
import './normalize.css'
import './fonts/fonts.css'
import './Constants.js'
import  './Module.js'
import './Constants.js'
import './LoginPage/LoginPage.js'
import './AddContact/addContact.js'
import './HomePage/HomePage.js'

import ContactsBook from "./Module.js";

(function () {
    let book = new ContactsBook();
    book.onload();
})();

