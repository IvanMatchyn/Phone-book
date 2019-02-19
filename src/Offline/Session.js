export default class Session {
    constructor() {
    }

    getActiveUser() {
        return this.user;
    }

    loadActiveUser() {
        this.user = JSON.parse(localStorage.getItem('Active User'));
    }

    saveToStorage() {
        localStorage.setItem('Active User', JSON.stringify(this.getActiveUser()))
    }

    static getInstance() {
        if (Session.instance === undefined) {
            Session.instance = new Session();
        }

        return Session.instance;
    }
}