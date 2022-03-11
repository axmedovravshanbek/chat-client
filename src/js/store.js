import {makeAutoObservable} from "mobx";
import AuthService from "./AuthService";
import $api from "./axiosV2";

export default class Store {
    socket = {
        emit: () => {
        },
    };
    user = {};
    users = [];
    myChats = [];
    unread = [];
    messages = [];
    otherUser = {
        email: '',
        // username
        // fullName
        // password
        // isActivated
        // activationLink
        imgSrc: '',
        lastOnline: 1651516851,
        isOnline: false,
        typingTo: ''
    };
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
        this.users = users;
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

    async logout() {
        try {
            $api.post('/logout');
            localStorage.removeItem('token');
            this.setUser({});
            this.socket.emit('disconnected');
       console.log('try')
        } catch (e) {
            console.log('e ', e.response?.data?.message);
        }
    }
}
