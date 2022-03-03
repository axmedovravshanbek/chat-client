import $api from "./axiosV2";

export default class UserService {
    static fetchUsers() {
        return $api.get('/users')
    }
}

