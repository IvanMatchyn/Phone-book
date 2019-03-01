import * as constants from "../Constants";

export default class Session {
    getActiveUser() {
        return this.user;
    }

    loadActiveUser() {
        this.user = JSON.parse(localStorage.getItem(constants.ACTIVE_USER));
    }

    saveToStorage() {
        localStorage.setItem(constants.ACTIVE_USER, JSON.stringify(this.getActiveUser()))
    }

    static createActiveUser(user){
        localStorage.setItem(constants.ACTIVE_USER, JSON.stringify(user))
    }

    static getInstance() {
        if (Session.instance === undefined) {
            Session.instance = new Session();
        }

        return Session.instance;
    }
}