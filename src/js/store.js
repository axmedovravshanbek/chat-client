import {makeAutoObservable} from "mobx";

class Store {
    socket = {
        emit: () => {
        },
    };
    user = {_id: ''};
    users = [];
    myChats = [];
    unread = [];
    messages = [];
    otherUser = {
        email: '',
        fullName: '',
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

    async logout() {
        try {
            // $api.post('/logout');
            localStorage.removeItem('token');
            this.setUser({});
            this.socket.emit('disconnected');
        } catch (e) {
            console.log('e ', e.response?.data?.message);
        }
    }
}

export const store = new Store();
