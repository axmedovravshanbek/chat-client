import {makeAutoObservable} from "mobx";

class Store {
    socket = {
        emit: () => {},
    };
    user = {};
    otherUser = {};
    users = [];
    myChats = [];
    unread = [];
    messages = [];
    lang = localStorage.getItem('lang') || 'ru';

    constructor() {
        makeAutoObservable(this);
    }

    setSocket(socket) {
        this.socket = socket;
    }

    setLang(lang) {
        this.lang = lang;
        localStorage.setItem('lang', lang)
    }

    setUser(user) {
        this.user = user;
    }

    setUsers(users) {
        this.users = users
    }

    setMyChats(myChats) {
        this.myChats = myChats;
    }

    setUnread(unread) {
        this.unread = unread;
    }

    setMessages(messages) {
        this.messages = messages;
    }

    setOtherUser(user) {
        this.otherUser = user;
    }
}

export const store = new Store();
