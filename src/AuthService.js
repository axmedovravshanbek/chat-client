import $api from "./axiosV2";

export default class AuthService {
    // static async login(email, password) {
    //     return
    // }

    static async registration(email, password) {
        return $api.post('/registration', {email, password})
    }

    static async logout() {
        return $api.post('/logout')
    }

}

