import $api from "./axiosV2";

export default class AuthService {
    static async logout() {
        return $api.post('/logout')
    }
}
