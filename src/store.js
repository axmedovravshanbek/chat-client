import {makeAutoObservable} from "mobx";
import AuthService from "./AuthService";
import axios from 'axios';
import $api, {API_URL} from "./components/axiosV2";
import {useNavigate} from "react-router-dom";

export default class Store {
    socket = {};
    user = {};
    otherUser = {};
    isAuth = false;
    lang = localStorage.getItem('lang') || 'ru';

    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool) {
        this.isAuth = bool;
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
    setOtherUser(user) {
        this.otherUser = user;
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}
